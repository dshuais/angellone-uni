(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/subUser/login/index"],{251:function(e,n,t){"use strict";(function(e){t(5);r(t(4));var n=r(t(252));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},252:function(e,n,t){"use strict";t.r(n);var r=t(253),o=t(255);for(var c in o)"default"!==c&&function(e){t.d(n,e,(function(){return o[e]}))}(c);t(257);var i,u=t(11),a=Object(u["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"02c7c9df",null,!1,r["components"],i);a.options.__file="pages/subUser/login/index.vue",n["default"]=a.exports},253:function(e,n,t){"use strict";t.r(n);var r=t(254);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},254:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return c})),t.d(n,"components",(function(){return r}));try{r={"u-Image":function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u--image/u--image")]).then(t.bind(null,297))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement,r=(e._self._c,t(183));e.$mp.data=Object.assign({},{$root:{m0:r}})},c=!1,i=[];o._withStripped=!0},255:function(e,n,t){"use strict";t.r(n);var r=t(256),o=t.n(r);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=o.a},256:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(t(34)),o=t(146),c=t(144),i=t(145);function u(e){return e&&e.__esModule?e:{default:e}}function a(e,n,t,r,o,c,i){try{var u=e[c](i),a=u.value}catch(s){return void t(s)}u.done?n(a):Promise.resolve(a).then(r,o)}function s(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var c=e.apply(n,t);function i(e){a(c,r,o,i,u,"next",e)}function u(e){a(c,r,o,i,u,"throw",e)}i(void 0)}))}}var d={name:"Login",data:function(){return{code:void 0,defaultSelected:{url:"http://ds.dshuais.com/425708edd0ca6e4610de25b0f.jpg"},selected:void 0,startR:void 0,endR:void 0}},onLoad:function(){this.getToday(),this.getLoginCode()},methods:{getToday:function(){var e=this;return s(r.default.mark((function n(){var t,c,i,u;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,o.getTodaySelected)();case 2:i=n.sent,u=i.data,e.selected=u[0]||e.defaultSelected,e.startR=null===(t=e.selected.remark)||void 0===t?void 0:t.split("，")[0],e.endR=null===(c=e.selected.remark)||void 0===c?void 0:c.split("，")[1];case 7:case"end":return n.stop()}}),n)})))()},getLoginCode:function(){var n=this;e.login({success:function(e){n.code=e.code}})},handleLogin:function(){var n=this;e.getUserProfile({desc:"用于完善用户信息",success:function(t){var r=t.encryptedData,o=t.iv;e.checkSession({success:function(e){n.login(r,o,n.code)},fail:function(t){e.login({success:function(e){n.login(r,o,e.code)}})}})},fail:function(e){n.$msg("已取消授权")}})},login:function(n,t,u){var a=this;return s(r.default.mark((function s(){var d,l,f,v;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,(0,o.wxlogin)({encryptedData:n,iv:t,code:u});case 2:if(d=r.sent,l=d.data,f=d.token,v=d.msg,f){r.next=8;break}return r.abrupt("return",a.$msg(v));case 8:(0,c.setToken)(f),(0,c.setStorage)(i.ANGELLONE_USERINFO,l),a.$msg("登录成功",1),setTimeout((function(){e.navigateBack()}),1e3);case 12:case"end":return r.stop()}}),s)})))()},logInLater:function(){e.navigateBack()}}};n.default=d}).call(this,t(1)["default"])},257:function(e,n,t){"use strict";t.r(n);var r=t(258),o=t.n(r);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=o.a},258:function(e,n,t){}},[[251,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/subUser/login/index.js.map