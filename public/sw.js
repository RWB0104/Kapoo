if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return s[e]||(i=new Promise((async i=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},i=(i,s)=>{Promise.all(i.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(i)};self.define=(i,c,a)=>{s[i]||(s[i]=Promise.resolve().then((()=>{let s={};const r={uri:location.origin+i.slice(1)};return Promise.all(c.map((i=>{switch(i){case"exports":return s;case"module":return r;default:return e(i)}}))).then((e=>{const i=a(...e);return s.default||(s.default=i),s}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/CNAME",revision:"170a06380f5bfe5f59ad77916b95d064"},{url:"/_next/static/VJCdXVL957GZJ3RKJnEao/_buildManifest.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/VJCdXVL957GZJ3RKJnEao/_ssgManifest.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/33-8c8c1b0f93e2745c6b0a.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/726-27169ea5a8fe1e134da4.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/9-a02f112ad35e52a30b9f.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/910-af7b9d6fe01a2fcfde04.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/main-6a8ca7ae20700a66db28.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/404-c138d87ca9d0946b9c0a.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/500-0cfa178a59b2964cc6d1.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/_app-4e114134695bd9455aad.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/_error-99dd6c4a4ac8375acd47.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/about-c80310b5b6f72738d9e3.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/index-0d7f6b8d3d1c14f61108.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/posts-45d9aaf70f1a16153f4c.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/posts/%5B...url%5D-4955aa8cab17ee6c702c.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/posts/%5Bpage%5D-9d97473831c3befca787.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/posts/category/%5B...page%5D-f5432b079e5adfef5476.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/posts/tag/%5B...page%5D-ea5de2f915c4020bc98f.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/pages/projects-aed8a1a236d4bb260751.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/chunks/webpack-61095c13c5984b221292.js",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/css/0d6c874abad9cd144354.css",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/css/5bd3207925f3bd5a5d5a.css",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/css/6407965de81db1409d48.css",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/css/68aba09378dc10b70509.css",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/css/86eb710c060e0805f727.css",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/css/8b58fad80b3c1322a135.css",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/_next/static/css/969aab0874ca60640760.css",revision:"VJCdXVL957GZJ3RKJnEao"},{url:"/build.txt",revision:"9b39d43ffacfe97d5f6c4fe7c77d57e9"},{url:"/favicon.ico",revision:"d45ad03dbbdd075d36dc55e424e292ef"},{url:"/fonts/apple/AppleSDGothicNeoB.ttf",revision:"098fc5bd4b89bb9e258487c6ebbeda62"},{url:"/fonts/apple/AppleSDGothicNeoB.woff",revision:"b85b9371d7fd84c17155f926755a64dd"},{url:"/fonts/apple/AppleSDGothicNeoB.woff2",revision:"16b4ab0de064ee6d7feaaa50d62d6f73"},{url:"/fonts/apple/AppleSDGothicNeoEB.ttf",revision:"0b077d7f250c3d69597e6d1c01f1c672"},{url:"/fonts/apple/AppleSDGothicNeoEB.woff",revision:"ff61771c1881065a7f07633a7ce81d0f"},{url:"/fonts/apple/AppleSDGothicNeoEB.woff2",revision:"806830bd91c2d3330a9ce11f8d6e61a5"},{url:"/fonts/apple/AppleSDGothicNeoH.ttf",revision:"2d2111dc1155667c8c3a71462d797e17"},{url:"/fonts/apple/AppleSDGothicNeoH.woff",revision:"5182b0654c23fadccc48e01ac090d66d"},{url:"/fonts/apple/AppleSDGothicNeoH.woff2",revision:"295543543bb5a727090cfe836ed92c07"},{url:"/fonts/apple/AppleSDGothicNeoL.ttf",revision:"9417a06a9ed881881a79ad4d6a844886"},{url:"/fonts/apple/AppleSDGothicNeoL.woff",revision:"0e4c471abe203cbd7fb1da5f6c7dfdb6"},{url:"/fonts/apple/AppleSDGothicNeoL.woff2",revision:"ebd0207c4526f799d9de1b9634570c18"},{url:"/fonts/apple/AppleSDGothicNeoM.ttf",revision:"f2116f74ed0dfb6071e596a14525afd9"},{url:"/fonts/apple/AppleSDGothicNeoM.woff",revision:"2e8d8d2a211c3ab2468ed90507ab9bbb"},{url:"/fonts/apple/AppleSDGothicNeoM.woff2",revision:"ffa00286a1ff9eaf7fe5b7ebebed2551"},{url:"/fonts/apple/AppleSDGothicNeoR.ttf",revision:"943a92b5692c01ca221864a567e23cbe"},{url:"/fonts/apple/AppleSDGothicNeoR.woff",revision:"3aebe343c6687cec31192432876cd94f"},{url:"/fonts/apple/AppleSDGothicNeoR.woff2",revision:"4661c8e2b113f6cb3d2a63c3f02d2ef0"},{url:"/fonts/apple/AppleSDGothicNeoSB.ttf",revision:"e2bef9cec5fca40fbcd5cc8156426683"},{url:"/fonts/apple/AppleSDGothicNeoSB.woff",revision:"98039e0e52cf90b4884cca3d62a6e1e1"},{url:"/fonts/apple/AppleSDGothicNeoSB.woff2",revision:"2f1653bd0967f675ad87a0738d6b8f78"},{url:"/fonts/apple/AppleSDGothicNeoT.ttf",revision:"a564e84efaaaf01d216dda14e8f5dcf7"},{url:"/fonts/apple/AppleSDGothicNeoT.woff",revision:"3c2be04a0d1912a5f51436a9d3afaced"},{url:"/fonts/apple/AppleSDGothicNeoT.woff2",revision:"4129306cb81433fb2ac93926cfa4c738"},{url:"/fonts/apple/AppleSDGothicNeoUL.ttf",revision:"2f0acda2616160fce10b13db8afbf9e2"},{url:"/fonts/apple/AppleSDGothicNeoUL.woff",revision:"1916c971cc0d3a013a0259d8441e9b4a"},{url:"/fonts/apple/AppleSDGothicNeoUL.woff2",revision:"f86a11e0db2a2e10cd536d43d55b3066"},{url:"/fonts/blacksword/Blacksword.eot",revision:"7f74c0f7a022c927d9c7d964e2b46a2e"},{url:"/fonts/blacksword/Blacksword.woff",revision:"cee4ee5417441feacaaf0d0eda810821"},{url:"/fonts/blacksword/Blacksword.woff2",revision:"3c3dedcecd7dfdf7807f96d9668f729a"},{url:"/fonts/hack/Hack-Regular.eot",revision:"9604b84a1da61c08111506bdfaf3a577"},{url:"/fonts/hack/Hack-Regular.woff",revision:"69865b56cadc18b55e567ddae7c7fd76"},{url:"/fonts/hack/Hack-Regular.woff2",revision:"2011154a6f3b36995e6c81f35a0260a6"},{url:"/img/profile.jpg",revision:"21517622c01bfffa6e2332637d98d1bd"},{url:"/img/screener/celeb1.gif",revision:"109aedaa16126dc6bb27756ed9d44f6f"},{url:"/img/screener/celeb10.gif",revision:"98a58c54e4c588de2c1fe93af3f4ab57"},{url:"/img/screener/celeb11.gif",revision:"659e208977b09da8bc3c3085a49f988b"},{url:"/img/screener/celeb12.gif",revision:"38cc9e26b09e2a765cbe33c4a62baff5"},{url:"/img/screener/celeb13.gif",revision:"25011af7e854c4bc93429321d7b5a6d0"},{url:"/img/screener/celeb14.gif",revision:"519e57b2fee1b7c1dd3a3a769f80f2f0"},{url:"/img/screener/celeb15.gif",revision:"970bf1ff311c50c394a62004b75dd2d7"},{url:"/img/screener/celeb16.gif",revision:"8bc9c9be0704c2422ce0eaafeaee30db"},{url:"/img/screener/celeb2.gif",revision:"6f13b9bb117553125bdb6e62d9341ff9"},{url:"/img/screener/celeb3.gif",revision:"8316f612a04625f9b85e757292a6b360"},{url:"/img/screener/celeb4.gif",revision:"7efda3078a06b3f655a148823029a707"},{url:"/img/screener/celeb5.gif",revision:"8a1738c1e576b19fdf7c4391cd3ffc27"},{url:"/img/screener/celeb6.gif",revision:"c9a7a7a0b419b46e61bd5d327457f641"},{url:"/img/screener/celeb7.gif",revision:"469f7c9a20c5db63983005314878d82c"},{url:"/img/screener/celeb8.gif",revision:"880ead9818f7d1e930c7f9e57008df39"},{url:"/img/screener/celeb9.gif",revision:"4a6441ff38ff76368aff3807c86f1e26"},{url:"/img/screener/city1.gif",revision:"f74dd54f4d8686970c3c22bdfb28d91a"},{url:"/img/screener/city10.gif",revision:"30f35744b9c2e44f02835ff3dab1e5fd"},{url:"/img/screener/city11.gif",revision:"3e4c9d81ba6be013081a1506dd7fcdec"},{url:"/img/screener/city12.gif",revision:"8db746ea0f28bdd22eae8b3ee10ac16a"},{url:"/img/screener/city13.gif",revision:"3d10676f5915999c2bcfd54dd96d1dd9"},{url:"/img/screener/city14.gif",revision:"38d30ecfe41c21551c043443d330d637"},{url:"/img/screener/city15.gif",revision:"7eaaf4501f2093c87520c48541d07d12"},{url:"/img/screener/city2.gif",revision:"f16311fd0c32786525f471c685bc516e"},{url:"/img/screener/city3.gif",revision:"196ad9d3122098b297d7b99ce9ff209f"},{url:"/img/screener/city4.gif",revision:"4a918fa9b119461c9fa721cb32589e57"},{url:"/img/screener/city4.jpg",revision:"a06e2594ee4df934f0c379b2b30bb4c9"},{url:"/img/screener/city5.gif",revision:"cb5d4a6bbea4e86eb7584e55c537fdb8"},{url:"/img/screener/city6.gif",revision:"54b217389e523ed7c05b138ff30dfd48"},{url:"/img/screener/city7.gif",revision:"c9ffd4e2293d9e795e5d153fd64fd574"},{url:"/img/screener/city8.gif",revision:"57dafb0f4d0cef5ea7de0b02aa9f6aaa"},{url:"/img/screener/city9.gif",revision:"02f51c4a09c743de64df5236ee19340e"},{url:"/img/screener/code1.gif",revision:"3d6fda797530957527cb190ba7679d02"},{url:"/img/screener/code2.gif",revision:"252ccec573a5e222730ec7b5081b47f4"},{url:"/img/screener/code3.gif",revision:"54c03e32134dac515097ca7151a26cf1"},{url:"/img/screener/funk1.gif",revision:"feec85c19d39ef2215b1e9878566f879"},{url:"/img/screener/funk2.gif",revision:"89e255e6a851ba803230aaf95cc82add"},{url:"/img/screener/funk3.gif",revision:"1b83dce6c2a59c92d2dfdd14df85c377"},{url:"/img/screener/funk4.gif",revision:"955407ea812cb8489e1dc4b7021aed8c"},{url:"/img/screener/funk5.gif",revision:"b83018f8700162246f1c34bb57d0462e"},{url:"/img/screener/funk6.gif",revision:"eaaea1a392db23487227246267ee04cf"},{url:"/img/screener/game1.gif",revision:"3b6900bc8794da07a5da540d8d8e4841"},{url:"/img/screener/signal.gif",revision:"f874e8ff16694bbc91ee99c823831bde"},{url:"/js/content.js",revision:"b0200f992c29993518612c0bb91ff139"},{url:"/js/ga.js",revision:"76f3b1571736ee3ea4e103f4caaf53eb"},{url:"/manifest.json",revision:"d5851b6de1e604345b55c05a348c71e8"},{url:"/navere58ae30c341a262f951f2c7b1789463d.html",revision:"acc34bafdae15cabf97c92d196853424"},{url:"/robots.txt",revision:"f28d13053864ae95356ae2f8bdfb3739"},{url:"/rss.xml",revision:"9616b2c43d9b8be4d3d6b4d7c8703755"},{url:"/sitemap.xml",revision:"27459506b6c18d61980c46937cbb99cc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:s,state:c})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
