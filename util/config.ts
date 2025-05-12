
export type ConfigName = 'prod' | 'frack' | 'beta' | 'test'

export type Config = {
  name: ConfigName
  MAIN_APP_URL: string
  KNOCK_EXPO_CHANNEL_ID: string
  KNOCK_PUBLIC_API_KEY: string
  PRIVY_APP_ID: string;
  PRIVY_CLIENT_ID: string;

  /**
   * True when privy is enabled for use with the mobile app.
   */
  PRIVY_MOBILE_ENABLED: boolean

  /**
   * When true, we do not continue auth as normal (and forward it to the client),
   * instead, we show a debug screen with the user information from Privy.
   */
  PRIVY_DEBUG: boolean

  /**
   * When defined, we load this URL instead of the default URL in the webapp for
   * debug purposes.
   */
  WEBAPP_DEBUG_URL: string | null
}

const PROD_CONFIG: Config = {
  name: 'prod',
  MAIN_APP_URL: 'https://common.xyz/',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_ynCCqD_rlxXTO0TvBCYUKYV5BSG5-vHoy451WGDHW5w",
  PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
  PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
  PRIVY_MOBILE_ENABLED: false,
  PRIVY_DEBUG: false,
  WEBAPP_DEBUG_URL: null,
}

const FRACK_CONFIG: Config = {
  name: 'frack',
  MAIN_APP_URL: 'https://commonwealth-frack.herokuapp.com',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_EkjqgrIByZo85tIqdBkCmihVBtTB_ixY_37oTG_Au1Y",
  PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
  PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
  PRIVY_MOBILE_ENABLED: true,
  PRIVY_DEBUG: false,
  // WEBAPP_DEBUG_URL: null,
  WEBAPP_DEBUG_URL: 'https://commonwealth-frack.herokuapp.com/_internal/debug-mobile',
}

const BETA_CONFIG: Config = {
  name: 'beta',
  MAIN_APP_URL: 'https://beta.commonwealth.im',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_RLg22EIJ6jsuci6c7VvBU59gDQJZeFoeBKlOkgJLWvA",
  PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
  PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
  PRIVY_MOBILE_ENABLED: true,
  PRIVY_DEBUG: false,
  WEBAPP_DEBUG_URL: null,
}

const TEST_CONFIG: Config = {
  name: 'test',
  // TODO: this won't work now because privy requires https
  // for anything other than localhost.
  MAIN_APP_URL: 'http://192.168.86.42:8080',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_RLg22EIJ6jsuci6c7VvBU59gDQJZeFoeBKlOkgJLWvA",
  PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
  PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
  PRIVY_MOBILE_ENABLED: true,
  PRIVY_DEBUG: false,
  WEBAPP_DEBUG_URL: null,
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

export let config = FRACK_CONFIG
