import {WalletSsoSource} from "@/util/WalletSsoSource";
import {useEffect, useMemo, useState} from "react";
import {config} from "@/util/config";
import {useEmbeddedEthereumWallet, useIdentityToken, usePrivy} from "@privy-io/expo";

/**
 * When the user is authenticated, this provides the data the user needs to
 * authenticate.
 */
export interface UserAuth {
  /**
   * The privy id which we're providing for debug info.  It's not normally used
   * otherwise.
   */
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

// TODO what are the problems here
// - initial login is easy...
//   - there is a single source of truth
//     - react-native realizes its offline
//     - then triggers login in react-native
//     - when complete, we forward this to the client
// - FIXME: do I have the user status, in react-native?
//    - I THINK we do so I could have them load RequireAuth
//      and then send the token data to the client again.
//    - FIXME: it depends on how useUSerStatus works... I think.
// - FIXME manual logout needs to work too...
//   - FIXME signOut DOES NOT work in the client ...
//      it triggers it it react-native...



// TODO: I think the client needs to have a way to trigger auth...

// TODO: we need the auth token,
// TODO: we need the auth type... SMS, email, google
// TODO: what about solana wallets?
// TODO: what about bitcoin wallets?

// TODO: major issue, if the client EXPIRES, how do we get the latest access
// token?

export function usePrivyAuthStatus() {

  const {user, getAccessToken,} = usePrivy()
  const {getIdentityToken} = useIdentityToken()
  const {wallets} = useEmbeddedEthereumWallet()
  const wallet = wallets[0] ?? undefined

  const enabled = config.PRIVY_ENABLED
  const authenticated = !!user && !!wallet
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [identityToken, setIdentityToken] = useState<string | null>(null)

  useEffect(() => {

    async function doAsync() {
      if (user) {
        console.log("Getting access and identity tokens...")
        const accessToken = await getAccessToken()
        const identityToken = await getIdentityToken()
        setAccessToken(accessToken)
        setIdentityToken(identityToken)
      }
    }

    doAsync().catch(console.error)

  }, [user])

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

  const userAuth: UserAuth | null = useMemo(() => {

    if (user && identityToken && accessToken && ssoProvider && wallet) {
      return {
        id: user.id,
        identityToken,
        ssoOAuthToken: accessToken,
        ssoProvider,
        address: wallet?.address ?? null,
      }
    }

    return null

  }, [user, identityToken, accessToken, ssoProvider, wallet])

  const status: IPrivyAuthStatus = useMemo(() => {

    return {
      enabled,
      authenticated,
      address: wallet.address || null,
      userAuth
    }

  }, [enabled, authenticated, wallet, userAuth])

  return status

}

