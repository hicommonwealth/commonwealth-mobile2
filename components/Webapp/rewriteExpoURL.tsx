import {config} from "@/util/config";

export function rewriteExpoURL(url: string | null) {

  if (url === null || url === undefined) {
    return config.MAIN_APP_URL;
  }

  if (url.trim() === '') {
    return config.MAIN_APP_URL;
  }

  // TODO: I think we only need the rewrite URL if the rewrite URL is with our
  // app scheme but it should work regardless.

  const initialURL = new URL(config.MAIN_APP_URL)
  const rewriteURL = new URL(url)

  console.log('rewriteExpoURL: initialURL: ' + initialURL)
  console.log('rewriteExpoURL: rewriteURL: ' + rewriteURL)

  return `${initialURL.origin}${rewriteURL.pathname}${rewriteURL.search}`

}
