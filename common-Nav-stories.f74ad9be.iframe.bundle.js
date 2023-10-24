(self.webpackChunk=self.webpackChunk||[]).push([[884],{"./stories/common/Nav.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NavStory:()=>NavStory,default:()=>Nav_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),dist=__webpack_require__("./node_modules/@radix-ui/react-slot/dist/index.mjs");const gapValues=["0","1","2","3","4","5","6","7","8","9"],gridPropDefs={display:{type:"enum",values:["none","inline-grid","grid"],default:void 0,responsive:!0},columns:{type:"string",default:void 0,responsive:!0},rows:{type:"string",default:void 0,responsive:!0},flow:{type:"enum",values:["row","column","dense","row-dense","column-dense"],default:void 0,responsive:!0},align:{type:"enum",values:["start","center","end","baseline","stretch"],default:void 0,responsive:!0},justify:{type:"enum",values:["start","center","end","between"],default:void 0,responsive:!0},gap:{type:"enum",values:gapValues,default:void 0,responsive:!0},gapX:{type:"enum",values:gapValues,default:void 0,responsive:!0},gapY:{type:"enum",values:gapValues,default:void 0,responsive:!0}};var margin_props=__webpack_require__("./node_modules/@radix-ui/themes/dist/esm/helpers/props/margin.props.js"),layout_props=__webpack_require__("./node_modules/@radix-ui/themes/dist/esm/helpers/props/layout.props.js"),breakpoints=__webpack_require__("./node_modules/@radix-ui/themes/dist/esm/helpers/breakpoints.js");function has_own_property_hasOwnProperty(obj,key){return Object.prototype.hasOwnProperty.call(obj,key)}const Grid=react.forwardRef(((props,forwardedRef)=>{const{rest:marginRest,...marginProps}=(0,margin_props.FY)(props),{rest:layoutRest,...layoutProps}=(0,layout_props.F8)(marginRest),{className,asChild,display=gridPropDefs.display.default,columns=gridPropDefs.columns.default,rows=gridPropDefs.rows.default,flow=gridPropDefs.flow.default,align=gridPropDefs.align.default,justify=gridPropDefs.justify.default,gap=gridPropDefs.gap.default,gapX=gridPropDefs.gapX.default,gapY=gridPropDefs.gapY.default,style:propStyle,...gridProps}=layoutRest,Comp=asChild?dist.g7:"div";let style={...propStyle};if("string"==typeof columns&&(style={"--grid-template-columns-initial":parseGridValue(columns),...style}),"string"==typeof rows&&(style={"--grid-template-rows-initial":parseGridValue(rows),...style}),(0,breakpoints.w)(columns))for(const breakpoint in columns)if(has_own_property_hasOwnProperty(columns,breakpoint)){style={[`--grid-template-columns-${breakpoint}`]:parseGridValue(columns[breakpoint]),...style}}if((0,breakpoints.w)(rows))for(const breakpoint in rows)if(has_own_property_hasOwnProperty(rows,breakpoint)){style={[`--grid-template-rows-${breakpoint}`]:parseGridValue(rows[breakpoint]),...style}}return react.createElement(Comp,{...gridProps,ref:forwardedRef,className:classnames_default()("rt-Grid",className,(0,breakpoints.g)(display,"rt-r-display"),(0,breakpoints.g)(flow,"rt-r-gaf"),(0,breakpoints.g)(align,"rt-r-ai"),(0,breakpoints.g)(justify,"rt-r-jc",{between:"space-between"}),(0,breakpoints.g)(gap,"rt-r-gap"),(0,breakpoints.g)(gapX,"rt-r-cg"),(0,breakpoints.g)(gapY,"rt-r-rg"),(0,layout_props.yt)(layoutProps),(0,margin_props.we)(marginProps)),style:Object.keys(style).length?style:void 0})}));function parseGridValue(value){return(null==value?void 0:value.match(/^\d+$/))?`repeat(${value}, minmax(0, 1fr))`:value}Grid.displayName="Grid";var flex=__webpack_require__("./node_modules/@radix-ui/themes/dist/esm/components/flex.js"),components_text=__webpack_require__("./node_modules/@radix-ui/themes/dist/esm/components/text.js"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),react_icons_esm=__webpack_require__("./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js");const queosk={src:"static/media/queosk.5fd63908.png",height:620,width:648,blurDataURL:"static/media/queosk.5fd63908.png"};var _NavStory$parameters,_NavStory$parameters2,next_image=__webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),__jsx=react.createElement;function Nav(){return __jsx("nav",{className:"py-2"},__jsx(Grid,{columns:"3",width:"auto"},__jsx(link_default(),{href:"/mywaiting"},__jsx(flex.k,{direction:"column",align:"center"},__jsx(react_icons_esm.T39,{width:30,height:30}),__jsx(components_text.x,{size:"2"},"웨이팅"))),__jsx(flex.k,{align:"center",justify:"center"},__jsx("figure",{className:"rounded-xl overflow-hidden shadow"},__jsx(next_image.Z,{src:queosk,alt:"로고 이미지",width:50,height:50}))),__jsx(link_default(),{href:"/account"},__jsx(flex.k,{direction:"column",align:"center"},__jsx(react_icons_esm.Tk0,{width:30,height:30}),__jsx(components_text.x,{size:"2"},"계정")))))}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}Nav.displayName="Nav",Nav.__docgenInfo={description:"",methods:[],displayName:"Nav"};const Nav_stories={title:"common/Nav",component:Nav,parameters:{layout:"fullscreen",docs:{description:{component:"메인 페이지에서 사용되는 네비게이션 메뉴 입니다."}}},tags:["autodocs"]};var NavStory={name:"기본"};NavStory.parameters=_objectSpread(_objectSpread({},NavStory.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_NavStory$parameters=NavStory.parameters)||void 0===_NavStory$parameters?void 0:_NavStory$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  name: '기본'\n}"},null===(_NavStory$parameters2=NavStory.parameters)||void 0===_NavStory$parameters2||null===(_NavStory$parameters2=_NavStory$parameters2.docs)||void 0===_NavStory$parameters2?void 0:_NavStory$parameters2.source)})})},"./node_modules/next/dist/client/components/router-reducer/router-reducer-types.js":(module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{PrefetchKind:function(){return PrefetchKind},ACTION_REFRESH:function(){return ACTION_REFRESH},ACTION_NAVIGATE:function(){return ACTION_NAVIGATE},ACTION_RESTORE:function(){return ACTION_RESTORE},ACTION_SERVER_PATCH:function(){return ACTION_SERVER_PATCH},ACTION_PREFETCH:function(){return ACTION_PREFETCH},ACTION_FAST_REFRESH:function(){return ACTION_FAST_REFRESH},ACTION_SERVER_ACTION:function(){return ACTION_SERVER_ACTION}});const ACTION_REFRESH="refresh",ACTION_NAVIGATE="navigate",ACTION_RESTORE="restore",ACTION_SERVER_PATCH="server-patch",ACTION_PREFETCH="prefetch",ACTION_FAST_REFRESH="fast-refresh",ACTION_SERVER_ACTION="server-action";var PrefetchKind;!function(PrefetchKind){PrefetchKind.AUTO="auto",PrefetchKind.FULL="full",PrefetchKind.TEMPORARY="temporary"}(PrefetchKind||(PrefetchKind={})),("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/get-domain-locale.js":(module,exports,__webpack_require__)=>{"use strict";var process=__webpack_require__("./node_modules/process/browser.js");Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"getDomainLocale",{enumerable:!0,get:function(){return getDomainLocale}});const _normalizetrailingslash=__webpack_require__("./node_modules/next/dist/client/normalize-trailing-slash.js"),basePath=process.env.__NEXT_ROUTER_BASEPATH||"";function getDomainLocale(path,locale,locales,domainLocales){if(process.env.__NEXT_I18N_SUPPORT){const normalizeLocalePath=__webpack_require__("./node_modules/next/dist/client/normalize-locale-path.js").normalizeLocalePath,detectDomainLocale=__webpack_require__("./node_modules/next/dist/client/detect-domain-locale.js").detectDomainLocale,target=locale||normalizeLocalePath(path,locales).detectedLocale,domain=detectDomainLocale(domainLocales,void 0,target);if(domain){const proto="http"+(domain.http?"":"s")+"://",finalLocale=target===domain.defaultLocale?"":"/"+target;return""+proto+domain.domain+(0,_normalizetrailingslash.normalizePathTrailingSlash)(""+basePath+finalLocale+path)}return!1}return!1}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/link.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return _default}});const _react=__webpack_require__("./node_modules/@swc/helpers/cjs/_interop_require_default.cjs")._(__webpack_require__("./node_modules/next/dist/compiled/react/index.js")),_resolvehref=__webpack_require__("./node_modules/next/dist/shared/lib/router/utils/resolve-href.js"),_islocalurl=__webpack_require__("./node_modules/next/dist/shared/lib/router/utils/is-local-url.js"),_formaturl=__webpack_require__("./node_modules/next/dist/shared/lib/router/utils/format-url.js"),_utils=__webpack_require__("./node_modules/next/dist/shared/lib/utils.js"),_addlocale=__webpack_require__("./node_modules/next/dist/client/add-locale.js"),_routercontext=__webpack_require__("./node_modules/next/dist/shared/lib/router-context.js"),_approutercontext=__webpack_require__("./node_modules/next/dist/shared/lib/app-router-context.js"),_useintersection=__webpack_require__("./node_modules/next/dist/client/use-intersection.js"),_getdomainlocale=__webpack_require__("./node_modules/next/dist/client/get-domain-locale.js"),_addbasepath=__webpack_require__("./node_modules/next/dist/client/add-base-path.js"),_routerreducertypes=__webpack_require__("./node_modules/next/dist/client/components/router-reducer/router-reducer-types.js"),prefetched=new Set;function prefetch(router,href,as,options,appOptions,isAppRouter){if("undefined"==typeof window)return;if(!isAppRouter&&!(0,_islocalurl.isLocalURL)(href))return;if(!options.bypassPrefetchedCheck){const prefetchedKey=href+"%"+as+"%"+(void 0!==options.locale?options.locale:"locale"in router?router.locale:void 0);if(prefetched.has(prefetchedKey))return;prefetched.add(prefetchedKey)}const prefetchPromise=isAppRouter?router.prefetch(href,appOptions):router.prefetch(href,as,options);Promise.resolve(prefetchPromise).catch((err=>{0}))}function formatStringOrUrl(urlObjOrString){return"string"==typeof urlObjOrString?urlObjOrString:(0,_formaturl.formatUrl)(urlObjOrString)}const _default=_react.default.forwardRef((function LinkComponent(props,forwardedRef){let children;const{href:hrefProp,as:asProp,children:childrenProp,prefetch:prefetchProp=null,passHref,replace,shallow,scroll,locale,onClick,onMouseEnter:onMouseEnterProp,onTouchStart:onTouchStartProp,legacyBehavior=!1,...restProps}=props;children=childrenProp,!legacyBehavior||"string"!=typeof children&&"number"!=typeof children||(children=_react.default.createElement("a",null,children));const pagesRouter=_react.default.useContext(_routercontext.RouterContext),appRouter=_react.default.useContext(_approutercontext.AppRouterContext),router=null!=pagesRouter?pagesRouter:appRouter,isAppRouter=!pagesRouter,prefetchEnabled=!1!==prefetchProp,appPrefetchKind=null===prefetchProp?_routerreducertypes.PrefetchKind.AUTO:_routerreducertypes.PrefetchKind.FULL;const{href,as}=_react.default.useMemo((()=>{if(!pagesRouter){const resolvedHref=formatStringOrUrl(hrefProp);return{href:resolvedHref,as:asProp?formatStringOrUrl(asProp):resolvedHref}}const[resolvedHref,resolvedAs]=(0,_resolvehref.resolveHref)(pagesRouter,hrefProp,!0);return{href:resolvedHref,as:asProp?(0,_resolvehref.resolveHref)(pagesRouter,asProp):resolvedAs||resolvedHref}}),[pagesRouter,hrefProp,asProp]),previousHref=_react.default.useRef(href),previousAs=_react.default.useRef(as);let child;legacyBehavior&&(child=_react.default.Children.only(children));const childRef=legacyBehavior?child&&"object"==typeof child&&child.ref:forwardedRef,[setIntersectionRef,isVisible,resetVisible]=(0,_useintersection.useIntersection)({rootMargin:"200px"}),setRef=_react.default.useCallback((el=>{previousAs.current===as&&previousHref.current===href||(resetVisible(),previousAs.current=as,previousHref.current=href),setIntersectionRef(el),childRef&&("function"==typeof childRef?childRef(el):"object"==typeof childRef&&(childRef.current=el))}),[as,childRef,href,resetVisible,setIntersectionRef]);_react.default.useEffect((()=>{router&&isVisible&&prefetchEnabled&&prefetch(router,href,as,{locale},{kind:appPrefetchKind},isAppRouter)}),[as,href,isVisible,locale,prefetchEnabled,null==pagesRouter?void 0:pagesRouter.locale,router,isAppRouter,appPrefetchKind]);const childProps={ref:setRef,onClick(e){legacyBehavior||"function"!=typeof onClick||onClick(e),legacyBehavior&&child.props&&"function"==typeof child.props.onClick&&child.props.onClick(e),router&&(e.defaultPrevented||function linkClicked(e,router,href,as,replace,shallow,scroll,locale,isAppRouter,prefetchEnabled){const{nodeName}=e.currentTarget;if("A"===nodeName.toUpperCase()&&(function isModifiedEvent(event){const target=event.currentTarget.getAttribute("target");return target&&"_self"!==target||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.nativeEvent&&2===event.nativeEvent.which}(e)||!isAppRouter&&!(0,_islocalurl.isLocalURL)(href)))return;e.preventDefault();const navigate=()=>{const routerScroll=null==scroll||scroll;"beforePopState"in router?router[replace?"replace":"push"](href,as,{shallow,locale,scroll:routerScroll}):router[replace?"replace":"push"](as||href,{forceOptimisticNavigation:!prefetchEnabled,scroll:routerScroll})};isAppRouter?_react.default.startTransition(navigate):navigate()}(e,router,href,as,replace,shallow,scroll,locale,isAppRouter,prefetchEnabled))},onMouseEnter(e){legacyBehavior||"function"!=typeof onMouseEnterProp||onMouseEnterProp(e),legacyBehavior&&child.props&&"function"==typeof child.props.onMouseEnter&&child.props.onMouseEnter(e),router&&(!prefetchEnabled&&isAppRouter||prefetch(router,href,as,{locale,priority:!0,bypassPrefetchedCheck:!0},{kind:appPrefetchKind},isAppRouter))},onTouchStart(e){legacyBehavior||"function"!=typeof onTouchStartProp||onTouchStartProp(e),legacyBehavior&&child.props&&"function"==typeof child.props.onTouchStart&&child.props.onTouchStart(e),router&&(!prefetchEnabled&&isAppRouter||prefetch(router,href,as,{locale,priority:!0,bypassPrefetchedCheck:!0},{kind:appPrefetchKind},isAppRouter))}};if((0,_utils.isAbsoluteUrl)(as))childProps.href=as;else if(!legacyBehavior||passHref||"a"===child.type&&!("href"in child.props)){const curLocale=void 0!==locale?locale:null==pagesRouter?void 0:pagesRouter.locale,localeDomain=(null==pagesRouter?void 0:pagesRouter.isLocaleDomain)&&(0,_getdomainlocale.getDomainLocale)(as,curLocale,null==pagesRouter?void 0:pagesRouter.locales,null==pagesRouter?void 0:pagesRouter.domainLocales);childProps.href=localeDomain||(0,_addbasepath.addBasePath)((0,_addlocale.addLocale)(as,curLocale,null==pagesRouter?void 0:pagesRouter.defaultLocale))}return legacyBehavior?_react.default.cloneElement(child,childProps):_react.default.createElement("a",{...restProps,...childProps},children)}));("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/normalize-locale-path.js":(module,exports,__webpack_require__)=>{"use strict";var process=__webpack_require__("./node_modules/process/browser.js");Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"normalizeLocalePath",{enumerable:!0,get:function(){return normalizeLocalePath}});const normalizeLocalePath=(pathname,locales)=>process.env.__NEXT_I18N_SUPPORT?__webpack_require__("./node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js").normalizeLocalePath(pathname,locales):{pathname,detectedLocale:void 0};("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/use-intersection.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"useIntersection",{enumerable:!0,get:function(){return useIntersection}});const _react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_requestidlecallback=__webpack_require__("./node_modules/next/dist/client/request-idle-callback.js"),hasIntersectionObserver="function"==typeof IntersectionObserver,observers=new Map,idList=[];function observe(element,callback,options){const{id,observer,elements}=function createObserver(options){const id={root:options.root||null,margin:options.rootMargin||""},existing=idList.find((obj=>obj.root===id.root&&obj.margin===id.margin));let instance;if(existing&&(instance=observers.get(existing),instance))return instance;const elements=new Map,observer=new IntersectionObserver((entries=>{entries.forEach((entry=>{const callback=elements.get(entry.target),isVisible=entry.isIntersecting||entry.intersectionRatio>0;callback&&isVisible&&callback(isVisible)}))}),options);return instance={id,observer,elements},idList.push(id),observers.set(id,instance),instance}(options);return elements.set(element,callback),observer.observe(element),function unobserve(){if(elements.delete(element),observer.unobserve(element),0===elements.size){observer.disconnect(),observers.delete(id);const index=idList.findIndex((obj=>obj.root===id.root&&obj.margin===id.margin));index>-1&&idList.splice(index,1)}}}function useIntersection(param){let{rootRef,rootMargin,disabled}=param;const isDisabled=disabled||!hasIntersectionObserver,[visible,setVisible]=(0,_react.useState)(!1),elementRef=(0,_react.useRef)(null),setElement=(0,_react.useCallback)((element=>{elementRef.current=element}),[]);(0,_react.useEffect)((()=>{if(hasIntersectionObserver){if(isDisabled||visible)return;const element=elementRef.current;if(element&&element.tagName){return observe(element,(isVisible=>isVisible&&setVisible(isVisible)),{root:null==rootRef?void 0:rootRef.current,rootMargin})}}else if(!visible){const idleCallback=(0,_requestidlecallback.requestIdleCallback)((()=>setVisible(!0)));return()=>(0,_requestidlecallback.cancelIdleCallback)(idleCallback)}}),[isDisabled,rootMargin,rootRef,visible,elementRef.current]);const resetVisible=(0,_react.useCallback)((()=>{setVisible(!1)}),[]);return[setElement,visible,resetVisible]}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/link.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/client/link.js")}}]);