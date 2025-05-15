import {createContext, memo, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {WalletSsoSource} from "@/util/WalletSsoSource";
import {useEmbeddedEthereumWallet, useIdentityToken, useOAuthTokens, usePrivy} from "@privy-io/expo";
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
  const authenticated = !!user && !!wallet
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
      if (user && accessToken && accessTokenProvider) {
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
                                 authenticated,
                                 userAuth
                               }}>
      {props.children}
    </PrivyAuthContext.Provider>
  )
})
