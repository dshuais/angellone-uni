(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tinder/vue-tinder/Tinder"],{364:function(t,e,n){"use strict";n.r(e);var i=n(365),r=n(367);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n(374);var o,a=n(11),s=Object(a["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,"26eea368",null,!1,i["components"],o);s.options.__file="components/tinder/vue-tinder/Tinder.vue",e["default"]=s.exports},365:function(t,e,n){"use strict";n.r(e);var i=n(366);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},366:function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return o})),n.d(e,"recyclableRender",(function(){return u})),n.d(e,"components",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.list,(function(e,n){var i=t.__get_orig(e),r=n<t.max+1?t.rewindKeys.indexOf(e.id):null;return"augmented"===t.$scope.data.scopedSlotsCompiler&&(t.$setScopedSlotsParams("default",{data:i,index:n,status:t.status}),t.$setScopedSlotsParams("nope",{opacity:t.nopeOpacity}),t.$setScopedSlotsParams("like",{opacity:t.likeOpacity}),t.$setScopedSlotsParams("super",{opacity:t.superOpacity}),t.$setScopedSlotsParams("down",{opacity:t.downOpacity})),{$orig:i,g0:r}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},u=!1,o=[];r._withStripped=!0},367:function(t,e,n){"use strict";n.r(e);var i=n(368),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=r.a},368:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(n(369)),r=s(n(371)),u=s(n(372)),o=s(n(373)),a=n(370);function s(t){return t&&t.__esModule?t:{default:t}}var c,d=function(){n.e("components/tinder/vue-tinder/TinderCard").then(function(){return resolve(n(489))}.bind(null,n)).catch(n.oe)},l={name:"Tinder",mixins:[i.default,r.default,u.default,o.default],components:{TinderCard:d},props:{allowSuper:{type:Boolean,default:!0},allowDown:{type:Boolean,default:!1},queue:{type:Array,default:function(){return[]}},keyName:{type:String,default:"key"},pointerThreshold:{type:Number,default:.5},superThreshold:{type:Number,default:.5},downThreshold:{type:Number,default:.5},sync:{type:Boolean,default:!1},max:{type:Number,default:3},scaleStep:{type:Number,default:.05},offsetY:{type:Number,default:0},offsetUnit:{type:String,default:"px"}},data:function(){return{size:{top:0,width:0,height:0},state:(0,a.initStatus)(),list:[],tinderMounted:!1}},computed:{status:function(){return this.state.status},ratio:function(){if(this.size.width){var t=this.state,e=t.start,n=t.move,i=n.x-e.x||0,r=i/(.5*this.size.width);return r}return 0},pointerOpacity:function(){return this.ratio/this.pointerThreshold},disY:function(){return this.allowSuper||this.allowDown?this.state.move.y-this.state.start.y:0},superOpacity:function(){if(!this.allowSuper)return 0;var t=this.disY/(-this.superThreshold*this.size.height),e=Math.abs(this.pointerOpacity);return t>e?t:0},downOpacity:function(){if(!this.allowDown)return 0;var t=this.disY/(this.downThreshold*this.size.height),e=Math.abs(this.pointerOpacity);return t>e?t:0},likeOpacity:function(){return this.superOpacity||this.downOpacity?0:this.pointerOpacity},nopeOpacity:function(){return-this.likeOpacity}},watch:{queue:function(t){var e=this.keyName,n=t.map((function(t){return t[e]})),i=this.list.map((function(t){return t[e]}));this.diff(n,i)}},mounted:function(){var e=this,n=t.createSelectorQuery().in(this);n.select("#tinder").boundingClientRect((function(t){e.size={top:t.top,width:t.width,height:t.height}})).exec(),this.tinderMounted=!0},created:function(){this.list=this.queue.slice(0)},destroyed:function(){},methods:{getSize:function(){var e=this;clearInterval(c),c=setTimeout((function(){var n=t.createSelectorQuery().in(e);n.select("#tinder").boundingClientRect((function(t){e.size={top:t.top,width:t.width,height:t.height}})).exec()}),300)},resetStatus:function(){this.state=(0,a.initStatus)()}}};e.default=l}).call(this,n(1)["default"])},374:function(t,e,n){"use strict";n.r(e);var i=n(375),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=r.a},375:function(t,e,n){}}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/tinder/vue-tinder/Tinder.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tinder/vue-tinder/Tinder-create-component',
    {
        'components/tinder/vue-tinder/Tinder-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(364))
        })
    },
    [['components/tinder/vue-tinder/Tinder-create-component']]
]);
