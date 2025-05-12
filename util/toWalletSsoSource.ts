import {WalletSsoSource} from "@/util/WalletSsoSource";

export function toWalletSsoSource(type: string): WalletSsoSource | null {
  switch(type) {
    case "email":
      return WalletSsoSource.Email
    case "phone":
      return WalletSsoSource.SMS
    case "farcaster":
      return WalletSsoSource.Farcaster
    case "google_oauth":
    case "google":
      return WalletSsoSource.Google
    case "twitter_oauth":
    case "twitter":
      return WalletSsoSource.Twitter
    case "apple_oauth":
    case "apple":
      return WalletSsoSource.Apple
    case "github_oauth":
    case "github":
      return WalletSsoSource.Github
    case "discord_oauth":
    case "discord":
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
}
