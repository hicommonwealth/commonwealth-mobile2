export enum WalletSsoSource {
  Google = 'google',
  Github = 'github',
  Discord = 'discord',
  Twitter = 'twitter',
  Apple = 'apple',
  Email = 'email',
  Farcaster = 'farcaster',
  SMS = 'SMS',

  // TODO: remove
  Unknown = 'unknown', // address created after we launched SSO, before we started recording WalletSsoSource
}
