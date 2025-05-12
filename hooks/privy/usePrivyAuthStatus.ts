import {WalletSsoSource} from "@/util/WalletSsoSource";
import {useCallback, useMemo} from "react";
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

// TODO: what about solana wallets?
// TODO: what about bitcoin wallets?

export function usePrivyAuthStatus() {

  const {user, getAccessToken,} = usePrivy()
  const {getIdentityToken} = useIdentityToken()
  const {wallets} = useEmbeddedEthereumWallet()
  const wallet = wallets[0] ?? undefined

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

  return useCallback(async (): Promise<IPrivyAuthStatus> => {

    async function createUserAuth(): Promise<UserAuth | null> {
      if (user && ssoProvider) {

        // FIXME: this is the bug I think... if we have multiple auth tokens
        // how do I konw which account it is linked to.. ?
        console.log("Getting access and identity tokens...")
        const accessToken = await getAccessToken()
        const identityToken = await getIdentityToken()

        const userAuth: UserAuth = {
          id: user.id,
          identityToken: identityToken!,
          ssoOAuthToken: accessToken!,
          ssoProvider,
          address: wallet?.address ?? null,
        }

        return userAuth

      }
      return null
    }

    return {
      enabled,
      authenticated,
      userAuth: await createUserAuth()
    }

  }, [ssoProvider, user, wallet, getAccessToken, getIdentityToken])

}

