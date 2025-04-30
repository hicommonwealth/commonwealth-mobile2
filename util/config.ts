
export type ConfigName = 'prod' | 'frack' | 'beta' | 'test'

export type Config = {
  name: ConfigName
  MAIN_APP_URL: string
  KNOCK_EXPO_CHANNEL_ID: string
  KNOCK_PUBLIC_API_KEY: string
  PRIVY_APP_ID: string;
  PRIVY_CLIENT_ID: string;
  PRIVY_ENABLED: boolean
}

const PROD_CONFIG: Config = {
  name: 'prod',
  // MAIN_APP_URL: 'https://common.xyz/mobile-signin',
  MAIN_APP_URL: 'https://common.xyz/',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_ynCCqD_rlxXTO0TvBCYUKYV5BSG5-vHoy451WGDHW5w",
  PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
  PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
  PRIVY_ENABLED: false,
}

const FRACK_CONFIG: Config = {
  name: 'frack',
  MAIN_APP_URL: 'https://commonwealth-frack.herokuapp.com',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_EkjqgrIByZo85tIqdBkCmihVBtTB_ixY_37oTG_Au1Y",
  PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
  PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
  PRIVY_ENABLED: true,
}

const BETA_CONFIG: Config = {
  name: 'beta',
  MAIN_APP_URL: 'https://beta.commonwealth.im',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_RLg22EIJ6jsuci6c7VvBU59gDQJZeFoeBKlOkgJLWvA",
  PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
  PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
  PRIVY_ENABLED: true,
}

const TEST_CONFIG: Config = {
  name: 'test',
  MAIN_APP_URL: 'https://iframetester.com/?url=https://example.com',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_RLg22EIJ6jsuci6c7VvBU59gDQJZeFoeBKlOkgJLWvA",
  PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
  PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
  PRIVY_ENABLED: true,
}

export function setConfig(conf: ConfigName) {
  switch (conf) {
    case "prod":
      config = PROD_CONFIG
      return
    case "frack":
      config = FRACK_CONFIG
      return
    case "beta":
      config = BETA_CONFIG
      return
    case "test":
      config = TEST_CONFIG
      return
    default:
      throw new Error("Unknown config: " + conf)
  }
}

export let config = PROD_CONFIG
