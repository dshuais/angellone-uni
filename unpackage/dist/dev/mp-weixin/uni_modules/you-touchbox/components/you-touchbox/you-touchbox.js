(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/you-touchbox/components/you-touchbox/you-touchbox"],{437:function(t,i,n){"use strict";n.r(i);var o=n(438),e=n(440);for(var s in e)"default"!==s&&function(t){n.d(i,t,(function(){return e[t]}))}(s);n(442);var u,h=n(11),a=Object(h["default"])(e["default"],o["render"],o["staticRenderFns"],!1,null,"4e918954",null,!1,o["components"],u);a.options.__file="uni_modules/you-touchbox/components/you-touchbox/you-touchbox.vue",i["default"]=a.exports},438:function(t,i,n){"use strict";n.r(i);var o=n(439);n.d(i,"render",(function(){return o["render"]})),n.d(i,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(i,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(i,"components",(function(){return o["components"]}))},439:function(t,i,n){"use strict";var o;n.r(i),n.d(i,"render",(function(){return e})),n.d(i,"staticRenderFns",(function(){return u})),n.d(i,"recyclableRender",(function(){return s})),n.d(i,"components",(function(){return o}));var e=function(){var t=this,i=t.$createElement;t._self._c},s=!1,u=[];e._withStripped=!0},440:function(t,i,n){"use strict";n.r(i);var o=n(441),e=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(i,t,(function(){return o[t]}))}(s);i["default"]=e.a},441:function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={name:"you-touchbox",props:{disable:{type:Boolean,default:!1},zIndex:{type:[Number,String],default:100},customStyle:[String,Object],customSafeArea:{type:Object,default:function(){return{h5Top:null,wxTop:null,bottom:null}}},maxTop:{type:[Number,String],default:1},minTop:{type:[Number,String],default:.5},initTop:{type:[Number,String],default:"min"},auto:{type:Boolean,default:!0},limit:{type:Boolean,default:!0}},data:function(){return{windowHeight:null,windowTop:null,touchStartY:null,top:null,max:null,min:null,distance:0,isTouchEnd:!1,boundary:null,startTime:null}},mounted:function(){var i=t.getSystemInfoSync(),n=i.windowHeight,o=i.windowTop;this.windowHeight=n,this.windowTop=o;var e=this.customSafeArea,s=(e.h5Top,e.wxTop),u=e.bottom;u&&(this.windowHeight-=u),this.maxTop<=1?this.max=this.windowHeight*(1-+this.maxTop):this.max=+this.maxTop,this.minTop<=1?this.min=this.windowHeight*(1-+this.minTop):this.min=this.windowHeight-+this.minTop,["min","max"].includes(this.initTop)?this.top="min"===this.initTop?this.min:this.max:this.initTop<=1?this.top=this.windowHeight*(1-+this.initTop):this.top=+this.initTop,s&&(this.max+="menuBtn"===s?t.getMenuButtonBoundingClientRect().bottom+10:s,this.top+=s),this.boundary=(this.max+this.min)/2},methods:{setBottom:function(t){this.auto&&(this.isTouchEnd=!0),this.top=t<=1?this.windowHeight*(1-+t):this.windowHeight-+t},onTouchStart:function(t){this.disable||(this.isTouchEnd=!1,this.top=t.currentTarget.offsetTop,this.touchStartY=t.touches[0].clientY,this.startTime=Date.now())},onTouchmove:function(t){if(!this.disable){var i=t.touches[0].clientY-this.touchStartY;if(this.limit){var n=this.top+i;if(n<this.max||n>this.min)return this.top=n<this.max?this.max:this.min,this.distance=0,void(this.touchStartY=t.touches[0].clientY)}this.distance=i}},onTouchend:function(t){if(!this.disable){if(this.top=this.top+this.distance,this.auto){this.isTouchEnd=!0;var i=(Date.now()-this.startTime)/1e3,n=Math.abs(this.distance)/i;n>800?this.top=this.distance>0?this.min:this.max:this.top<this.boundary?this.top=this.max:this.top=this.min}this.$emit("get-end-detail",{minTop:this.min,maxTop:this.max,curTop:this.top}),this.distance=0}}}};i.default=n}).call(this,n(1)["default"])},442:function(t,i,n){"use strict";n.r(i);var o=n(443),e=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(i,t,(function(){return o[t]}))}(s);i["default"]=e.a},443:function(t,i,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/you-touchbox/components/you-touchbox/you-touchbox.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/you-touchbox/components/you-touchbox/you-touchbox-create-component',
    {
        'uni_modules/you-touchbox/components/you-touchbox/you-touchbox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(437))
        })
    },
    [['uni_modules/you-touchbox/components/you-touchbox/you-touchbox-create-component']]
]);
