if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,c,o)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const t={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return a;case"module":return t;default:return e(s)}}))).then((e=>{const s=o(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/CNAME",revision:"170a06380f5bfe5f59ad77916b95d064"},{url:"/_next/static/6ouVyV9aNFRy1ZEG74N5f/_buildManifest.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/6ouVyV9aNFRy1ZEG74N5f/_ssgManifest.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/271-0e611265cb488c740f3e.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/33-51a994c7f574303c0433.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/726-f0a68bf2c9df244ede0a.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/9-ac13c64efdf05b6e9079.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/910-a88be3a7ec4d6c41ecfc.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/main-6a8ca7ae20700a66db28.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/404-ec5e255cde22049b7620.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/500-17c229cf8d2bb813b875.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/_app-a618466743a88f9d8436.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/_error-99dd6c4a4ac8375acd47.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/about-50e557ba8b02f7470a14.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/index-026ebe34e1dc497d5a9d.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/posts-09b113d340ca2f0b5b7a.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/posts/%5B...url%5D-816c0b93831e6376f101.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/posts/%5Bpage%5D-4127b229e5f52dc401b4.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/posts/category/%5B...page%5D-50713dbd05f7f7df735e.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/posts/tag/%5B...page%5D-7f861eb589975ebcae78.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/projects-a7bb450ee700a5ea9c67.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/projects/%5B...url%5D-d7f2ee0429ee179c4c80.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/projects/%5Bpage%5D-6c88d77857e557e0d741.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/projects/category/%5B...page%5D-14572edcee50770b0670.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/pages/projects/tag/%5B...page%5D-40f50526bca0764de13a.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/chunks/webpack-61095c13c5984b221292.js",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/css/2e836f9aca665d91605f.css",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/css/467dfe61d5f8f2f820c6.css",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/css/4b646516458bc8f6bbf0.css",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/css/a86716cc81b840c44947.css",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/css/aa00e8fc390ddc2ca792.css",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/css/b37266192ac484bc6922.css",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/_next/static/css/de1b43c0ad14ddc76a6f.css",revision:"6ouVyV9aNFRy1ZEG74N5f"},{url:"/build.txt",revision:"85e20982df02907686607a5e15684858"},{url:"/favicon.ico",revision:"d45ad03dbbdd075d36dc55e424e292ef"},{url:"/fonts/apple/AppleSDGothicNeoB.ttf",revision:"098fc5bd4b89bb9e258487c6ebbeda62"},{url:"/fonts/apple/AppleSDGothicNeoB.woff",revision:"b85b9371d7fd84c17155f926755a64dd"},{url:"/fonts/apple/AppleSDGothicNeoB.woff2",revision:"16b4ab0de064ee6d7feaaa50d62d6f73"},{url:"/fonts/apple/AppleSDGothicNeoEB.ttf",revision:"0b077d7f250c3d69597e6d1c01f1c672"},{url:"/fonts/apple/AppleSDGothicNeoEB.woff",revision:"ff61771c1881065a7f07633a7ce81d0f"},{url:"/fonts/apple/AppleSDGothicNeoEB.woff2",revision:"806830bd91c2d3330a9ce11f8d6e61a5"},{url:"/fonts/apple/AppleSDGothicNeoH.ttf",revision:"2d2111dc1155667c8c3a71462d797e17"},{url:"/fonts/apple/AppleSDGothicNeoH.woff",revision:"5182b0654c23fadccc48e01ac090d66d"},{url:"/fonts/apple/AppleSDGothicNeoH.woff2",revision:"295543543bb5a727090cfe836ed92c07"},{url:"/fonts/apple/AppleSDGothicNeoL.ttf",revision:"9417a06a9ed881881a79ad4d6a844886"},{url:"/fonts/apple/AppleSDGothicNeoL.woff",revision:"0e4c471abe203cbd7fb1da5f6c7dfdb6"},{url:"/fonts/apple/AppleSDGothicNeoL.woff2",revision:"ebd0207c4526f799d9de1b9634570c18"},{url:"/fonts/apple/AppleSDGothicNeoM.ttf",revision:"f2116f74ed0dfb6071e596a14525afd9"},{url:"/fonts/apple/AppleSDGothicNeoM.woff",revision:"2e8d8d2a211c3ab2468ed90507ab9bbb"},{url:"/fonts/apple/AppleSDGothicNeoM.woff2",revision:"ffa00286a1ff9eaf7fe5b7ebebed2551"},{url:"/fonts/apple/AppleSDGothicNeoR.ttf",revision:"943a92b5692c01ca221864a567e23cbe"},{url:"/fonts/apple/AppleSDGothicNeoR.woff",revision:"3aebe343c6687cec31192432876cd94f"},{url:"/fonts/apple/AppleSDGothicNeoR.woff2",revision:"4661c8e2b113f6cb3d2a63c3f02d2ef0"},{url:"/fonts/apple/AppleSDGothicNeoSB.ttf",revision:"e2bef9cec5fca40fbcd5cc8156426683"},{url:"/fonts/apple/AppleSDGothicNeoSB.woff",revision:"98039e0e52cf90b4884cca3d62a6e1e1"},{url:"/fonts/apple/AppleSDGothicNeoSB.woff2",revision:"2f1653bd0967f675ad87a0738d6b8f78"},{url:"/fonts/apple/AppleSDGothicNeoT.ttf",revision:"a564e84efaaaf01d216dda14e8f5dcf7"},{url:"/fonts/apple/AppleSDGothicNeoT.woff",revision:"3c2be04a0d1912a5f51436a9d3afaced"},{url:"/fonts/apple/AppleSDGothicNeoT.woff2",revision:"4129306cb81433fb2ac93926cfa4c738"},{url:"/fonts/apple/AppleSDGothicNeoUL.ttf",revision:"2f0acda2616160fce10b13db8afbf9e2"},{url:"/fonts/apple/AppleSDGothicNeoUL.woff",revision:"1916c971cc0d3a013a0259d8441e9b4a"},{url:"/fonts/apple/AppleSDGothicNeoUL.woff2",revision:"f86a11e0db2a2e10cd536d43d55b3066"},{url:"/fonts/blacksword/Blacksword.eot",revision:"7f74c0f7a022c927d9c7d964e2b46a2e"},{url:"/fonts/blacksword/Blacksword.woff",revision:"cee4ee5417441feacaaf0d0eda810821"},{url:"/fonts/blacksword/Blacksword.woff2",revision:"3c3dedcecd7dfdf7807f96d9668f729a"},{url:"/fonts/hack/Hack-Regular.eot",revision:"9604b84a1da61c08111506bdfaf3a577"},{url:"/fonts/hack/Hack-Regular.woff",revision:"69865b56cadc18b55e567ddae7c7fd76"},{url:"/fonts/hack/Hack-Regular.woff2",revision:"2011154a6f3b36995e6c81f35a0260a6"},{url:"/image.txt",revision:"04a5276de46cd42269bb6cf82037878e"},{url:"/img/profile.jpg",revision:"21517622c01bfffa6e2332637d98d1bd"},{url:"/js/content.js",revision:"b0200f992c29993518612c0bb91ff139"},{url:"/js/ga.js",revision:"76f3b1571736ee3ea4e103f4caaf53eb"},{url:"/manifest.json",revision:"d5851b6de1e604345b55c05a348c71e8"},{url:"/navere58ae30c341a262f951f2c7b1789463d.html",revision:"acc34bafdae15cabf97c92d196853424"},{url:"/robots.txt",revision:"f28d13053864ae95356ae2f8bdfb3739"},{url:"/rss-html.xml",revision:"25d9f9f224b1daae6406a91c4a7a30d6"},{url:"/rss.xml",revision:"e4cee5d0a0fa1cfd0b6fd79389434d46"},{url:"/sitemap-html.xml",revision:"5bbeb37aaa0741763213cb5d3fed562d"},{url:"/sitemap.xml",revision:"fbd76ac8e71972fec5cf43fb6599dc14"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
