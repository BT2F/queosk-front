"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[42],{"./stories/common/Button.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BaseButton:()=>BaseButton,FullSizeButton:()=>FullSizeButton,KakaoButton:()=>KakaoButton,default:()=>Button_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),components_button=__webpack_require__("./node_modules/@radix-ui/themes/dist/esm/components/button.js"),_excluded=["size","className"],__jsx=react.createElement,sizeMap={lg:"4",md:"2",sm:"1"};function Button(_ref){var _ref$size=_ref.size,size=void 0===_ref$size?"md":_ref$size,className=_ref.className,props=(0,objectWithoutProperties.Z)(_ref,_excluded);return __jsx(components_button.z,(0,esm_extends.Z)({size:sizeMap[size],className:"duration-300 cursor-pointer \n        ".concat(className," \n      ")},props))}Button.displayName="Button",Button.__docgenInfo={description:"",methods:[],displayName:"Button",props:{size:{defaultValue:{value:"'md'",computed:!1},required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"버튼의 크기"},color:{required:!1,tsType:{name:"IRadixColors"},description:"버튼의 컬러 타입"}}};try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:{value:"md"},description:"버튼의 크기",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/renew/common/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"components/renew/common/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}var _BaseButton$parameter,_BaseButton$parameter2,_FullSizeButton$param,_FullSizeButton$param2,_KakaoButton$paramete,_KakaoButton$paramete2,index_esm=__webpack_require__("./node_modules/react-icons/ri/index.esm.js"),Button_stories_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const Button_stories={title:"common/Button",component:Button,tags:["autodocs"],args:{children:"Button",color:void 0,className:""},argTypes:{color:{options:["orange","green","yellow","gray","amber","red",void 0],control:{type:"select"},description:"버튼의 색상 입니다."},className:{description:"tailwindcss를 기반으로 하는 클래스 입니다.."},children:{description:"버튼의 자식 요소 입니다."}}};var BaseButton={name:"기본"},FullSizeButton={name:"전체 길이 버튼",args:{className:"w-full"}},KakaoButton={name:"카카오 버튼",args:{children:Button_stories_jsx(react.Fragment,null,Button_stories_jsx(index_esm.X78,{className:"text-2xl"}),"카카오 아이디로 시작하기"),color:"yellow",className:"w-full"}};BaseButton.parameters=_objectSpread(_objectSpread({},BaseButton.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_BaseButton$parameter=BaseButton.parameters)||void 0===_BaseButton$parameter?void 0:_BaseButton$parameter.docs),{},{source:_objectSpread({originalSource:"{\n  name: '기본'\n}"},null===(_BaseButton$parameter2=BaseButton.parameters)||void 0===_BaseButton$parameter2||null===(_BaseButton$parameter2=_BaseButton$parameter2.docs)||void 0===_BaseButton$parameter2?void 0:_BaseButton$parameter2.source)})}),FullSizeButton.parameters=_objectSpread(_objectSpread({},FullSizeButton.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_FullSizeButton$param=FullSizeButton.parameters)||void 0===_FullSizeButton$param?void 0:_FullSizeButton$param.docs),{},{source:_objectSpread({originalSource:"{\n  name: '전체 길이 버튼',\n  args: {\n    className: 'w-full'\n  }\n}"},null===(_FullSizeButton$param2=FullSizeButton.parameters)||void 0===_FullSizeButton$param2||null===(_FullSizeButton$param2=_FullSizeButton$param2.docs)||void 0===_FullSizeButton$param2?void 0:_FullSizeButton$param2.source)})}),KakaoButton.parameters=_objectSpread(_objectSpread({},KakaoButton.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_KakaoButton$paramete=KakaoButton.parameters)||void 0===_KakaoButton$paramete?void 0:_KakaoButton$paramete.docs),{},{source:_objectSpread({originalSource:"{\n  name: '카카오 버튼',\n  args: {\n    children: <>\n        <RiKakaoTalkFill className=\"text-2xl\" />\n        카카오 아이디로 시작하기\n      </>,\n    color: 'yellow',\n    className: 'w-full'\n  }\n}"},null===(_KakaoButton$paramete2=KakaoButton.parameters)||void 0===_KakaoButton$paramete2||null===(_KakaoButton$paramete2=_KakaoButton$paramete2.docs)||void 0===_KakaoButton$paramete2?void 0:_KakaoButton$paramete2.source)})})}}]);