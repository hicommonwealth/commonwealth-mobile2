import {config} from "@/util/config";

const ACCEPTED_URL_PATTERNS: RegExp[] = [
  /^https:\/\/auth\.magic\.link/,
]

export function isInternalURL(url: string) {
  try {

    if (url.startsWith(config.MAIN_APP_URL)) {
      return true
    }

    if (url.startsWith("about:")) {
      // allow these URL types to always load.  This is needed because sometimes
      // the browser will load on about:blank on Safari.
      console.log("URL is an 'about:' URL: " + url)
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
