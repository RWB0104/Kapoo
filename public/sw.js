if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,i,t)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const r={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return n;case"module":return r;default:return e(s)}}))).then((e=>{const s=t(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/CNAME",revision:"170a06380f5bfe5f59ad77916b95d064"},{url:"/_next/server/middleware-build-manifest.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/server/middleware-react-loadable-manifest.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/K5YzdFogNXSfr1BUQgKLH/_buildManifest.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/K5YzdFogNXSfr1BUQgKLH/_middlewareManifest.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/K5YzdFogNXSfr1BUQgKLH/_ssgManifest.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/245-260dd59c1d3b5617.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/894.884bc9854a9cfe85.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/95b64a6e-ce7f75cdc3a87c61.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/framework-a87821de553db91d.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/main-7ebf3fc2b3dbcf98.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/404-e865b251e2a8d239.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/_app-01eb3845f78bca7a.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/_error-777a5f0e462a9bdf.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/about-283b248a05a7b87f.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/comments-391497ac776a6dbb.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/index-9c535ecdaeecd47a.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/posts-cc68e77eb38217a1.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/posts/%5B...url%5D-9818030fcdbd0d8f.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/projects-2a605646386ab454.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/pages/projects/%5B...url%5D-7a50f26de2cb255e.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/chunks/webpack-9f91e1ce2774b2f2.js",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/css/1091787d4da6ba07.css",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/css/270322c932bd65e9.css",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/css/3c3037d4580be5cd.css",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/css/4d63798b7bb34665.css",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/css/99c37b9f1b868f25.css",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/css/bee2a4efa1bcad10.css",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/_next/static/css/ce9d1830b6ad7e9f.css",revision:"K5YzdFogNXSfr1BUQgKLH"},{url:"/build.txt",revision:"f7e221bc7a4688882513f6531d61d2f5"},{url:"/favicon.ico",revision:"d45ad03dbbdd075d36dc55e424e292ef"},{url:"/image.json",revision:"bd8922db154700306c77eddff413871d"},{url:"/image.txt",revision:"04a5276de46cd42269bb6cf82037878e"},{url:"/img/profile.jpg",revision:"21517622c01bfffa6e2332637d98d1bd"},{url:"/js/content.js",revision:"b0200f992c29993518612c0bb91ff139"},{url:"/js/ga.js",revision:"76f3b1571736ee3ea4e103f4caaf53eb"},{url:"/manifest.json",revision:"d5851b6de1e604345b55c05a348c71e8"},{url:"/navere58ae30c341a262f951f2c7b1789463d.html",revision:"acc34bafdae15cabf97c92d196853424"},{url:"/posts-category.json",revision:"bb4480649306b5d9fa729d9bc29da1c3"},{url:"/posts.json",revision:"29daf82103c48672ba7835a3805ed216"},{url:"/projects-category.json",revision:"92dc9d14a0051a7ed85b411833aec4d5"},{url:"/projects.json",revision:"db18eef398d8ffdd850a846ff60dd942"},{url:"/robots.txt",revision:"f28d13053864ae95356ae2f8bdfb3739"},{url:"/rss.xml",revision:"72e7dfdc70242fb5c7be5d66adb5bcda"},{url:"/sitemap.xml",revision:"9da554495b84069a25740cc98f1445bc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
