import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_Bi6k3bc9.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DKotM6l8.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///opt/vegas-barbershop/","cacheDir":"file:///opt/vegas-barbershop/node_modules/.astro/","outDir":"file:///opt/vegas-barbershop/dist/","srcDir":"file:///opt/vegas-barbershop/src/","publicDir":"file:///opt/vegas-barbershop/public/","buildClientDir":"file:///opt/vegas-barbershop/dist/client/","buildServerDir":"file:///opt/vegas-barbershop/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"booking/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/booking","isIndex":false,"type":"page","pattern":"^\\/booking\\/?$","segments":[[{"content":"booking","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/booking.astro","pathname":"/booking","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"thanks/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/thanks","isIndex":false,"type":"page","pattern":"^\\/thanks\\/?$","segments":[[{"content":"thanks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/thanks.astro","pathname":"/thanks","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/booking","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/booking\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"booking","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/booking.ts","pathname":"/api/booking","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://vkrasnovid.github.io","base":"/vegas-barbershop/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/opt/vegas-barbershop/src/pages/booking.astro",{"propagation":"none","containsHead":true}],["/opt/vegas-barbershop/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/opt/vegas-barbershop/src/pages/thanks.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/booking@_@ts":"pages/api/booking.astro.mjs","\u0000@astro-page:src/pages/booking@_@astro":"pages/booking.astro.mjs","\u0000@astro-page:src/pages/thanks@_@astro":"pages/thanks.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DVjqxudN.mjs","/opt/vegas-barbershop/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/opt/vegas-barbershop/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CoXbRx6l.mjs","/opt/vegas-barbershop/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DLAl_RfX.js","/opt/vegas-barbershop/src/components/booking/BookingForm.astro?astro&type=script&index=0&lang.ts":"_astro/BookingForm.astro_astro_type_script_index_0_lang.DGWuoxDT.js","/opt/vegas-barbershop/src/components/gallery/Gallery.astro?astro&type=script&index=0&lang.ts":"_astro/Gallery.astro_astro_type_script_index_0_lang.CyZxMJeC.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/opt/vegas-barbershop/src/pages/index.astro?astro&type=script&index=0&lang.ts","function n(){const r=document.querySelectorAll(\".reveal\");if(r.length===0)return;const o=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add(\"revealed\"),o.unobserve(t.target))})},{threshold:.15,rootMargin:\"0px 0px -50px 0px\"});r.forEach(e=>o.observe(e))}typeof document<\"u\"&&(document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",n):n());n();"],["/opt/vegas-barbershop/src/components/gallery/Gallery.astro?astro&type=script&index=0&lang.ts","class o{items=[];currentIndex=0;currentFilter=\"all\";lightbox;lightboxImg;counter;closeBtn;prevBtn;nextBtn;constructor(){this.lightbox=document.getElementById(\"lightbox\"),this.lightboxImg=document.getElementById(\"lightbox-img\"),this.counter=document.getElementById(\"lightbox-counter\"),this.closeBtn=document.getElementById(\"lightbox-close\"),this.prevBtn=document.getElementById(\"lightbox-prev\"),this.nextBtn=document.getElementById(\"lightbox-next\"),this.initGallery(),this.initFilter(),this.initLightbox()}initGallery(){document.querySelectorAll(\".gallery-item\").forEach(t=>{t.addEventListener(\"click\",()=>{const e=t.querySelector(\"img\"),s=e.dataset.full||e.src;e.alt,this.updateVisibleItems();const i=this.items.findIndex(l=>l.src===s);i!==-1&&this.open(i)})})}updateVisibleItems(){const n=document.querySelectorAll('.gallery-item:not([style*=\"display: none\"]) img');this.items=Array.from(n).map(t=>({src:t.dataset.full||t.src,alt:t.alt}))}initFilter(){const n=document.querySelectorAll(\".gallery-filter-btn\");n.forEach(t=>{t.addEventListener(\"click\",()=>{const e=t.dataset.category||\"all\";this.currentFilter=e,n.forEach(i=>{const l=i.dataset.category===e;i.setAttribute(\"aria-selected\",String(l)),i.className=l?\"gallery-filter-btn px-4 py-2 rounded-full font-body text-[0.825rem] font-medium transition-all duration-200 cursor-pointer bg-brand-gold text-brand-black\":\"gallery-filter-btn px-4 py-2 rounded-full font-body text-[0.825rem] font-medium transition-all duration-200 cursor-pointer bg-brand-surface text-brand-white hover:border hover:border-brand-gold\"}),document.querySelectorAll(\".gallery-item\").forEach(i=>{const l=i.dataset.category;e===\"all\"||l===e?(i.style.display=\"\",i.classList.remove(\"hidden\")):(i.style.display=\"none\",i.classList.add(\"hidden\"))})})})}initLightbox(){this.closeBtn.addEventListener(\"click\",()=>this.close()),this.prevBtn.addEventListener(\"click\",()=>this.prev()),this.nextBtn.addEventListener(\"click\",()=>this.next()),document.addEventListener(\"keydown\",t=>{if(!this.lightbox.classList.contains(\"hidden\")&&(t.key===\"Escape\"&&this.close(),t.key===\"ArrowLeft\"&&this.prev(),t.key===\"ArrowRight\"&&this.next(),t.key===\"Tab\")){t.preventDefault();const e=[this.closeBtn,this.prevBtn,this.nextBtn],s=e.indexOf(document.activeElement);if(t.shiftKey){const i=(s-1+e.length)%e.length;e[i].focus()}else{const i=(s+1)%e.length;e[i].focus()}}}),this.lightbox.addEventListener(\"click\",t=>{t.target===this.lightbox&&this.close()});let n=0;this.lightbox.addEventListener(\"touchstart\",t=>{n=t.touches[0].clientX}),this.lightbox.addEventListener(\"touchend\",t=>{const e=t.changedTouches[0].clientX,s=n-e;Math.abs(s)>50&&(s>0?this.next():this.prev())})}open(n){this.currentIndex=n,this.updateLightboxImage(),this.lightbox.classList.remove(\"hidden\"),document.body.style.overflow=\"hidden\",setTimeout(()=>this.closeBtn.focus(),100)}close(){this.lightbox.classList.add(\"hidden\"),document.body.style.overflow=\"\",document.querySelector('.gallery-item:not([style*=\"display: none\"])')?.focus()}prev(){this.items.length!==0&&(this.currentIndex=(this.currentIndex-1+this.items.length)%this.items.length,this.updateLightboxImage())}next(){this.items.length!==0&&(this.currentIndex=(this.currentIndex+1)%this.items.length,this.updateLightboxImage())}updateLightboxImage(){const n=this.items[this.currentIndex];n&&(this.lightboxImg.src=n.src,this.lightboxImg.alt=n.alt,this.counter.textContent=`${this.currentIndex+1} / ${this.items.length}`)}}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",()=>new o):new o;"]],"assets":["/vegas-barbershop/_astro/booking.C7qQvOsl.css","/vegas-barbershop/favicon.ico","/vegas-barbershop/favicon.svg","/vegas-barbershop/og-image.svg","/vegas-barbershop/robots.txt","/vegas-barbershop/_astro/BookingForm.astro_astro_type_script_index_0_lang.DGWuoxDT.js","/vegas-barbershop/scripts/header-nav.js","/vegas-barbershop/images/hero.svg","/vegas-barbershop/images/hero.webp","/vegas-barbershop/images/gallery/work-01-thumb.svg","/vegas-barbershop/images/gallery/work-01.svg","/vegas-barbershop/images/gallery/work-02-thumb.svg","/vegas-barbershop/images/gallery/work-02.svg","/vegas-barbershop/images/gallery/work-03-thumb.svg","/vegas-barbershop/images/gallery/work-03.svg","/vegas-barbershop/images/gallery/work-04-thumb.svg","/vegas-barbershop/images/gallery/work-04.svg","/vegas-barbershop/images/gallery/work-05-thumb.svg","/vegas-barbershop/images/gallery/work-05.svg","/vegas-barbershop/images/gallery/work-06-thumb.svg","/vegas-barbershop/images/gallery/work-06.svg","/vegas-barbershop/images/gallery/work-07-thumb.svg","/vegas-barbershop/images/gallery/work-07.svg","/vegas-barbershop/images/gallery/work-08-thumb.svg","/vegas-barbershop/images/gallery/work-08.svg","/vegas-barbershop/images/gallery/work-09-thumb.svg","/vegas-barbershop/images/gallery/work-09.svg","/vegas-barbershop/images/gallery/work-10-thumb.svg","/vegas-barbershop/images/gallery/work-10.svg","/vegas-barbershop/images/gallery/work-11-thumb.svg","/vegas-barbershop/images/gallery/work-11.svg","/vegas-barbershop/images/gallery/work-12-thumb.svg","/vegas-barbershop/images/gallery/work-12.svg","/vegas-barbershop/images/team/barber-01.svg","/vegas-barbershop/images/team/barber-02.svg","/vegas-barbershop/images/team/barber-03.svg","/vegas-barbershop/images/team/barber-04.svg","/vegas-barbershop/booking/index.html","/vegas-barbershop/thanks/index.html","/vegas-barbershop/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"Btx2q8sydLbUhwQA8aTotyQqC3NvNViFKhD/vtNyDWY=","sessionConfig":{"driver":"fs-lite","options":{"base":"/opt/vegas-barbershop/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
