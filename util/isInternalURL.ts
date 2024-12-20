const ACCEPTED_URL_PATTERNS = [
  /^https:\/\/accounts\.google\.com(\/.*)?$/,
  /^https:\/\/auth\.magic\.link(\/.*)?$/,
  /^https:\/\/appleid\.apple\.com(\/auth\/.*)?$/,
  /^https:\/\/iforgot\.apple\.com(\/password\/.*)?$/,
  /^https:\/\/([a-zA-Z0-9-]+\.)*commonwealth\.im(\/.*)?$/,
  /^https:\/\/([a-zA-Z0-9-]+\.)*common\.xyz(\/.*)?$/,
  /^https:\/\/([a-zA-Z0-9-]+\.)*commonwealth-frack\.herokuapp\.com(\/.*)?$/, // Added this line
  /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(\/.*)?$/,  // Matches http://192.168.x.x with optional path

  // https://discord.com/oauth2/authorize?client_id=1311417374058217535&redirect_uri=http%3A%2F%2F192.168.86.31%3A8080%2Ffinishsociallogin&state=eyJjcnlwdG9DaGFsbGVuZ2VTdGF0ZSI6Ik9BR2JzOHNXcEpCYVdIbUlic1VNLVFqTWdpMGl6UkxoNTdwdlYyaWN1eUxDUndUcVh%2BV29CTDFsUXJmSFJVNDJuWUhkLjAzMHZxdXBTbmRQa3haS0NMS0NkdUl1WUFlNWdDdTFvN2tZVWVlN3pNR1VFQzBhSlV4bGUxY0pJRXJWIn0%3D&scope=identify%20email&code_challenge=PYdB3gjqwtH1lo0EC7M_8uUVXqvwYqFlv_7Q0kkaUXg&code_challenge_method=S256&response_type=code
  // https://discord.com/api/oauth2/authorize?client_id=1311417374058217535&redirect_uri=http%3A%2F%2F192.168.86.31%3A8080%2Ffinishsociallogin&state=eyJjcnlwdG9DaGFsbGVuZ2VTdGF0ZSI6IkZPenpHV1dsV1k5c2drMUZqN3FiZXBuZElPM2pOdGk4SEt1WmptelUyQn5PYm9vMm1ISzN1b0I1QjNQM0RaZnlHX1pLRkdiLjJMRF9XLWVpUTlOeWNtVXJtLmJFaVoxUnV1dzhXSkZpeXo5anZBOW12M1FEdXl6SUpLZGxiWFJBIn0%3D&scope=identify%20email&code_challenge=YN47v3U7Yx7gBpVHVdJrB97gYKoSLUzZibvzzn0Ns-Y&code_challenge_method=S256&response_type=code

  /^https:\/\/discord\.com\/(api\/oauth2\/authorize|oauth2\/authorize)(\/.*)?(\?.*)?$/ // Matches both /api/oauth2/authorize and /oauth2/authorize with query parameters
]

export function isInternalURL(url: string) {
  try {

    if (url.startsWith("about:")) {
      // allow these URL types to always load.  This is needed because sometimes
      // the browser will load on about:blank on Safari.
      return true;
    }

    // Check if the domain matches any pattern in ACCEPTED_URL_PATTERNS
    if (ACCEPTED_URL_PATTERNS.some(pattern => pattern.test(url))) {
      console.log("URL is internal: " + url)
      return true
    } else {
      console.log("URL is external: " + url)
      return false;
    }
  } catch (error) {
    console.error(error)
    return false;
  }
}
