if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return o[e]||(s=new Promise((async s=>{if("document"in self){const o=document.createElement("script");o.src=e,document.head.appendChild(o),o.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!o[e])throw new Error(`Module ${e} didn’t register its module`);return o[e]}))},s=(s,o)=>{Promise.all(s.map(e)).then((e=>o(1===e.length?e[0]:e)))},o={require:Promise.resolve(s)};self.define=(s,c,a)=>{o[s]||(o[s]=Promise.resolve().then((()=>{let o={};const i={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return o;case"module":return i;default:return e(s)}}))).then((e=>{const s=a(...e);return o.default||(o.default=s),o}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/CNAME",revision:"170a06380f5bfe5f59ad77916b95d064"},{url:"/_next/server/middleware-build-manifest.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/server/middleware-react-loadable-manifest.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/245-0801a77c61bc456a.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/894.884bc9854a9cfe85.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/95b64a6e-ce7f75cdc3a87c61.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/framework-a87821de553db91d.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/main-7ebf3fc2b3dbcf98.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/404-4c40446047b2a14b.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/_app-65e81d0e66275c97.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/_error-777a5f0e462a9bdf.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/about-bc2d4baa187a05f1.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/index-661a037e8d2d5e9f.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/posts-f74ddfd430415d24.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/posts/%5B...url%5D-c3957d359dcce7f4.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/projects-7967af729d0857a4.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/pages/projects/%5B...url%5D-67bfedf86eabf420.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/chunks/webpack-7e7c4a1457b7ddba.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/css/3b76b7e95ad7b32f.css",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/css/53f89a84e38868bb.css",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/css/73bad30a51247b4c.css",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/css/84055c5365ef55af.css",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/css/9dc06e0fe6dbb845.css",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/css/bc8765dfc3ff06ec.css",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/css/cef2073eecc8c45d.css",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/mW8P0cNoovVBAZJJ5kE04/_buildManifest.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/mW8P0cNoovVBAZJJ5kE04/_middlewareManifest.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/_next/static/mW8P0cNoovVBAZJJ5kE04/_ssgManifest.js",revision:"mW8P0cNoovVBAZJJ5kE04"},{url:"/build.txt",revision:"2626771aa42274bcec7db20b32b86add"},{url:"/favicon.ico",revision:"d45ad03dbbdd075d36dc55e424e292ef"},{url:"/fonts/apple/AppleSDGothicNeoB.ttf",revision:"098fc5bd4b89bb9e258487c6ebbeda62"},{url:"/fonts/apple/AppleSDGothicNeoB.woff",revision:"b85b9371d7fd84c17155f926755a64dd"},{url:"/fonts/apple/AppleSDGothicNeoB.woff2",revision:"16b4ab0de064ee6d7feaaa50d62d6f73"},{url:"/fonts/apple/AppleSDGothicNeoEB.ttf",revision:"0b077d7f250c3d69597e6d1c01f1c672"},{url:"/fonts/apple/AppleSDGothicNeoEB.woff",revision:"ff61771c1881065a7f07633a7ce81d0f"},{url:"/fonts/apple/AppleSDGothicNeoEB.woff2",revision:"806830bd91c2d3330a9ce11f8d6e61a5"},{url:"/fonts/apple/AppleSDGothicNeoH.ttf",revision:"2d2111dc1155667c8c3a71462d797e17"},{url:"/fonts/apple/AppleSDGothicNeoH.woff",revision:"5182b0654c23fadccc48e01ac090d66d"},{url:"/fonts/apple/AppleSDGothicNeoH.woff2",revision:"295543543bb5a727090cfe836ed92c07"},{url:"/fonts/apple/AppleSDGothicNeoL.ttf",revision:"9417a06a9ed881881a79ad4d6a844886"},{url:"/fonts/apple/AppleSDGothicNeoL.woff",revision:"0e4c471abe203cbd7fb1da5f6c7dfdb6"},{url:"/fonts/apple/AppleSDGothicNeoL.woff2",revision:"ebd0207c4526f799d9de1b9634570c18"},{url:"/fonts/apple/AppleSDGothicNeoM.ttf",revision:"f2116f74ed0dfb6071e596a14525afd9"},{url:"/fonts/apple/AppleSDGothicNeoM.woff",revision:"2e8d8d2a211c3ab2468ed90507ab9bbb"},{url:"/fonts/apple/AppleSDGothicNeoM.woff2",revision:"ffa00286a1ff9eaf7fe5b7ebebed2551"},{url:"/fonts/apple/AppleSDGothicNeoR.ttf",revision:"943a92b5692c01ca221864a567e23cbe"},{url:"/fonts/apple/AppleSDGothicNeoR.woff",revision:"3aebe343c6687cec31192432876cd94f"},{url:"/fonts/apple/AppleSDGothicNeoR.woff2",revision:"4661c8e2b113f6cb3d2a63c3f02d2ef0"},{url:"/fonts/apple/AppleSDGothicNeoSB.ttf",revision:"e2bef9cec5fca40fbcd5cc8156426683"},{url:"/fonts/apple/AppleSDGothicNeoSB.woff",revision:"98039e0e52cf90b4884cca3d62a6e1e1"},{url:"/fonts/apple/AppleSDGothicNeoSB.woff2",revision:"2f1653bd0967f675ad87a0738d6b8f78"},{url:"/fonts/apple/AppleSDGothicNeoT.ttf",revision:"a564e84efaaaf01d216dda14e8f5dcf7"},{url:"/fonts/apple/AppleSDGothicNeoT.woff",revision:"3c2be04a0d1912a5f51436a9d3afaced"},{url:"/fonts/apple/AppleSDGothicNeoT.woff2",revision:"4129306cb81433fb2ac93926cfa4c738"},{url:"/fonts/apple/AppleSDGothicNeoUL.ttf",revision:"2f0acda2616160fce10b13db8afbf9e2"},{url:"/fonts/apple/AppleSDGothicNeoUL.woff",revision:"1916c971cc0d3a013a0259d8441e9b4a"},{url:"/fonts/apple/AppleSDGothicNeoUL.woff2",revision:"f86a11e0db2a2e10cd536d43d55b3066"},{url:"/fonts/blacksword/Blacksword.eot",revision:"7f74c0f7a022c927d9c7d964e2b46a2e"},{url:"/fonts/blacksword/Blacksword.woff",revision:"cee4ee5417441feacaaf0d0eda810821"},{url:"/fonts/blacksword/Blacksword.woff2",revision:"3c3dedcecd7dfdf7807f96d9668f729a"},{url:"/fonts/hack/Hack-Regular.eot",revision:"9604b84a1da61c08111506bdfaf3a577"},{url:"/fonts/hack/Hack-Regular.woff",revision:"69865b56cadc18b55e567ddae7c7fd76"},{url:"/fonts/hack/Hack-Regular.woff2",revision:"2011154a6f3b36995e6c81f35a0260a6"},{url:"/image.json",revision:"77264677e5e7cbfd55f5a23ee99d225b"},{url:"/image.txt",revision:"04a5276de46cd42269bb6cf82037878e"},{url:"/img/profile.jpg",revision:"21517622c01bfffa6e2332637d98d1bd"},{url:"/js/content.js",revision:"b0200f992c29993518612c0bb91ff139"},{url:"/js/ga.js",revision:"76f3b1571736ee3ea4e103f4caaf53eb"},{url:"/manifest.json",revision:"d5851b6de1e604345b55c05a348c71e8"},{url:"/navere58ae30c341a262f951f2c7b1789463d.html",revision:"acc34bafdae15cabf97c92d196853424"},{url:"/posts-category.json",revision:"b2c2a5cf5daea52c211c2181f6dd2864"},{url:"/posts.json",revision:"c02f11dab9406e3e5d650711a5cbf7c8"},{url:"/projects-category.json",revision:"6391a9a95dc9c7f0655ae9cf46287b0d"},{url:"/projects.json",revision:"219d50d2bc4be929f6255b91d46aa495"},{url:"/robots.txt",revision:"f28d13053864ae95356ae2f8bdfb3739"},{url:"/rss.xml",revision:"ab6f10ae4cdc49227b65f5e8abce6402"},{url:"/sitemap.xml",revision:"c7677e7481f5f857769594d7a7a42394"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:o,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
