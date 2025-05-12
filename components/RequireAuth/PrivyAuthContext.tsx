import {createContext, memo, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {WalletSsoSource} from "@/util/WalletSsoSource";
import {useEmbeddedEthereumWallet, useIdentityToken, useOAuthTokens, usePrivy} from "@privy-io/expo";
import {config} from "@/util/config";
import React from "react";

/**
 * When the user is authenticated, this provides the data the user needs to
 * authenticate.
 */
export interface UserAuth {
  id: string,
  address: string | null,
  identityToken: string,
  ssoOAuthToken: string,
  ssoProvider: WalletSsoSource,
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
  const [fetchedIdentityToken, setFetchIdentityToken] = useState<string | null>(null)

  const enabled = config.PRIVY_MOBILE_ENABLED
  const authenticated = !!user && !!wallet

  const ssoProvider: WalletSsoSource | null = useMemo(() => {
    return user?.linked_accounts.map(account => {
      switch(account.type) {
        case "email":
          return WalletSsoSource.Email
        case "phone":
          return WalletSsoSource.SMS
        case "farcaster":
          return WalletSsoSource.Farcaster
        case "google_oauth":
          return WalletSsoSource.Google
        case "twitter_oauth":
          return WalletSsoSource.Twitter
        case "apple_oauth":
          return WalletSsoSource.Apple
        case "github_oauth":
          return WalletSsoSource.Github
        case "discord_oauth":
          return WalletSsoSource.Discord
        case "wallet":
        case "smart_wallet":
        case "passkey":
        case "telegram":
        case "linkedin_oauth":
        case "spotify_oauth":
        case "instagram_oauth":
        case "tiktok_oauth":
        case "custom_auth":
        case "cross_app":
        case "authorization_key":
        default:
          return null;
      }
    }).find(current => current !== null) ?? null
  }, [])


  useOAuthTokens({
    onOAuthTokenGrant: tokens => {
      console.log("FIXME.1 got tokens: " , JSON.stringify(tokens, null, 2))
    }
  })

  useEffect(() => {

    async function doAsync() {
      if (user) {
        const identityToken = await getIdentityToken()
        console.log("FIXME: working with identity token... " + identityToken)
        setFetchIdentityToken(identityToken)
      } else {
        console.log("Clearing identity token... ")
        setFetchIdentityToken(null)
      }
    }

    doAsync().catch(console.error)

  }, [user])

  // FIXME: useEffect to get the identityToken...

  return (
    // <PrivyAuthContext.Provider value={}>
    //   {props.children}
    // </PrivyAuthContext.Provider>
    <>
      {props.children}
    </>
  )
})
