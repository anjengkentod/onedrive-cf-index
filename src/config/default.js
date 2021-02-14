/* eslint-disable no-irregular-whitespace */
const config = {
  /**
   * Configure the account/resource type for deployment (with 0 or 1)
   * - accountType: controls account type, 0 for global, 1 for china (21Vianet)
   * - driveType: controls drive resource type, 0 for onedrive, 1 for sharepoint document
   *
   * Followed keys is used for sharepoint resource, change them only if you gonna use sharepoint
   * - hostName: sharepoint site hostname (like 'name.sharepoint.com')
   * - sitePath: sharepoint site path (like '/sites/name')
   * !Note: we do not support deploying onedrive & sharepoint at the same time
   */
  type: {
    accountType: 0,
    driveType: 1,
    hostName: null,
    sitePath: null
  },

  /**
   * You can use this tool http://heymind.github.io/tools/microsoft-graph-api-auth
   * to get following params: client_id, client_secret, refresh_token & redirect_uri.
   */
  refresh_token: '0.AAAA1jHppRBp1EWAPFNpNB5dHzXc1HhGfsZCkCMtOTFEM6VKAFg.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P8y4wXX7RkI0-3yaFYm5m6RRwZe7LJKj7qJI7RljZbrPNADewPHAzawUcCsXGXHul_RJcyl9t3hGa1yZa_s-YFdGwYROIIAJmQovtc18upiuYr5oiC83mMmHiKuJrMAT0WMw7hV_Y2JQe0i_QRcGq9UwkVrN9ROVVus1ewziLapj0P_LOF-jRZg_0HfEOHMM-TUQREP3Gf-BU16eDwoXgqTs8KtvQzrBcVd3PHx4nXKKE6kBUqva2-_D2-QET17_qsde398ILsvHRIFUlm4YDPnAZfSLCPFo0jgEa14XX4dyId9MeYmKb4zkds38muMFHvshCc4e0FUKTqdtG4bIkBd0e_4bPo2uH_snILMWnyjXUull-mb427guWTzlzV8zskxWVI6sTFNGvpcU9xECEadL_0NRFmqoGzP3YrYMWQbJ_2LygNae3OkAuQcwVTAQgCMrOHlqXdl6gLWwGeMawS-52r274wMJlHHpmPQZ_xsTVmayaqJeGseB-819lefC82GAja4VEUqOzL7gEVgBeTpnvzstCmhu46DW-t1xzet_G5zCT7hHpZ-ealpBJsGFg68VWvIGyHN0n1RwCBEe9aOV2EyUaO4A8CZWot8BIvlhkjiq5Fp_HW-7N7cCzPiUI8HFyw0chw7SGtShyk80m334zYlwEZBNoiE8QBGjaY0zkl5oFGcWmeyGWr6VY7VcDgmb_JWDd--5yyxEqP5XfvNkL5djcotA5VjBa4BF3EUjxWxjxRkBsXkWvtZGD8QuSlaDdHSlRQ2Sa4qKs29NddgPU2Yuua8-840SjN7qelsrSuHKb-eYxfmf2NJ3QsJxr97fpyzbUqBkeRU-_JYkJC75kffrQ08HmKuyE3HAlCYnVzMGxEEZO8ycD9iMgVe5taN-wxbKaBvZ8OKgwUH8sQFmNOg29lb',
  client_id: '6600e358-9328-4050-af82-0af9cdde796b',
  client_secret: 'ZudGl-p.m=LMmr3VrKgAyOf-WevB3p50',
  redirect_uri: 'http://localhost/onedrive-login',

  /**
   * The base path for indexing, all files and subfolders are public by this tool. For example: `/Public`.
   */
  base: '/Public',

  /**
   * Feature: Pagination when a folder has multiple(>${top}) files
   * - top: specify the page size limit of the result set, a big `top` value will slow down the fetching speed
   */
  pagination: {
    enable: true,
    top: 100 // default: 200, accepts a minimum value of 1 and a maximum value of 999 (inclusive)
  },

  /**
   * Feature Caching
   * Enable Cloudflare cache for path pattern listed below.
   * Cache rules:
   * - Entire File Cache  0 < file_size < entireFileCacheLimit
   * - Chunked Cache     entireFileCacheLimit  <= file_size < chunkedCacheLimit
   * - No Cache ( redirect to OneDrive Server )   others
   *
   * Difference between `Entire File Cache` and `Chunked Cache`
   *
   * `Entire File Cache` requires the entire file to be transferred to the Cloudflare server before
   *  the first byte sent to a client.
   *
   * `Chunked Cache` would stream the file content to the client while caching it.
   *  But there is no exact Content-Length in the response headers. ( Content-Length: chunked )
   *
   * `previewCache`: using CloudFlare cache to preview
   */
  cache: {
    enable: true,
    entireFileCacheLimit: 10000000, // 10MB
    chunkedCacheLimit: 100000000, // 100MB
    previewCache: false,
    paths: ['/🥟%20Some%20test%20files/Previews']
  },

  /**
   * Feature: Thumbnail
   * Show a thumbnail of image by ?thumbnail=small (small, medium, large)
   * More details: https://docs.microsoft.com/en-us/onedrive/developer/rest-api/api/driveitem_list_thumbnails?view=odsp-graph-online#size-options
   * Example: https://storage.spencerwoo.com/🥟%20Some%20test%20files/Previews/eb37c02438f.png?thumbnail=mediumSquare
   * You can embed this link (url encoded) directly inside Markdown or HTML.
   */
  thumbnail: true,

  /**
   * Small File Upload (<= 4MB)
   * POST https://<base_url>/<directory_path>/?upload=<filename>&key=<secret_key>
   * The <secret_key> is defined by you
   */
  upload: {
    enable: false,
    key: 'your_secret_key_here'
  },

  /**
   * Feature: Proxy Download
   * Use Cloudflare as a relay to speed up download. (Especially in Mainland China)
   * Example: https://storage.spencerwoo.com/🥟%20Some%20test%20files/Previews/eb37c02438f.png?raw&proxied
   * You can also embed this link (url encoded) directly inside Markdown or HTML.
   */
  proxyDownload: true
}

// IIFE to set apiEndpoint & baseResource
// eslint-disable-next-line no-unused-expressions
!(function({ accountType, driveType, hostName, sitePath }) {
  config.apiEndpoint = {
    graph: accountType ? 'https://microsoftgraph.chinacloudapi.cn/v1.0' : 'https://graph.microsoft.com/v1.0',
    auth: accountType
      ? 'https://login.chinacloudapi.cn/common/oauth2/v2.0'
      : 'https://login.microsoftonline.com/common/oauth2/v2.0'
  }
  config.baseResource = driveType ? `/sites/${hostName}:${sitePath}` : '/me/drive'
})(config.type)

export default config
