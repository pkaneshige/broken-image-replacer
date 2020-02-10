# Broken Image Replacer

A service worker which intercepts bad image requests and replaces them with requests to a 1x1 transparent fallback image. Potentially helpful as a fallback when third-party analytics pixels fail to resolve; with the broken image replacer, the user experience is unchanged and this service worker can send an error to your service of choice.