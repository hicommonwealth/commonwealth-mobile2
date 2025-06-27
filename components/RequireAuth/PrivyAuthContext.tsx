import {createContext, memo, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {WalletSsoSource} from "@/util/WalletSsoSource";
import {PrivyUser, useEmbeddedEthereumWallet, useIdentityToken, useOAuthTokens, usePrivy} from "@privy-io/expo";
import {config} from "@/util/config";
import React from "react";
import {toWalletSsoSource} from "@/util/toWalletSsoSource";

/**
 * When the user is authenticated, this provides the data the user needs to
 * authenticate.
 */
export interface UserAuth {
  id: string,
  address: string | null,
  identityToken: string,
  ssoOAuthToken?: string,
  ssoProvider?: WalletSsoSource,
}

export interface IPrivyAuthStatus {
  enabled: boolean,
  authenticated: boolean,
  userAuth: UserAuth | null,
}

export const PrivyAuthContext
  = createContext<IPrivyAuthStatus>({enabled: false, authenticated: false, userAuth: null})

export function usePrivyAuthStatus() {
  return useContext(PrivyAuthContext)
}

type Props = {
  children: ReactNode
}

export const PrivyAuthStatusProvider = memo((props: Props) => {

  const {user, getAccessToken,} = usePrivy()
  const {getIdentityToken} = useIdentityToken()
  const {wallets} = useEmbeddedEthereumWallet()
  const wallet = wallets[0] ?? undefined
  const [accessTokenProvider, setAccessTokenProvider] = useState<WalletSsoSource | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [userAuth, setUserAuth] = useState<UserAuth | null>(null)
  const enabled = config.PRIVY_MOBILE_ENABLED

  useOAuthTokens({
    onOAuthTokenGrant: tokens => {
      console.log("onOAuthTokenGrant: ", JSON.stringify(tokens, null, 2))
      const source = toWalletSsoSource(tokens.provider)

      if (source) {
        setAccessTokenProvider(source)
        setAccessToken(tokens.access_token)
      } else {
        console.error("Could not handle provider: " + tokens.provider)
      }
    }
  })

  const createUserAuth = useCallback((identityToken: string): UserAuth | null => {

    if (user) {

      const userAuth: UserAuth = {
        id: user.id,
        identityToken: identityToken,
        ssoOAuthToken: accessToken ?? undefined,
        ssoProvider: accessTokenProvider ?? undefined,
        address: wallet?.address ?? null,
      }

      return userAuth

    }
    return null

  }, [user, wallet, getAccessToken, getIdentityToken, accessTokenProvider, accessToken])

  useEffect(() => {

    async function doAsync() {

      if (user && ((accessToken && accessTokenProvider) || authHasNoAccessToken(user))) {
        console.log("Creating userAuth...")
        const identityToken = await getIdentityToken()
        if (identityToken) {
          const userAuth = createUserAuth(identityToken)
          setUserAuth(userAuth)
        } else {
          console.error("No identity token.")
        }
      } else {
        console.log("Clearing identity token... ")
        // setAccessTokenProvider(null)
        // setAccessToken(null)
        setUserAuth(null)
      }
    }

    doAsync().catch(console.error)

  }, [user, createUserAuth, accessTokenProvider, accessToken])

  return (
    <PrivyAuthContext.Provider value={{
                                 enabled,
                                 authenticated: !!userAuth,
                                 userAuth
                               }}>
      {props.children}
    </PrivyAuthContext.Provider>
  )
})


function authHasNoAccessToken(user: PrivyUser): boolean {

  // TODO: this is a workaround to allow mobile auth for accounts that are
  // authenticating with email or phone auth.  IF they are phone or email then
  // they NEVER receive an oauth token so we spend infinity waiting for
  // onOAuthTokenGrant.
  //
  // Right now we are NOT using linked-accounts.  If we do this won't work
  // because the user would have BOTH phone + google and then this test should
  // fail.
  //
  // A better solution is to use async-storage to set a temporary state that
  // we're authenticating with and set it to 'phone' so we don't expect the
  // callback.

  const phone = user.linked_accounts.find(current => current.type === 'phone')
  const email = user.linked_accounts.find(current => current.type === 'email')

  return !!(phone || email)

}
