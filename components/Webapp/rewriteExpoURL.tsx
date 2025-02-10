import {config} from "@/util/config";

export function rewriteExpoURL(url: string | null) {

  if (url === null || url === undefined) {
    return config.MAIN_APP_URL;
  }

  if (url.trim() === '') {
    return config.MAIN_APP_URL;
  }

  const initialURL = new URL(config.MAIN_APP_URL)
  const rewriteURL = new URL(url)

  return `${initialURL.origin}${rewriteURL.pathname}${rewriteURL.search}`

}
