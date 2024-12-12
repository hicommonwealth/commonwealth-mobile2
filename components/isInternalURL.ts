const ACCEPTED_URL_PATTERNS = [
  /^https:\/\/accounts\.google\.com(\/.*)?$/,
  /^https:\/\/([a-zA-Z0-9-]+\.)*commonwealth\.im(\/.*)?$/,
  /^https:\/\/([a-zA-Z0-9-]+\.)*common\.xyz(\/.*)?$/,
  /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(\/.*)?$/,  // Matches http://192.168.x.x with optional path
  /^https:\/\/discord\.com\/(api\/oauth2\/authorize|login)(\/.*)?$/ // Matches https://discord.com/api/oauth2/authorize or /login with optional paths
  ]

export function isInternalURL(url: string) {
  try {

    // Check if the domain matches any pattern in ACCEPTED_URL_PATTERNS
    if (ACCEPTED_URL_PATTERNS.some(pattern => pattern.test(url))) {
      return true
    } else {
      console.log("URL is not internal: " + url)
      return false;
    }
  } catch (error) {
    console.error(error)
    return false;
  }
}
