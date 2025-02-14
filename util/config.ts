
type Config = {
  MAIN_APP_URL: string
  KNOCK_EXPO_CHANNEL_ID: string
  KNOCK_PUBLIC_API_KEY: string
  MAGIC_PUBLISHABLE_KEY: string
}

const PROD_CONFIG: Config = {
  MAIN_APP_URL: 'https://common.xyz',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_ynCCqD_rlxXTO0TvBCYUKYV5BSG5-vHoy451WGDHW5w",
  MAGIC_PUBLISHABLE_KEY: 'pk_live_EF89AABAFB87D6F4'
}

const FRACK_CONFIG: Config = {
  MAIN_APP_URL: 'https://commonwealth-frack.herokuapp.com',
  KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
  KNOCK_PUBLIC_API_KEY: "pk_EkjqgrIByZo85tIqdBkCmihVBtTB_ixY_37oTG_Au1Y",
  MAGIC_PUBLISHABLE_KEY: 'pk_live_EF89AABAFB87D6F4'
}

export const config = PROD_CONFIG
