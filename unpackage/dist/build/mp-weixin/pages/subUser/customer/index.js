(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/subUser/customer/index"],{1858:function(n,e,t){"use strict";t.r(e);var u=t("6d6d"),o=t("c9b8");for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);t("9c67");var a,c=t("f0c5"),i=Object(c["a"])(o["default"],u["b"],u["c"],!1,null,"5981d15c",null,!1,u["a"],a);e["default"]=i.exports},"37be":function(n,e,t){},"6d6d":function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return u}));var u={"u-Image":function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u--image/u--image")]).then(t.bind(null,"b43e"))}},o=function(){var n=this,e=n.$createElement,u=(n._self._c,t("15fd")),o=n.__map(n.phoneList,(function(e,t){var u=n.__get_orig(e),o=n._f("phone")(e.phone),r=e.name.slice(0,1);return{$orig:u,f0:o,g0:r}}));n.$mp.data=Object.assign({},{$root:{m0:u,l0:o}})},r=[]},"9c67":function(n,e,t){"use strict";var u=t("37be"),o=t.n(u);o.a},a253:function(n,e,t){"use strict";(function(n){t("d74b");u(t("66fd"));var e=u(t("1858"));function u(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t("543d")["createPage"])},a7d4:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={filters:{phone:function(n){if(n){var e=n+"",t=e.substr(0,3),u=e.substr(-4);return t+"**点击拨打**"+u}}},data:function(){return{phoneList:[{phone:"15926689137",name:"杜帅"}]}},methods:{handleMakePhone:function(e){n.makePhoneCall({phoneNumber:e,success:function(n){},fail:function(n){}})}}};e.default=t}).call(this,t("543d")["default"])},c9b8:function(n,e,t){"use strict";t.r(e);var u=t("a7d4"),o=t.n(u);for(var r in u)"default"!==r&&function(n){t.d(e,n,(function(){return u[n]}))}(r);e["default"]=o.a}},[["a253","common/runtime","common/vendor"]]]);