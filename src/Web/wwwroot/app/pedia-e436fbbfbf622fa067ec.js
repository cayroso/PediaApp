/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"pedia": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["CcfX","vendor.bootstrap-vue","vendor.vue","vendor.jquery","vendor.bootstrap","vendor.microsoft","vendor.vue-moment","vendor.moment","vendor.popper.js","vendor.vue-router","vendor.buffer","vendor.axios","vendor.portal-vue","vendor.vue-observe-visibility","vendor.nprogress","vendor.setimmediate","vendor.process","vendor.base64-js","vendor.vue-loader","vendor.ieee754","vendor.vue-functional-data-merge","vendor.timers-browserify","vendor.webpack","vendor.isarray","vendor.fullcalendar","vendor.preact","vendor.tslib","parent~pedia~staff"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "+H8z":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--3-0!./node_modules/css-loader/dist/cjs.js??ref--3-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Modals/Teams/add-member.vue?vue&type=style&index=0&id=16a55a49&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Modals/Teams/add-member.vue?./node_modules/mini-css-extract-plugin/dist/loader.js??ref--3-0!./node_modules/css-loader/dist/cjs.js??ref--3-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "+Kdj":
/*!*********************************************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Clinic/index.vue?vue&type=style&index=0&id=0b022ea5&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0b022ea5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--3-0!../../../../node_modules/css-loader/dist/cjs.js??ref--3-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=0b022ea5&scoped=true&lang=css& */ \"TIv6\");\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0b022ea5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0b022ea5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0b022ea5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0b022ea5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/index.vue?");

/***/ }),

/***/ "+MN0":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Modals/Teams/add-member.vue?vue&type=template&id=16a55a49&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"b-modal\",\n    {\n      ref: \"modal\",\n      attrs: {\n        \"no-close-on-esc\": false,\n        \"no-close-on-backdrop\": true,\n        scrollable: \"\"\n      },\n      scopedSlots: _vm._u([\n        {\n          key: \"modal-header\",\n          fn: function() {\n            return [\n              _c(\"div\", { staticClass: \"w-100\" }, [\n                _c(\n                  \"div\",\n                  {\n                    staticClass:\n                      \"d-flex flex-row  align-items-center justify-content-between\"\n                  },\n                  [\n                    _c(\"h5\", { staticClass: \"m-0\" }, [\n                      _vm._v(\n                        \"\\n                    Add Team Member\\n                \"\n                      )\n                    ])\n                  ]\n                )\n              ])\n            ]\n          },\n          proxy: true\n        },\n        {\n          key: \"modal-footer\",\n          fn: function() {\n            return [\n              _c(\n                \"button\",\n                { staticClass: \"btn btn-primary\", on: { click: _vm.save } },\n                [_vm._v(\"\\n            Save\\n        \")]\n              ),\n              _vm._v(\" \"),\n              _c(\n                \"button\",\n                { staticClass: \"btn btn-secondary\", on: { click: _vm.close } },\n                [_vm._v(\"\\n            Close\\n        \")]\n              )\n            ]\n          },\n          proxy: true\n        }\n      ])\n    },\n    [\n      _vm._v(\" \"),\n      _vm._v(\" \"),\n      _c(\"div\", [\n        _c(\"div\", { staticClass: \"form-group col-md-3\" }, [\n          _c(\"label\", [_vm._v(\"Status\")]),\n          _vm._v(\" \"),\n          _c(\"div\", [_vm._v(_vm._s(_vm.team.name))])\n        ]),\n        _vm._v(\" \"),\n        _c(\"div\", { staticClass: \"form-group col-md\" }, [\n          _c(\"label\", { attrs: { for: \"memberId\" } }, [_vm._v(\"Member\")]),\n          _vm._v(\" \"),\n          _c(\n            \"div\",\n            [\n              _c(\"b-form-select\", {\n                class: _vm.getValidClass(\"memberId\"),\n                attrs: {\n                  options: _vm.members,\n                  \"text-field\": \"name\",\n                  \"value-field\": \"id\"\n                },\n                model: {\n                  value: _vm.memberId,\n                  callback: function($$v) {\n                    _vm.memberId = $$v\n                  },\n                  expression: \"memberId\"\n                }\n              }),\n              _vm._v(\" \"),\n              _vm.validations.get(\"memberId\")\n                ? _c(\"span\", { staticClass: \"text-danger\" }, [\n                    _vm._v(\n                      \"\\n                    \" +\n                        _vm._s(_vm.validations.get(\"memberId\")) +\n                        \"\\n                \"\n                    )\n                  ])\n                : _vm._e()\n            ],\n            1\n          )\n        ])\n      ])\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Modals/Teams/add-member.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "0juK":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/_Shared/app.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core_Mixins_appMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Core/Mixins/appMixin */ \"8GYW\");\n/* harmony import */ var _Core_Modals_Chats_view_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_Core/Modals/Chats/view.vue */ \"y2gb\");\n/* harmony import */ var _app_bar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-bar.vue */ \"mVle\");\n/* harmony import */ var _nav_drawer_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nav-drawer.vue */ \"19mJ\");\n/* harmony import */ var _bottom_nav_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bottom-nav.vue */ \"5GL6\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n //import SystemBar from './system-bar.vue';\n\n\n //import AppFooter from './footer.vue';\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mixins: [_Core_Mixins_appMixin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\n  components: {\n    modalViewChat: _Core_Modals_Chats_view_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    //SystemBar,\n    AppBar: _app_bar_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    NavDrawer: _nav_drawer_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    //AppFooter,\n    BottomNav: _bottom_nav_vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  },\n  props: {\n    uid: String,\n    appName: String,\n    urlProfilePicture: String\n  },\n\n  data() {\n    return {\n      menus: [{\n        to: '/',\n        label: 'Home',\n        icon: 'fas fa-fw fa-home'\n      } //{ to: '/teams', label: 'Teams', icon: 'fas fa-fw fa-users' },\n      //{ to: '/users', label: 'Users', icon: 'fas fa-fw fa-user' },\n      //{ to: '/contacts', label: 'Contacts', icon: 'fas fa-fw fa-id-card' },\n      ]\n    };\n  },\n\n  async mounted() {//let theme = localStorage.getItem('theme') || '';\n    //if (theme) {\n    //    //debugger;\n    //    let style = document.createElement('link');\n    //    style.type = \"text/css\";\n    //    style.rel = \"stylesheet\";\n    //    style.href = theme;// 'https://bootswatch.com/4/yeti/bootstrap.min.css';\n    //    document.head.appendChild(style);\n    //}\n  },\n\n  async created() {//const vm = this;\n    //let theme = localStorage.getItem('theme') || '';\n    //if (theme) {\n    //    //debugger;\n    //    let style = document.createElement('link');\n    //    style.type = \"text/css\";\n    //    style.rel = \"stylesheet\";\n    //    style.href = theme;// 'https://bootswatch.com/4/yeti/bootstrap.min.css';\n    //    document.head.appendChild(style);\n    //}\n  },\n\n  methods: {//async getMembershipInfo() {\n    //    const vm = this;\n    //    try {\n    //        await vm.$util.axios.get(`api/organizations/${vm.organizationId}/membership-info/${vm.uid}`).\n    //            then(resp => {\n    //                const data = resp.data;\n    //                //vm.membership = data;\n    //                if (data.status === 2) {\n    //                    var isAdmin = data.roles.find(e => e.roleId === 'organizationadministrator') !== undefined;\n    //                    data.isAdmin = isAdmin;\n    //                    data.isMember = !isAdmin;\n    //                    data.isAdminOrMember = data.isAdmin || data.isMember;\n    //                }\n    //                vm.$bus.$emit('event:membership', data);\n    //            });\n    //    } catch (e) {\n    //    }\n    //},\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "19mJ":
/*!******************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _nav_drawer_vue_vue_type_template_id_58e300c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav-drawer.vue?vue&type=template&id=58e300c0& */ \"VPva\");\n/* harmony import */ var _nav_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav-drawer.vue?vue&type=script&lang=js& */ \"TqyB\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _nav_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _nav_drawer_vue_vue_type_template_id_58e300c0___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _nav_drawer_vue_vue_type_template_id_58e300c0___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/_Shared/nav-drawer.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?");

/***/ }),

/***/ "1An+":
/*!****************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/app-bar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./app-bar.vue?vue&type=script&lang=js& */ \"7F4k\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app-bar.vue?");

/***/ }),

/***/ "3MIz":
/*!******************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Clinic/_map.vue?vue&type=template&id=6eee1dcc& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_template_id_6eee1dcc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./_map.vue?vue&type=template&id=6eee1dcc& */ \"FP/9\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_template_id_6eee1dcc___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_template_id_6eee1dcc___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/_map.vue?");

/***/ }),

/***/ "5/vT":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?vue&type=template&id=b1d8a934& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"b-navbar\",\n    {\n      staticClass: \"d-block d-sm-none\",\n      attrs: { fixed: \"bottom\", type: \"dark\", variant: \"dark\" }\n    },\n    [\n      _c(\n        \"b-navbar-nav\",\n        { attrs: { align: \"center\", justified: true } },\n        _vm._l(_vm.menus, function(menu) {\n          return _c(\n            \"li\",\n            { staticClass: \"nav-item\" },\n            [\n              _c(\n                \"router-link\",\n                { staticClass: \"nav-link\", attrs: { to: menu.to } },\n                [\n                  _c(\"span\", { staticClass: \"mr-1\", class: menu.icon }),\n                  _vm._v(\" \"),\n                  _c(\"span\", {\n                    staticClass: \"d-none d-md-inline\",\n                    domProps: { textContent: _vm._s(menu.label) }\n                  })\n                ]\n              )\n            ],\n            1\n          )\n        }),\n        0\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "5GL6":
/*!******************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bottom_nav_vue_vue_type_template_id_b1d8a934___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bottom-nav.vue?vue&type=template&id=b1d8a934& */ \"5ypN\");\n/* harmony import */ var _bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bottom-nav.vue?vue&type=script&lang=js& */ \"OmrG\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _bottom_nav_vue_vue_type_template_id_b1d8a934___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _bottom_nav_vue_vue_type_template_id_b1d8a934___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/_Shared/bottom-nav.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?");

/***/ }),

/***/ "5ypN":
/*!*************************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?vue&type=template&id=b1d8a934& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bottom_nav_vue_vue_type_template_id_b1d8a934___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./bottom-nav.vue?vue&type=template&id=b1d8a934& */ \"5/vT\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bottom_nav_vue_vue_type_template_id_b1d8a934___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bottom_nav_vue_vue_type_template_id_b1d8a934___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?");

/***/ }),

/***/ "7F4k":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/_Shared/app-bar.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core_Mixins_navbarMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Core/Mixins/navbarMixin */ \"8/S3\");\n/* harmony import */ var _Common_Drawers_notifications_drawer_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_Common/Drawers/notifications-drawer.vue */ \"It2h\");\n/* harmony import */ var _Common_Drawers_messages_drawer_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_Common/Drawers/messages-drawer.vue */ \"IImL\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n //import navDrawer from './nav-drawer.vue';\n\n\n //import TeamsDrawer from '../../../_Common/Drawers/teams-drawer.vue';\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mixins: [_Core_Mixins_navbarMixin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\n  props: {\n    uid: String,\n    appName: {\n      type: String,\n      required: true,\n      default: 'LMS'\n    },\n    urlProfilePicture: String,\n    menus: Array\n  },\n  components: {\n    //navDrawer,\n    NotificationsDrawer: _Common_Drawers_notifications_drawer_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    MessagesDrawer: _Common_Drawers_messages_drawer_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"] //TeamsDrawer\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app-bar.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "9sLc":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Clinic/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core_Mixins_pageMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Core/Mixins/pageMixin */ \"EQT1\");\n/* harmony import */ var _map_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_map.vue */ \"va/T\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mixins: [_Core_Mixins_pageMixin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\n  components: {\n    gMap: _map_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  props: {\n    uid: String\n  },\n\n  data() {\n    return {\n      isDirty: false,\n      validations: new Map(),\n      lookups: {\n        statuses: [{\n          id: 1,\n          name: 'Open'\n        }, {\n          id: 2,\n          name: 'Closed'\n        }, {\n          id: 3,\n          name: 'Holiday Closed'\n        }]\n      },\n      item: {\n        geoX: 0,\n        geoY: 0\n      }\n    };\n  },\n\n  computed: {\n    formIsValid() {\n      const vm = this; //if (!vm.isDirty)\n      //    return true;\n\n      const item = vm.item;\n      const validations = new Map();\n\n      if (!item.clinicStatus) {\n        validations.set('clinicStatus', 'Status is required.');\n      }\n\n      if (!item.name) {\n        validations.set('name', 'Name is required.');\n      }\n\n      if (!item.openingHours) {\n        validations.set('openingHours', 'Opening Hours is required.');\n      }\n\n      vm.isDirty = true;\n      vm.validations = validations;\n      return validations.size == 0;\n    }\n\n  },\n\n  async created() {\n    const vm = this;\n  },\n\n  async mounted() {\n    const vm = this; //await vm.get();\n  },\n\n  methods: {\n    async onMapReady() {\n      const vm = this;\n      await vm.get();\n      const gmap = vm.$refs.gmap;\n      gmap.initMap(vm.item.geoX, vm.item.geoY);\n    },\n\n    onAddress(address, location) {\n      const vm = this;\n      vm.item.address = address.formatted_address;\n      vm.item.geoX = location.lat();\n      vm.item.geoY = location.lng();\n    },\n\n    getValidClass(field) {\n      const vm = this;\n      if (!vm.isDirty) return '';\n      if (vm.validations.has(field)) return 'is-invalid';\n      return 'is-valid';\n    },\n\n    async get() {\n      const vm = this;\n      await vm.$util.axios.get(`/api/clinics/my-clinic`).then(resp => vm.item = resp.data);\n    },\n\n    async save() {\n      const vm = this;\n      if (vm.busy) return;\n      if (!vm.formIsValid) return;\n\n      try {\n        vm.busy = true;\n        const item = vm.item;\n        const payload = vm.$util.clone(item);\n        await vm.$util.axios.put(`/api/clinics/`, payload).then(resp => {\n          vm.$bvToast.toast('Clinic information created.', {\n            title: 'Updated Clinic Information',\n            variant: 'success',\n            toaster: 'b-toaster-bottom-right'\n          });\n          vm.get();\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      } finally {\n        vm.busy = false;\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/index.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "A2tD":
/*!****************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Teams/add.vue?vue&type=template&id=1e53fc04& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_template_id_1e53fc04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./add.vue?vue&type=template&id=1e53fc04& */ \"ILWo\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_template_id_1e53fc04___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_template_id_1e53fc04___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/add.vue?");

/***/ }),

/***/ "AjLy":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?vue&type=template&id=58e300c0& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"b-sidebar\",\n    {\n      attrs: { id: \"navDrawer\", title: _vm.appName, backdrop: \"\", shadow: \"\" }\n    },\n    [\n      _c(\n        \"div\",\n        { staticClass: \"list-group list-group-flush\" },\n        [\n          _c(\n            \"router-link\",\n            {\n              staticClass: \"list-group-item list-group-item-action\",\n              attrs: { to: \"/\" }\n            },\n            [\n              _c(\"span\", { staticClass: \"fas fa-fw fa-home mr-1\" }),\n              _vm._v(\"Home\\n        \")\n            ]\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"router-link\",\n            {\n              staticClass: \"list-group-item list-group-item-action\",\n              attrs: { to: \"/contacts\" }\n            },\n            [\n              _c(\"span\", { staticClass: \"fas fa-fw fa-id-card mr-1\" }),\n              _vm._v(\"Contacts\\n        \")\n            ]\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"router-link\",\n            {\n              staticClass: \"list-group-item list-group-item-action\",\n              attrs: { to: \"/tasks\" }\n            },\n            [\n              _c(\"span\", { staticClass: \"fas fa-fw fa-tasks mr-1\" }),\n              _vm._v(\"Tasks\\n        \")\n            ]\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"router-link\",\n            {\n              staticClass: \"list-group-item list-group-item-action\",\n              attrs: { to: \"/documents\" }\n            },\n            [\n              _c(\"span\", { staticClass: \"fas fa-fw fa-archive mr-1\" }),\n              _vm._v(\"Documents\\n        \")\n            ]\n          )\n        ],\n        1\n      )\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "Bpku":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core_Mixins_pageMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Core/Mixins/pageMixin */ \"EQT1\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mixins: [_Core_Mixins_pageMixin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\n  props: {\n    uid: String,\n    menus: Array\n  },\n\n  data() {\n    return {};\n  },\n\n  computed: {},\n\n  async created() {\n    const vm = this;\n  },\n\n  async mounted() {\n    const vm = this;\n  },\n\n  methods: {}\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "CDml":
/*!************************************************************************************************!*\
  !*** ./ClientApp/Pedia/Modals/Teams/add-member.vue?vue&type=template&id=16a55a49&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_template_id_16a55a49_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./add-member.vue?vue&type=template&id=16a55a49&scoped=true& */ \"+MN0\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_template_id_16a55a49_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_template_id_16a55a49_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Modals/Teams/add-member.vue?");

/***/ }),

/***/ "CEJQ":
/*!************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/app.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=script&lang=js& */ \"0juK\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app.vue?");

/***/ }),

/***/ "CcfX":
/*!*********************************!*\
  !*** ./ClientApp/Pedia/main.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _Core_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_Core/core */ \"zCnV\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.css */ \"v6s/\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ \"oCYn\");\n/* harmony import */ var _Pages_Shared_app_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pages/_Shared/app.vue */ \"EGl4\");\n/* harmony import */ var vue_observe_visibility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-observe-visibility */ \"hf7O\");\n/* harmony import */ var _Core_Plugins_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_Core/Plugins/common */ \"bM+u\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-router */ \"jE9Z\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./router */ \"SQ1T\");\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].use(vue_observe_visibility__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n\nvue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].use(_Core_Plugins_common__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n\nvue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\nnew vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  el: '#app',\n  router: _router__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  components: {\n    App: _Pages_Shared_app_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  },\n\n  created() {\n    $(document).ready(function () {\n      $('.main').addClass('main-loaded');\n    }); //let theme = localStorage.getItem('theme') || '';\n    //if (theme) {\n    //    //debugger;\n    //    let style = document.createElement('link');\n    //    style.type = \"text/css\";\n    //    style.rel = \"stylesheet\";\n    //    style.href = theme;// 'https://bootswatch.com/4/yeti/bootstrap.min.css';\n    //    document.head.appendChild(style);\n    //}\n  }\n\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"EVdn\")))\n\n//# sourceURL=webpack:///./ClientApp/Pedia/main.js?");

/***/ }),

/***/ "EGl4":
/*!***********************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/app.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_vue_vue_type_template_id_36b51a0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=36b51a0c& */ \"jBfW\");\n/* harmony import */ var _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js& */ \"CEJQ\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _app_vue_vue_type_template_id_36b51a0c___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _app_vue_vue_type_template_id_36b51a0c___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/_Shared/app.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app.vue?");

/***/ }),

/***/ "FP/9":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Clinic/_map.vue?vue&type=template&id=6eee1dcc& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {\n    staticStyle: { height: \"100%\", width: \"100%\" },\n    attrs: { id: _vm.mapName }\n  })\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/_map.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "GwlZ":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/_Shared/app.vue?vue&type=template&id=36b51a0c& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {},\n    [\n      _c(\"app-bar\", {\n        attrs: {\n          uid: _vm.uid,\n          appName: _vm.appName,\n          urlProfilePicture: _vm.urlProfilePicture,\n          menus: _vm.menus\n        }\n      }),\n      _vm._v(\" \"),\n      _c(\n        \"main\",\n        { staticClass: \"container-lg main mb-5 mb-md-0 pb-5 pb-sm-0\" },\n        [_c(\"router-view\", { attrs: { uid: _vm.uid } })],\n        1\n      ),\n      _vm._v(\" \"),\n      _c(\"bottom-nav\", { attrs: { menus: _vm.menus } }),\n      _vm._v(\" \"),\n      _c(\"modal-view-chat\", { ref: \"modalViewChat\", attrs: { uid: _vm.uid } })\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "ILWo":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Teams/add.vue?vue&type=template&id=1e53fc04& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {}, [\n    _c(\n      \"div\",\n      {\n        staticClass: \"d-flex flex-column flex-sm-row justify-content-sm-between\"\n      },\n      [\n        _vm._m(0),\n        _vm._v(\" \"),\n        _c(\"div\", { staticClass: \"text-right\" }, [\n          _c(\n            \"button\",\n            { staticClass: \"btn btn-primary\", on: { click: _vm.save } },\n            [_c(\"span\", { staticClass: \"fas fa-fw fa-save\" })]\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"button\",\n            { staticClass: \"btn btn-secondary\", on: { click: _vm.close } },\n            [_c(\"span\", { staticClass: \"fas fa-fw fa-times-circle\" })]\n          )\n        ])\n      ]\n    ),\n    _vm._v(\" \"),\n    _c(\"div\", { staticClass: \"form-group\" }, [\n      _c(\"label\", { attrs: { for: \"name\" } }, [_vm._v(\"Name\")]),\n      _vm._v(\" \"),\n      _c(\"div\", [\n        _c(\"input\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model\",\n              value: _vm.item.name,\n              expression: \"item.name\"\n            }\n          ],\n          staticClass: \"form-control\",\n          attrs: { type: \"text\", id: \"name\" },\n          domProps: { value: _vm.item.name },\n          on: {\n            input: function($event) {\n              if ($event.target.composing) {\n                return\n              }\n              _vm.$set(_vm.item, \"name\", $event.target.value)\n            }\n          }\n        })\n      ])\n    ]),\n    _vm._v(\" \"),\n    _c(\"div\", { staticClass: \"form-group\" }, [\n      _c(\"label\", { attrs: { for: \"description\" } }, [_vm._v(\"Description\")]),\n      _vm._v(\" \"),\n      _c(\"div\", [\n        _c(\"input\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model\",\n              value: _vm.item.description,\n              expression: \"item.description\"\n            }\n          ],\n          staticClass: \"form-control\",\n          attrs: { type: \"text\", id: \"description\" },\n          domProps: { value: _vm.item.description },\n          on: {\n            input: function($event) {\n              if ($event.target.composing) {\n                return\n              }\n              _vm.$set(_vm.item, \"description\", $event.target.value)\n            }\n          }\n        })\n      ])\n    ])\n  ])\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"h4\", { staticClass: \"mb-sm-0\" }, [\n      _c(\"i\", { staticClass: \"fas fa-fw fa-user-plus mr-1\" }),\n      _vm._v(\"Add Team\\n        \")\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/add.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "Iwww":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Accounts/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Common_Components_Accounts_index_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Common/Components/Accounts/index.vue */ \"qUQk\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  //mixins: [pageMixin],\n  props: {\n    uid: String\n  },\n  components: {\n    accountsIndex: _Common_Components_Accounts_index_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n\n  data() {\n    return {};\n  },\n\n  computed: {},\n\n  async created() {\n    const vm = this;\n  },\n\n  async mounted() {\n    const vm = this;\n  },\n\n  methods: {//openModal() {\n    //    const vm = this;\n    //    vm.$refs.modalChangeTheme.open();\n    //}\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Accounts/index.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "LnYT":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Clinic/index.vue?vue&type=template&id=0b022ea5&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {}, [\n    _c(\"div\", { staticClass: \"row align-items-center\" }, [\n      _vm._m(0),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"col-auto\" }, [\n        _c(\"div\", [\n          _c(\n            \"button\",\n            { staticClass: \"btn btn-primary\", on: { click: _vm.get } },\n            [_c(\"span\", { staticClass: \"fas fa-fw fa-sync\" })]\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"button\",\n            {\n              staticClass: \"btn btn-primary\",\n              attrs: { disabled: _vm.isDirty && !_vm.formIsValid },\n              on: { click: _vm.save }\n            },\n            [_c(\"span\", { staticClass: \"fas fa-fw fa-save\" })]\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"button\",\n            { staticClass: \"btn btn-secondary\", on: { click: _vm.close } },\n            [_c(\"span\", { staticClass: \"fas fa-fw fa-times-circle\" })]\n          )\n        ])\n      ])\n    ]),\n    _vm._v(\" \"),\n    _c(\"div\", { staticClass: \"mt-2\" }, [\n      _c(\"div\", { staticClass: \"form-group\" }, [\n        _c(\"label\", { attrs: { for: \"name\" } }, [_vm._v(\"Name\")]),\n        _vm._v(\" \"),\n        _c(\"div\", [\n          _c(\"input\", {\n            directives: [\n              {\n                name: \"model\",\n                rawName: \"v-model\",\n                value: _vm.item.name,\n                expression: \"item.name\"\n              }\n            ],\n            staticClass: \"form-control\",\n            class: _vm.getValidClass(\"name\"),\n            attrs: { type: \"text\", id: \"name\" },\n            domProps: { value: _vm.item.name },\n            on: {\n              input: function($event) {\n                if ($event.target.composing) {\n                  return\n                }\n                _vm.$set(_vm.item, \"name\", $event.target.value)\n              }\n            }\n          }),\n          _vm._v(\" \"),\n          _vm.validations.has(\"name\")\n            ? _c(\"div\", { staticClass: \"invalid-feedback\" }, [\n                _vm._v(\n                  \"\\n                    \" +\n                    _vm._s(_vm.validations.get(\"name\")) +\n                    \"\\n                \"\n                )\n              ])\n            : _vm._e()\n        ])\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"form-row\" }, [\n        _c(\"div\", { staticClass: \"form-group col-md\" }, [\n          _c(\"label\", { attrs: { for: \"phoneNumber\" } }, [_vm._v(\"Phone\")]),\n          _vm._v(\" \"),\n          _c(\"div\", [\n            _c(\"input\", {\n              directives: [\n                {\n                  name: \"model\",\n                  rawName: \"v-model\",\n                  value: _vm.item.phoneNumber,\n                  expression: \"item.phoneNumber\"\n                }\n              ],\n              staticClass: \"form-control\",\n              class: _vm.getValidClass(\"phoneNumber\"),\n              attrs: { type: \"tel\", id: \"phoneNumber\" },\n              domProps: { value: _vm.item.phoneNumber },\n              on: {\n                input: function($event) {\n                  if ($event.target.composing) {\n                    return\n                  }\n                  _vm.$set(_vm.item, \"phoneNumber\", $event.target.value)\n                }\n              }\n            }),\n            _vm._v(\" \"),\n            _vm.validations.has(\"phoneNumber\")\n              ? _c(\"div\", { staticClass: \"invalid-feedback\" }, [\n                  _vm._v(\n                    \"\\n                        \" +\n                      _vm._s(_vm.validations.get(\"phoneNumber\")) +\n                      \"\\n                    \"\n                  )\n                ])\n              : _vm._e()\n          ])\n        ]),\n        _vm._v(\" \"),\n        _c(\"div\", { staticClass: \"form-group col-md\" }, [\n          _c(\"label\", { attrs: { for: \"mobileNumber\" } }, [_vm._v(\"Mobile\")]),\n          _vm._v(\" \"),\n          _c(\"div\", [\n            _c(\"input\", {\n              directives: [\n                {\n                  name: \"model\",\n                  rawName: \"v-model\",\n                  value: _vm.item.mobileNumber,\n                  expression: \"item.mobileNumber\"\n                }\n              ],\n              staticClass: \"form-control\",\n              class: _vm.getValidClass(\"mobileNumber\"),\n              attrs: { type: \"tel\", id: \"mobileNumber\" },\n              domProps: { value: _vm.item.mobileNumber },\n              on: {\n                input: function($event) {\n                  if ($event.target.composing) {\n                    return\n                  }\n                  _vm.$set(_vm.item, \"mobileNumber\", $event.target.value)\n                }\n              }\n            }),\n            _vm._v(\" \"),\n            _vm.validations.has(\"mobileNumber\")\n              ? _c(\"div\", { staticClass: \"invalid-feedback\" }, [\n                  _vm._v(\n                    \"\\n                        \" +\n                      _vm._s(_vm.validations.get(\"mobileNumber\")) +\n                      \"\\n                    \"\n                  )\n                ])\n              : _vm._e()\n          ])\n        ]),\n        _vm._v(\" \"),\n        _c(\"div\", { staticClass: \"form-group col-md\" }, [\n          _c(\"label\", { attrs: { for: \"email\" } }, [_vm._v(\"Email\")]),\n          _vm._v(\" \"),\n          _c(\"div\", [\n            _c(\"input\", {\n              directives: [\n                {\n                  name: \"model\",\n                  rawName: \"v-model\",\n                  value: _vm.item.email,\n                  expression: \"item.email\"\n                }\n              ],\n              staticClass: \"form-control\",\n              class: _vm.getValidClass(\"email\"),\n              attrs: { type: \"email\", id: \"email\" },\n              domProps: { value: _vm.item.email },\n              on: {\n                input: function($event) {\n                  if ($event.target.composing) {\n                    return\n                  }\n                  _vm.$set(_vm.item, \"email\", $event.target.value)\n                }\n              }\n            }),\n            _vm._v(\" \"),\n            _vm.validations.has(\"email\")\n              ? _c(\"div\", { staticClass: \"invalid-feedback\" }, [\n                  _vm._v(\n                    \"\\n                        \" +\n                      _vm._s(_vm.validations.get(\"email\")) +\n                      \"\\n                    \"\n                  )\n                ])\n              : _vm._e()\n          ])\n        ])\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"form-row\" }, [\n        _c(\"div\", { staticClass: \"form-group col-md-4\" }, [\n          _c(\"label\", { attrs: { for: \"clinicStatus\" } }, [_vm._v(\"Status\")]),\n          _vm._v(\" \"),\n          _c(\n            \"div\",\n            [\n              _c(\"b-form-select\", {\n                staticClass: \"form-control\",\n                class: _vm.getValidClass(\"clinicStatus\"),\n                attrs: {\n                  options: _vm.lookups.statuses,\n                  \"value-field\": \"id\",\n                  \"text-field\": \"name\",\n                  id: \"clinicStatus\"\n                },\n                model: {\n                  value: _vm.item.clinicStatus,\n                  callback: function($$v) {\n                    _vm.$set(_vm.item, \"clinicStatus\", $$v)\n                  },\n                  expression: \"item.clinicStatus\"\n                }\n              }),\n              _vm._v(\" \"),\n              _vm.validations.has(\"clinicStatus\")\n                ? _c(\"div\", { staticClass: \"invalid-feedback\" }, [\n                    _vm._v(\n                      \"\\n                        \" +\n                        _vm._s(_vm.validations.get(\"clinicStatus\")) +\n                        \"\\n                    \"\n                    )\n                  ])\n                : _vm._e()\n            ],\n            1\n          )\n        ]),\n        _vm._v(\" \"),\n        _c(\"div\", { staticClass: \"form-group col-md\" }, [\n          _c(\"label\", { attrs: { for: \"openingHours\" } }, [\n            _vm._v(\"Opening Hours\")\n          ]),\n          _vm._v(\" \"),\n          _c(\"div\", [\n            _c(\"input\", {\n              directives: [\n                {\n                  name: \"model\",\n                  rawName: \"v-model\",\n                  value: _vm.item.openingHours,\n                  expression: \"item.openingHours\"\n                }\n              ],\n              staticClass: \"form-control\",\n              class: _vm.getValidClass(\"openingHours\"),\n              attrs: { type: \"text\", id: \"openingHours\" },\n              domProps: { value: _vm.item.openingHours },\n              on: {\n                input: function($event) {\n                  if ($event.target.composing) {\n                    return\n                  }\n                  _vm.$set(_vm.item, \"openingHours\", $event.target.value)\n                }\n              }\n            }),\n            _vm._v(\" \"),\n            _vm.validations.has(\"openingHours\")\n              ? _c(\"div\", { staticClass: \"invalid-feedback\" }, [\n                  _vm._v(\n                    \"\\n                        \" +\n                      _vm._s(_vm.validations.get(\"openingHours\")) +\n                      \"\\n                    \"\n                  )\n                ])\n              : _vm._e()\n          ])\n        ])\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"form-group\" }, [\n        _c(\"label\", { attrs: { for: \"address\" } }, [_vm._v(\"Address\")]),\n        _vm._v(\" \"),\n        _c(\"div\", [\n          _c(\"textarea\", {\n            directives: [\n              {\n                name: \"model\",\n                rawName: \"v-model\",\n                value: _vm.item.address,\n                expression: \"item.address\"\n              }\n            ],\n            staticClass: \"form-control\",\n            class: _vm.getValidClass(\"address\"),\n            attrs: { type: \"text\", id: \"address\" },\n            domProps: { value: _vm.item.address },\n            on: {\n              input: function($event) {\n                if ($event.target.composing) {\n                  return\n                }\n                _vm.$set(_vm.item, \"address\", $event.target.value)\n              }\n            }\n          }),\n          _vm._v(\" \"),\n          _vm.validations.has(\"address\")\n            ? _c(\"div\", { staticClass: \"invalid-feedback\" }, [\n                _vm._v(\n                  \"\\n                    \" +\n                    _vm._s(_vm.validations.get(\"address\")) +\n                    \"\\n                \"\n                )\n              ])\n            : _vm._e()\n        ])\n      ])\n    ]),\n    _vm._v(\" \"),\n    _c(\n      \"div\",\n      { staticStyle: { height: \"500px\" } },\n      [\n        _c(\"g-map\", {\n          ref: \"gmap\",\n          attrs: {\n            \"map-name\": \"local-map\",\n            fixed: false,\n            \"show-location\": true,\n            cx: _vm.item.geoX,\n            cy: _vm.item.geoY,\n            draggable: true\n          },\n          on: { onMapReady: _vm.onMapReady, onAddress: _vm.onAddress }\n        })\n      ],\n      1\n    )\n  ])\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"col\" }, [\n      _c(\"h1\", { staticClass: \"h3 mb-sm-0\" }, [\n        _c(\"i\", { staticClass: \"fas fa-fw fa-clinic-medical mr-1\" }),\n        _vm._v(\"Pharmacy Information\\n            \")\n      ])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/index.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "LrUR":
/*!*****************************************!*\
  !*** ./ClientApp/Pedia/Pages/index.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_vue_vue_type_template_id_00763fb0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=00763fb0& */ \"cSkI\");\n/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ \"jugk\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _index_vue_vue_type_template_id_00763fb0___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _index_vue_vue_type_template_id_00763fb0___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/index.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/index.vue?");

/***/ }),

/***/ "Muw6":
/*!*********************************************!*\
  !*** ./ClientApp/Pedia/Pages/Teams/add.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add_vue_vue_type_template_id_1e53fc04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add.vue?vue&type=template&id=1e53fc04& */ \"A2tD\");\n/* harmony import */ var _add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add.vue?vue&type=script&lang=js& */ \"c+tT\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _add_vue_vue_type_template_id_1e53fc04___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _add_vue_vue_type_template_id_1e53fc04___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/Teams/add.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/add.vue?");

/***/ }),

/***/ "OmrG":
/*!*******************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./bottom-nav.vue?vue&type=script&lang=js& */ \"Bpku\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/bottom-nav.vue?");

/***/ }),

/***/ "OrBC":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Teams/index.vue?vue&type=template&id=2223746f& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {},\n    [\n      _c(\"div\", { staticClass: \"row align-items-center\" }, [\n        _vm._m(0),\n        _vm._v(\" \"),\n        _c(\"div\", { staticClass: \"col-sm-auto\" }, [\n          _c(\"div\", { staticClass: \"d-flex flex-row\" }, [\n            _c(\n              \"div\",\n              { staticClass: \"mr-1\" },\n              [\n                _c(\n                  \"router-link\",\n                  {\n                    staticClass: \"btn btn-primary\",\n                    attrs: { to: \"/teams/add\" }\n                  },\n                  [_c(\"i\", { staticClass: \"fas fa-plus\" })]\n                )\n              ],\n              1\n            ),\n            _vm._v(\" \"),\n            _c(\"div\", { staticClass: \"flex-grow-1\" }, [\n              _c(\"div\", { staticClass: \"input-group\" }, [\n                _c(\"input\", {\n                  directives: [\n                    {\n                      name: \"model\",\n                      rawName: \"v-model\",\n                      value: _vm.filter.query.criteria,\n                      expression: \"filter.query.criteria\"\n                    }\n                  ],\n                  staticClass: \"form-control\",\n                  attrs: {\n                    type: \"text\",\n                    placeholder: \"Enter criteria...\",\n                    \"aria-label\": \"Enter criteria...\",\n                    \"aria-describedby\": \"button-addon2\"\n                  },\n                  domProps: { value: _vm.filter.query.criteria },\n                  on: {\n                    keyup: function($event) {\n                      if (\n                        !$event.type.indexOf(\"key\") &&\n                        _vm._k($event.keyCode, \"enter\", 13, $event.key, \"Enter\")\n                      ) {\n                        return null\n                      }\n                      return _vm.search(1)\n                    },\n                    input: function($event) {\n                      if ($event.target.composing) {\n                        return\n                      }\n                      _vm.$set(\n                        _vm.filter.query,\n                        \"criteria\",\n                        $event.target.value\n                      )\n                    }\n                  }\n                }),\n                _vm._v(\" \"),\n                _c(\"div\", { staticClass: \"input-group-append\" }, [\n                  _c(\n                    \"button\",\n                    {\n                      staticClass: \"btn btn-primary\",\n                      attrs: { type: \"button\", id: \"button-addon2\" },\n                      on: {\n                        click: function($event) {\n                          return _vm.search(1)\n                        }\n                      }\n                    },\n                    [_c(\"span\", { staticClass: \"fa fas fa-fw fa-search\" })]\n                  )\n                ])\n              ])\n            ])\n          ])\n        ])\n      ]),\n      _vm._v(\" \"),\n      _c(\"b-collapse\", {\n        model: {\n          value: _vm.filter.visible,\n          callback: function($$v) {\n            _vm.$set(_vm.filter, \"visible\", $$v)\n          },\n          expression: \"filter.visible\"\n        }\n      }),\n      _vm._v(\" \"),\n      _c(\"b-overlay\", { attrs: { show: _vm.busy } }, [\n        _c(\n          \"div\",\n          { staticClass: \"mt-2 table-responsive shadow-sm\" },\n          [\n            _c(\"table-list\", {\n              attrs: {\n                header: { key: \"teamId\", columns: [] },\n                items: _vm.filter.items,\n                getRowNumber: _vm.getRowNumber,\n                setSelected: _vm.setSelected,\n                isSelected: _vm.isSelected,\n                \"table-css\": \"\"\n              },\n              scopedSlots: _vm._u([\n                {\n                  key: \"header\",\n                  fn: function() {\n                    return [\n                      _c(\"th\", { staticClass: \"text-center\" }, [_vm._v(\"#\")]),\n                      _vm._v(\" \"),\n                      _c(\"th\", [_vm._v(\"Name\")]),\n                      _vm._v(\" \"),\n                      _c(\"th\", [_vm._v(\"Members\")]),\n                      _vm._v(\" \"),\n                      _c(\"th\", [_vm._v(\"Action(s)\")])\n                    ]\n                  },\n                  proxy: true\n                },\n                {\n                  key: \"table\",\n                  fn: function(row) {\n                    return [\n                      _c(\"td\", {\n                        staticClass: \"text-center\",\n                        domProps: {\n                          textContent: _vm._s(_vm.getRowNumber(row.index))\n                        }\n                      }),\n                      _vm._v(\" \"),\n                      _c(\"td\", [\n                        _c(\"div\", [\n                          _vm._v(\n                            \"\\n                            \" +\n                              _vm._s(row.item.name) +\n                              \"\\n                        \"\n                          )\n                        ]),\n                        _vm._v(\" \"),\n                        _c(\"small\", [_vm._v(_vm._s(row.item.description))])\n                      ]),\n                      _vm._v(\" \"),\n                      _c(\"td\", [\n                        _c(\n                          \"ol\",\n                          { staticClass: \"list-unstyled\" },\n                          _vm._l(row.item.members, function(item) {\n                            return _c(\"li\", [\n                              _c(\n                                \"div\",\n                                {\n                                  staticClass:\n                                    \"d-flex flex-row justify-content-between\"\n                                },\n                                [\n                                  _c(\n                                    \"div\",\n                                    [\n                                      _c(\"b-avatar\", {\n                                        attrs: {\n                                          src: item.urlProfilePicture,\n                                          size: \"sm\"\n                                        }\n                                      }),\n                                      _vm._v(\" \"),\n                                      item.userId === _vm.uid\n                                        ? _c(\"span\", [\n                                            _vm._v(\n                                              \"\\n                                            \" +\n                                                _vm._s(item.name) +\n                                                \"\\n                                        \"\n                                            )\n                                          ])\n                                        : _c(\n                                            \"a\",\n                                            {\n                                              attrs: { href: \"#\" },\n                                              on: {\n                                                click: function($event) {\n                                                  $event.preventDefault()\n                                                  return _vm.$bus.$emit(\n                                                    \"event:send-message\",\n                                                    item.userId\n                                                  )\n                                                }\n                                              }\n                                            },\n                                            [\n                                              _vm._v(\n                                                \"\\n                                            \" +\n                                                  _vm._s(item.name) +\n                                                  \"\\n                                        \"\n                                              )\n                                            ]\n                                          )\n                                    ],\n                                    1\n                                  ),\n                                  _vm._v(\" \"),\n                                  _c(\n                                    \"button\",\n                                    {\n                                      staticClass:\n                                        \"btn btn-sm btn-outline-danger\",\n                                      on: {\n                                        click: function($event) {\n                                          return _vm.removeTeamMember(\n                                            row.item,\n                                            item\n                                          )\n                                        }\n                                      }\n                                    },\n                                    [\n                                      _c(\"i\", {\n                                        staticClass: \"fas fa-fw fa-trash\"\n                                      })\n                                    ]\n                                  )\n                                ]\n                              )\n                            ])\n                          }),\n                          0\n                        )\n                      ]),\n                      _vm._v(\" \"),\n                      _c(\"td\", [\n                        _c(\n                          \"button\",\n                          {\n                            staticClass: \"btn btn-sm btn-primary\",\n                            on: {\n                              click: function($event) {\n                                return _vm.addTeamMember(row.item)\n                              }\n                            }\n                          },\n                          [\n                            _c(\"i\", {\n                              staticClass: \"fas fa-fw fa-user-plus mr-1\"\n                            }),\n                            _vm._v(\"Add Member\\n                        \")\n                          ]\n                        ),\n                        _vm._v(\" \"),\n                        _c(\n                          \"button\",\n                          {\n                            staticClass: \"btn btn-sm btn-danger\",\n                            on: {\n                              click: function($event) {\n                                return _vm.removeTeam(row.item)\n                              }\n                            }\n                          },\n                          [\n                            _c(\"i\", { staticClass: \"fas fa-fw fa-trash mr-1\" }),\n                            _vm._v(\"Remove Team\\n                        \")\n                          ]\n                        )\n                      ])\n                    ]\n                  }\n                },\n                {\n                  key: \"list\",\n                  fn: function(row) {\n                    return [\n                      _c(\"div\", [\n                        _c(\n                          \"div\",\n                          { staticClass: \"form-group mb-0 row no-gutters\" },\n                          [\n                            _c(\n                              \"label\",\n                              { staticClass: \"col-3 col-form-label\" },\n                              [_vm._v(\"Name\")]\n                            ),\n                            _vm._v(\" \"),\n                            _c(\n                              \"div\",\n                              { staticClass: \"col align-self-center\" },\n                              [\n                                _c(\"div\", [\n                                  _vm._v(\n                                    \"\\n                                    \" +\n                                      _vm._s(row.item.name) +\n                                      \"\\n                                \"\n                                  )\n                                ]),\n                                _vm._v(\" \"),\n                                _c(\"small\", [\n                                  _vm._v(_vm._s(row.item.description))\n                                ])\n                              ]\n                            )\n                          ]\n                        ),\n                        _vm._v(\" \"),\n                        _c(\n                          \"div\",\n                          { staticClass: \"form-group mb-0 row no-gutters\" },\n                          [\n                            _c(\n                              \"label\",\n                              { staticClass: \"col-3 col-form-label\" },\n                              [_vm._v(\"Members\")]\n                            ),\n                            _vm._v(\" \"),\n                            _c(\n                              \"div\",\n                              { staticClass: \"col align-self-center\" },\n                              [\n                                _c(\n                                  \"ul\",\n                                  { staticClass: \"list-unstyled\" },\n                                  _vm._l(row.item.members, function(item) {\n                                    return _c(\"li\", [\n                                      _c(\n                                        \"div\",\n                                        {\n                                          staticClass:\n                                            \"d-flex flex-row justify-content-between\"\n                                        },\n                                        [\n                                          _c(\n                                            \"div\",\n                                            [\n                                              _c(\"b-avatar\", {\n                                                attrs: {\n                                                  src: item.urlProfilePicture,\n                                                  size: \"sm\"\n                                                }\n                                              }),\n                                              _vm._v(\" \"),\n                                              item.userId === _vm.uid\n                                                ? _c(\"span\", [\n                                                    _vm._v(\n                                                      \"\\n                                                    \" +\n                                                        _vm._s(item.name) +\n                                                        \"\\n                                                \"\n                                                    )\n                                                  ])\n                                                : _c(\n                                                    \"a\",\n                                                    {\n                                                      attrs: { href: \"#\" },\n                                                      on: {\n                                                        click: function(\n                                                          $event\n                                                        ) {\n                                                          $event.preventDefault()\n                                                          return _vm.$bus.$emit(\n                                                            \"event:send-message\",\n                                                            item.userId\n                                                          )\n                                                        }\n                                                      }\n                                                    },\n                                                    [\n                                                      _vm._v(\n                                                        \"\\n                                                    \" +\n                                                          _vm._s(item.name) +\n                                                          \"\\n                                                \"\n                                                      )\n                                                    ]\n                                                  )\n                                            ],\n                                            1\n                                          ),\n                                          _vm._v(\" \"),\n                                          _c(\n                                            \"button\",\n                                            {\n                                              staticClass:\n                                                \"btn btn-sm btn-outline-danger\",\n                                              on: {\n                                                click: function($event) {\n                                                  return _vm.removeTeamMember(\n                                                    row.item,\n                                                    item\n                                                  )\n                                                }\n                                              }\n                                            },\n                                            [\n                                              _c(\"i\", {\n                                                staticClass:\n                                                  \"fas fa-fw fa-trash\"\n                                              })\n                                            ]\n                                          )\n                                        ]\n                                      )\n                                    ])\n                                  }),\n                                  0\n                                )\n                              ]\n                            )\n                          ]\n                        ),\n                        _vm._v(\" \"),\n                        _c(\n                          \"div\",\n                          { staticClass: \"form-group mb-0 row no-gutters\" },\n                          [\n                            _c(\n                              \"div\",\n                              { staticClass: \"offset-3 col align-self-center\" },\n                              [\n                                _c(\"div\", [\n                                  _c(\n                                    \"button\",\n                                    {\n                                      staticClass:\n                                        \"btn btn-sm btn-outline-primary\",\n                                      on: {\n                                        click: function($event) {\n                                          return _vm.addTeamMember(row.item)\n                                        }\n                                      }\n                                    },\n                                    [\n                                      _c(\"i\", {\n                                        staticClass: \"fas fa-fw fa-user-plus\"\n                                      }),\n                                      _vm._v(\" \"),\n                                      _c(\n                                        \"span\",\n                                        {\n                                          staticClass:\n                                            \"ml-1 d-none d-sm-inline-flex\"\n                                        },\n                                        [\n                                          _vm._v(\n                                            \"\\n                                            Add Member\\n                                        \"\n                                          )\n                                        ]\n                                      )\n                                    ]\n                                  ),\n                                  _vm._v(\" \"),\n                                  _c(\n                                    \"button\",\n                                    {\n                                      staticClass:\n                                        \"btn btn-sm btn-outline-danger\",\n                                      on: {\n                                        click: function($event) {\n                                          return _vm.removeTeam(row.item)\n                                        }\n                                      }\n                                    },\n                                    [\n                                      _c(\"i\", {\n                                        staticClass: \"fas fa-fw fa-trash\"\n                                      }),\n                                      _vm._v(\" \"),\n                                      _c(\n                                        \"span\",\n                                        {\n                                          staticClass:\n                                            \"ml-1 d-none d-sm-inline-flex\"\n                                        },\n                                        [\n                                          _vm._v(\n                                            \"\\n                                            Remove Team\\n                                        \"\n                                          )\n                                        ]\n                                      )\n                                    ]\n                                  )\n                                ])\n                              ]\n                            )\n                          ]\n                        )\n                      ])\n                    ]\n                  }\n                }\n              ])\n            })\n          ],\n          1\n        )\n      ]),\n      _vm._v(\" \"),\n      _c(\"m-pagination\", {\n        staticClass: \"mt-2\",\n        attrs: { filter: _vm.filter, search: _vm.search, showPerPage: true }\n      }),\n      _vm._v(\" \"),\n      _c(\"modal-add-member\", {\n        ref: \"modalAddMember\",\n        on: { saved: _vm.search }\n      })\n    ],\n    1\n  )\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"col-sm\" }, [\n      _c(\"h1\", { staticClass: \"h3 mb-sm-0\" }, [\n        _c(\"i\", { staticClass: \"fas fa-fw fa-users mr-1\" }),\n        _vm._v(\"Teams\\n            \")\n      ])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/index.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "QEHb":
/*!***********************************************!*\
  !*** ./ClientApp/Pedia/Pages/Teams/index.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_vue_vue_type_template_id_2223746f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=2223746f& */ \"RcLL\");\n/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ \"wBuX\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _index_vue_vue_type_template_id_2223746f___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _index_vue_vue_type_template_id_2223746f___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/Teams/index.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/index.vue?");

/***/ }),

/***/ "QPBt":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Clinic/_map.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    mapName: String,\n    draggable: Boolean,\n    fixed: Boolean,\n    showLocation: Boolean,\n    cx: Number,\n    cy: Number,\n    markerClickAction: Function //items: Array,\n\n  },\n  watch: {\n    'cx': function (newValue, oldValue) {\n      const vm = this; //debugger\n\n      if (vm.map.setCenter) {//var lng = vm.centerPosition.lng();\n        //debugger\n        //vm.centerPosition.lat = newValue;\n        //vm.centerPosition = new google.maps.LatLng(newValue,lng);\n        //vm.map.setCenter(vm.centerPosition);\n        //vm.setMarker();\n      }\n    },\n    'cy': function (newValue, oldValue) {\n      const vm = this; //debugger\n\n      if (vm.map.setCenter) {//vm.centerPosition.lng = newValue;\n        //vm.map.setCenter(vm.centerPosition);\n        //vm.setMarker();\n      }\n    }\n  },\n\n  data() {\n    return {\n      navigator: {},\n      centerPosition: {\n        lat: 0,\n        lng: 0\n      },\n      // { lat: 13.942504351499613, lng: 120.72873957918004 },// { lat: 13.8954684059025, lng: 120.906667412659 }, //13.942504351499613, 120.72873957918004\n      map: {},\n      marker: {},\n      infoWindow: {},\n      geocode: {},\n      items: [],\n      markers: []\n    };\n  },\n\n  created() {\n    const vm = this;\n  },\n\n  async mounted() {\n    const vm = this;\n    vm.navigator = navigator;\n    vm.navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;\n    var timerId = setInterval(_ => {\n      if (google && google.maps) {\n        clearInterval(timerId); //vm.initMap();\n\n        vm.$emit('onMapReady');\n      }\n    }, 250);\n  },\n\n  methods: {\n    async initMap(cx, cy) {\n      const vm = this;\n      vm.centerPosition = {\n        lat: cx,\n        lng: cy\n      };\n      /*\n      Build list of map types.\n      You can also use var mapTypeIds = [\"roadmap\", \"satellite\", \"hybrid\", \"terrain\", \"OSM\"]\n      but static lists suck when Google updates the default list of map types.\n      */\n\n      var mapTypeIds = [];\n\n      for (var type in google.maps.MapTypeId) {\n        mapTypeIds.push(google.maps.MapTypeId[type]);\n      } //mapTypeIds.push(\"OSM\");\n\n\n      const lastZoom = Number.parseInt(localStorage.getItem('zoom')) || 15;\n      vm.map = new google.maps.Map(document.getElementById(vm.mapName), {\n        center: vm.centerPosition,\n        //{ lat: 13.948779, lng: 120.733035 }, //13.948779,120.733035\n        zoom: lastZoom,\n        //mapTypeId: \"OSM\",\n        mapTypeControl: true,\n        streetViewControl: false,\n        mapTypeControlOptions: {\n          mapTypeIds: mapTypeIds\n        }\n      });\n      vm.map.mapTypes.set(\"OSM\", new google.maps.ImageMapType({\n        getTileUrl: function (coord, zoom) {\n          // \"Wrap\" x (longitude) at 180th meridian properly\n          // NB: Don't touch coord.x: because coord param is by reference, and changing its x property breaks something in Google's lib\n          var tilesPerGlobe = 1 << zoom;\n          var x = coord.x % tilesPerGlobe;\n\n          if (x < 0) {\n            x = tilesPerGlobe + x;\n          } // Wrap y (latitude) in a like manner if you want to enable vertical infinite scrolling\n\n\n          return \"https://tile.openstreetmap.org/\" + zoom + \"/\" + x + \"/\" + coord.y + \".png\";\n        },\n        tileSize: new google.maps.Size(256, 256),\n        name: \"Open Street Map\",\n        maxZoom: 18\n      }));\n      vm.infoWindow = new google.maps.InfoWindow();\n      vm.geocoder = new google.maps.Geocoder();\n\n      if (vm.navigator.geolocation) {\n        if (vm.cx === 0 && vm.cy === 0) {\n          await vm.getCurrentLocation();\n        } else {\n          vm.map.setCenter(vm.centerPosition);\n          vm.setMarker();\n        }\n\n        google.maps.event.addListener(vm.map, 'zoom_changed', function (arg) {\n          localStorage.setItem('zoom', this.zoom);\n        });\n      } else {\n        // Browser doesn't support Geolocation\n        vm.handleLocationError(false, vm.infoWindow, vm.map.getCenter());\n        debugger;\n      }\n    },\n\n    handleLocationError(browserHasGeolocation, infoWindow, pos) {\n      const vm = this;\n      vm.infoWindow.setPosition(pos);\n      vm.infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\\'t support geolocation.');\n      vm.infoWindow.open(map);\n    },\n\n    geocodeLatLng(event, marker) {\n      const vm = this;\n      vm.geocoder.geocode({\n        'location': marker.position\n      }, function (results, status) {\n        if (status === 'OK') {\n          vm.$emit(event, results[0], {\n            lat: vm.centerPosition.lat,\n            lng: vm.centerPosition.lng\n          });\n        } else {\n          window.alert('Geocoder failed due to: ' + status);\n        }\n      });\n    },\n\n    async getCurrentLocation() {\n      const vm = this;\n      await vm.navigator.geolocation.getCurrentPosition(function (position) {\n        //if (!vm.fixed) {\n        vm.centerPosition = {\n          lat: position.coords.latitude,\n          lng: position.coords.longitude\n        }; //}\n\n        vm.map.setCenter(vm.centerPosition);\n\n        if (vm.showLocation) {\n          vm.setMarker(); //vm.marker = new google.maps.Marker({\n          //    draggable: vm.draggable,\n          //    //animation: google.maps.Animation.BOUNCE,\n          //    position: vm.centerPosition,\n          //    map: vm.map,\n          //    //title: \"Your Current Location\",\n          //    //label: {\n          //    //    text: 'You',\n          //    //    //fontFamily: 'Fontawesome',\n          //    //},\n          //});\n          ////var latlng = new google.maps.LatLng(40.748774, -73.985763);\n          //vm.marker.setPosition(vm.centerPosition);\n          //google.maps.event.addListener(vm.marker, 'dragend', function (event) {\n          //    vm.centerPosition = this.getPosition();\n          //    vm.geocodeLatLng();\n          //});\n        }\n      });\n    },\n\n    setMarker() {\n      const vm = this;\n      if (vm.marker && vm.marker.setMap) vm.marker.setMap(null);\n      vm.marker = new google.maps.Marker({\n        draggable: vm.draggable,\n        //animation: google.maps.Animation.BOUNCE,\n        position: vm.centerPosition,\n        map: vm.map //title: \"Your Current Location\",\n        //label: {\n        //    text: 'You',\n        //    //fontFamily: 'Fontawesome',\n        //},\n\n      }); ////var latlng = new google.maps.LatLng(40.748774, -73.985763);\n      //vm.marker.setPosition(vm.centerPosition);\n\n      google.maps.event.addListener(vm.marker, 'dragend', function (event) {\n        vm.centerPosition = this.getPosition();\n        vm.geocodeLatLng('onAddress', vm.marker);\n      });\n    },\n\n    placeMarkers(items, recenter) {\n      //debugger;\n      const vm = this;\n      let markers = vm.markers;\n\n      if (markers && markers.length > 0) {\n        markers.forEach(marker => marker.setMap(null));\n      }\n\n      if (items && items.length) {\n        markers = [];\n        items.forEach(item => {\n          var marker = new google.maps.Marker({\n            draggable: false,\n            //animation: google.maps.Animation.BOUNCE,\n            position: {\n              lat: item.geoX,\n              lng: item.geoY\n            },\n            map: vm.map,\n            item: item,\n            title: `${item.firstName} ${item.lastName}` //label: {\n            //    text: 'You',\n            //    //fontFamily: 'Fontawesome',\n            //},\n\n          });\n          google.maps.event.addListener(marker, 'click', function (event) {\n            if (vm.markerClickAction) vm.markerClickAction(this.item);\n          });\n          markers.push(marker);\n        });\n        vm.markers = markers;\n      } //if (recenter) {\n\n\n      vm.map.setCenter(vm.centerPosition); //}\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/_map.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "RMZk":
/*!*********************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Accounts/index.vue?vue&type=template&id=68640fa3& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_68640fa3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=68640fa3& */ \"d1Eu\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_68640fa3___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_68640fa3___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Accounts/index.vue?");

/***/ }),

/***/ "RcLL":
/*!******************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Teams/index.vue?vue&type=template&id=2223746f& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2223746f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=2223746f& */ \"OrBC\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2223746f___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2223746f___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/index.vue?");

/***/ }),

/***/ "SQ1T":
/*!***********************************!*\
  !*** ./ClientApp/Pedia/router.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-router */ \"jE9Z\");\n/* harmony import */ var _Pages_index_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pages/index.vue */ \"LrUR\");\n/* harmony import */ var _Pages_Accounts_index_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pages/Accounts/index.vue */ \"Z/Y7\");\n/* harmony import */ var _Pages_Teams_index_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pages/Teams/index.vue */ \"QEHb\");\n/* harmony import */ var _Pages_Teams_add_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pages/Teams/add.vue */ \"Muw6\");\n/* harmony import */ var _Pages_Clinic_index_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pages/Clinic/index.vue */ \"jO6H\");\n\n\n\n\n //import contactsIndex from './Pages/Contacts/index.vue';\n\n\n\n\n //import usersAdd from './Pages/Users/add.vue';\n//import usersView from './Pages/Users/view.vue';\n//import tasksIndex from './Pages/Tasks/index.vue';\n//import tasksAdd from './Pages/Tasks/add.vue';\n//import tasksView from './Pages/Tasks/View/index.vue';\n\nconst NotFound = {\n  template: '<div>Not found</div>'\n};\nconst routes = [{\n  path: '/',\n  name: \"index\",\n  component: _Pages_index_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n}, {\n  path: '/accounts',\n  name: \"accounts\",\n  component: _Pages_Accounts_index_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n}, //{ path: '/contacts', name: \"contacts\", component: contactsIndex },\n{\n  path: '/teams',\n  name: \"teams\",\n  component: _Pages_Teams_index_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n}, {\n  path: '/teams/add',\n  name: \"teamsAdd\",\n  component: _Pages_Teams_add_vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n}, {\n  path: '/teams/view/:id',\n  name: \"teamsView\",\n  component: _Pages_Teams_index_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  props: true\n}, {\n  path: '/clinic',\n  name: \"clinicIndex\",\n  component: _Pages_Clinic_index_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n}, //{ path: '/users/add', name: \"usersAdd\", component: usersAdd },\n//{ path: '/users/view/:id', name: \"usersView\", component: usersView, props: true },\n//{ path: '/tasks', name: \"tasks\", component: tasksIndex },\n{\n  path: '*',\n  component: NotFound\n}];\nconst router = new vue_router__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  base: '/pedia',\n  mode: \"history\",\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/router.js?");

/***/ }),

/***/ "TIv6":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--3-0!./node_modules/css-loader/dist/cjs.js??ref--3-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Clinic/index.vue?vue&type=style&index=0&id=0b022ea5&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/index.vue?./node_modules/mini-css-extract-plugin/dist/loader.js??ref--3-0!./node_modules/css-loader/dist/cjs.js??ref--3-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "TqyB":
/*!*******************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./nav-drawer.vue?vue&type=script&lang=js& */ \"gXe3\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?");

/***/ }),

/***/ "VPva":
/*!*************************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?vue&type=template&id=58e300c0& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_drawer_vue_vue_type_template_id_58e300c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./nav-drawer.vue?vue&type=template&id=58e300c0& */ \"AjLy\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_drawer_vue_vue_type_template_id_58e300c0___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_drawer_vue_vue_type_template_id_58e300c0___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?");

/***/ }),

/***/ "Z/Y7":
/*!**************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Accounts/index.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_vue_vue_type_template_id_68640fa3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=68640fa3& */ \"RMZk\");\n/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ \"qRcI\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _index_vue_vue_type_template_id_68640fa3___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _index_vue_vue_type_template_id_68640fa3___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/Accounts/index.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Accounts/index.vue?");

/***/ }),

/***/ "ZFEk":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Teams/add.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core_Mixins_pageMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Core/Mixins/pageMixin */ \"EQT1\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mixins: [_Core_Mixins_pageMixin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\n  props: {\n    uid: String\n  },\n\n  data() {\n    return {\n      item: {}\n    };\n  },\n\n  computed: {},\n\n  async created() {\n    const vm = this;\n  },\n\n  async mounted() {\n    const vm = this;\n  },\n\n  methods: {\n    async save() {\n      const vm = this;\n\n      try {\n        const item = vm.item;\n        const payload = vm.$util.clone(item);\n        await vm.$util.axios.post(`/api/teams/`, payload).then(resp => {\n          vm.$bvToast.toast('New team created.', {\n            title: 'Add Team',\n            variant: 'success',\n            toaster: 'b-toaster-bottom-right'\n          });\n          vm.close();\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/add.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "c+tT":
/*!**********************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Teams/add.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./add.vue?vue&type=script&lang=js& */ \"ZFEk\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/add.vue?");

/***/ }),

/***/ "cSkI":
/*!************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/index.vue?vue&type=template&id=00763fb0& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_00763fb0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=00763fb0& */ \"kBKv\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_00763fb0___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_00763fb0___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/index.vue?");

/***/ }),

/***/ "cbNT":
/*!******************************************************************************!*\
  !*** ./ClientApp/Pedia/Modals/Teams/add-member.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./add-member.vue?vue&type=script&lang=js& */ \"tbsg\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Modals/Teams/add-member.vue?");

/***/ }),

/***/ "d1Eu":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Accounts/index.vue?vue&type=template&id=68640fa3& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {}, [_c(\"accounts-index\")], 1)\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Accounts/index.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "d1hM":
/*!*************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Clinic/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ \"9sLc\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/index.vue?");

/***/ }),

/***/ "eumD":
/*!*******************************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Clinic/index.vue?vue&type=template&id=0b022ea5&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0b022ea5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=0b022ea5&scoped=true& */ \"LnYT\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0b022ea5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0b022ea5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/index.vue?");

/***/ }),

/***/ "gXe3":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    appName: String\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/nav-drawer.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "jBfW":
/*!******************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/app.vue?vue&type=template&id=36b51a0c& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_36b51a0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=template&id=36b51a0c& */ \"GwlZ\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_36b51a0c___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_36b51a0c___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app.vue?");

/***/ }),

/***/ "jO6H":
/*!************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Clinic/index.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_vue_vue_type_template_id_0b022ea5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=0b022ea5&scoped=true& */ \"eumD\");\n/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ \"d1hM\");\n/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_0b022ea5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=0b022ea5&scoped=true&lang=css& */ \"+Kdj\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _index_vue_vue_type_template_id_0b022ea5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _index_vue_vue_type_template_id_0b022ea5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"0b022ea5\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/Clinic/index.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/index.vue?");

/***/ }),

/***/ "jcsL":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/Teams/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core_Mixins_paginatedMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Core/Mixins/paginatedMixin */ \"8KAK\");\n/* harmony import */ var _Modals_Teams_add_member_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Modals/Teams/add-member.vue */ \"lz4m\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mixins: [_Core_Mixins_paginatedMixin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\n  props: {\n    uid: String,\n    urlAdd: String,\n    urlView: String\n  },\n  components: {\n    //modalAddTask\n    modalAddMember: _Modals_Teams_add_member_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n\n  data() {\n    return {\n      baseUrl: `/api/teams`,\n      filter: {\n        cacheKey: `filter-${this.uid}/teams` //query: {\n        //    orderStatus: 0,\n        //    dateStart: moment().startOf('week').format('YYYY-MM-DD'),\n        //    dateEnd: moment().endOf('week').format('YYYY-MM-DD')\n        //}\n\n      }\n    };\n  },\n\n  computed: {},\n\n  async created() {\n    const vm = this;\n    const cache = JSON.parse(localStorage.getItem(vm.filter.cacheKey)) || {};\n    vm.initializeFilter(cache);\n    await vm.search();\n  },\n\n  async mounted() {\n    const vm = this;\n  },\n\n  methods: {\n    addTeamMember(item) {\n      const vm = this; //const payload = {\n      //    contactId: item.contactId,\n      //    firstName: item.firstName,\n      //    middleName: item.middleName,\n      //    lastName: item.lastName,\n      //    statusText: item.statusText,\n      //    rating: item.rating,\n      //};\n\n      vm.$refs.modalAddMember.open(item.teamId, item.name);\n    },\n\n    async removeTeamMember(team, user) {\n      const vm = this;\n\n      try {\n        this.$bvModal.msgBoxConfirm(`Are you sure you want to remove \"${user.name}\" from \"${team.name}\"?`).then(async value => {\n          if (value) {\n            await vm.$util.axios.delete(`/api/teams/${team.teamId}/remove-member/${user.userId}/`).then(resp => {\n              vm.$bvToast.toast('User removed from group.', {\n                title: 'Remove User from Group',\n                variant: 'success',\n                toaster: 'b-toaster-bottom-right'\n              });\n            });\n            vm.search();\n          }\n        }).catch(err => {\n          vm.$util.handleError(err);\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      }\n    },\n\n    async removeTeam(team) {\n      const vm = this;\n\n      try {\n        this.$bvModal.msgBoxConfirm(`Are you sure you want to delete \"${team.name}\"?`).then(async value => {\n          if (value) {\n            await vm.$util.axios.delete(`/api/teams/${team.teamId}`).then(resp => {\n              vm.$bvToast.toast('Team deleted.', {\n                title: 'Delete Team',\n                variant: 'warning',\n                toaster: 'b-toaster-bottom-right'\n              });\n            });\n            vm.search();\n          }\n        }).catch(err => {\n          vm.$util.handleError(err);\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/index.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "jugk":
/*!******************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ \"xfhM\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/index.vue?");

/***/ }),

/***/ "kBKv":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/index.vue?vue&type=template&id=00763fb0& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {}, [\n    _c(\n      \"div\",\n      { staticClass: \"demo-app-main\" },\n      [\n        _c(\"FullCalendar\", {\n          staticClass: \"demo-app-calendar\",\n          attrs: { options: _vm.calendarOptions },\n          scopedSlots: _vm._u([\n            {\n              key: \"eventContent\",\n              fn: function(arg) {\n                return [\n                  _c(\"b\", [_vm._v(_vm._s(arg.timeText))]),\n                  _vm._v(\" \"),\n                  _c(\"i\", [_vm._v(_vm._s(arg.event.title))])\n                ]\n              }\n            }\n          ])\n        })\n      ],\n      1\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/index.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "ka+S":
/*!**********************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/app-bar.vue?vue&type=template&id=cfdf445c& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_template_id_cfdf445c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./app-bar.vue?vue&type=template&id=cfdf445c& */ \"xC5v\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_template_id_cfdf445c___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_template_id_cfdf445c___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app-bar.vue?");

/***/ }),

/***/ "ke3u":
/*!**************************************************************************************************************!*\
  !*** ./ClientApp/Pedia/Modals/Teams/add-member.vue?vue&type=style&index=0&id=16a55a49&scoped=true&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_style_index_0_id_16a55a49_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--3-0!../../../../node_modules/css-loader/dist/cjs.js??ref--3-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./add-member.vue?vue&type=style&index=0&id=16a55a49&scoped=true&lang=css& */ \"+H8z\");\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_style_index_0_id_16a55a49_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_style_index_0_id_16a55a49_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_style_index_0_id_16a55a49_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_3_0_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_add_member_vue_vue_type_style_index_0_id_16a55a49_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Modals/Teams/add-member.vue?");

/***/ }),

/***/ "lz4m":
/*!*****************************************************!*\
  !*** ./ClientApp/Pedia/Modals/Teams/add-member.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add_member_vue_vue_type_template_id_16a55a49_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-member.vue?vue&type=template&id=16a55a49&scoped=true& */ \"CDml\");\n/* harmony import */ var _add_member_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-member.vue?vue&type=script&lang=js& */ \"cbNT\");\n/* empty/unused harmony star reexport *//* harmony import */ var _add_member_vue_vue_type_style_index_0_id_16a55a49_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-member.vue?vue&type=style&index=0&id=16a55a49&scoped=true&lang=css& */ \"ke3u\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _add_member_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _add_member_vue_vue_type_template_id_16a55a49_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _add_member_vue_vue_type_template_id_16a55a49_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"16a55a49\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Modals/Teams/add-member.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Modals/Teams/add-member.vue?");

/***/ }),

/***/ "mVle":
/*!***************************************************!*\
  !*** ./ClientApp/Pedia/Pages/_Shared/app-bar.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_bar_vue_vue_type_template_id_cfdf445c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-bar.vue?vue&type=template&id=cfdf445c& */ \"ka+S\");\n/* harmony import */ var _app_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-bar.vue?vue&type=script&lang=js& */ \"1An+\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _app_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _app_bar_vue_vue_type_template_id_cfdf445c___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _app_bar_vue_vue_type_template_id_cfdf445c___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/_Shared/app-bar.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app-bar.vue?");

/***/ }),

/***/ "nJfR":
/*!************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Clinic/_map.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./_map.vue?vue&type=script&lang=js& */ \"QPBt\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/_map.vue?");

/***/ }),

/***/ "qRcI":
/*!***************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Accounts/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ \"Iwww\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Accounts/index.vue?");

/***/ }),

/***/ "tbsg":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Modals/Teams/add-member.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data() {\n    return {\n      moment: moment,\n      isDirty: false,\n      validations: new Map(),\n      busy: false,\n      teamId: null,\n      memberId: null,\n      members: [],\n      team: {}\n    };\n  },\n\n  methods: {\n    async getTeam(teamId) {\n      const vm = this;\n\n      try {\n        await vm.$util.axios.get(`/api/teams/${teamId}`).then(resp => {\n          vm.team = resp.data;\n        });\n      } catch (e) {}\n    },\n\n    getValidClass(field) {\n      const vm = this;\n      if (!vm.isDirty) return '';\n      if (vm.validations.has(field)) return 'is-invalid';\n      return 'is-valid';\n    },\n\n    reset() {\n      const vm = this;\n      vm.busy = false;\n      vm.teamId = null;\n      vm.memberId = null;\n    },\n\n    async open(id) {\n      const vm = this;\n      vm.teamId = id;\n      vm.teamName = name;\n      await vm.getTeam(id);\n      await vm.get();\n      vm.$refs.modal.show();\n    },\n\n    close() {\n      const vm = this;\n      vm.$refs.modal.hide();\n    },\n\n    async get() {\n      const vm = this;\n      if (vm.busy) return;\n\n      try {\n        await vm.$util.axios.get(`/api/users/lookup/`).then(resp => {\n          const users = resp.data;\n          const members = [];\n          users.forEach(u => {\n            const fnd = vm.team.members.find(tm => tm.userId == u.id);\n\n            if (!fnd) {\n              members.push(u);\n            }\n          });\n          vm.members = members;\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      } finally {\n        vm.busy = false;\n      }\n    },\n\n    async save() {\n      const vm = this;\n      if (vm.busy) return;\n\n      try {\n        const payload = {\n          teamId: vm.teamId,\n          memberId: vm.memberId\n        };\n        await vm.$util.axios.post(`/api/teams/add-member/`, payload).then(resp => {\n          vm.$bvToast.toast('Member added.', {\n            title: 'Add Member',\n            variant: 'success',\n            toaster: 'b-toaster-bottom-right'\n          });\n          vm.$emit('saved');\n          vm.close();\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      } finally {\n        vm.busy = false;\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Modals/Teams/add-member.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "v6s/":
/*!**********************************!*\
  !*** ./ClientApp/Pedia/main.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./ClientApp/Pedia/main.css?");

/***/ }),

/***/ "va/T":
/*!***********************************************!*\
  !*** ./ClientApp/Pedia/Pages/Clinic/_map.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map_vue_vue_type_template_id_6eee1dcc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_map.vue?vue&type=template&id=6eee1dcc& */ \"3MIz\");\n/* harmony import */ var _map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_map.vue?vue&type=script&lang=js& */ \"nJfR\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _map_vue_vue_type_template_id_6eee1dcc___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _map_vue_vue_type_template_id_6eee1dcc___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Pedia/Pages/Clinic/_map.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Clinic/_map.vue?");

/***/ }),

/***/ "wBuX":
/*!************************************************************************!*\
  !*** ./ClientApp/Pedia/Pages/Teams/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ \"jcsL\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/Teams/index.vue?");

/***/ }),

/***/ "xC5v":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/_Shared/app-bar.vue?vue&type=template&id=cfdf445c& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"b-navbar\",\n    {\n      attrs: {\n        toggleable: \"sm\",\n        fixed: \"top\",\n        sticky: true,\n        type: \"dark\",\n        variant: \"dark\"\n      }\n    },\n    [\n      _c(\"div\", { staticClass: \"container-lg\" }, [\n        _c(\"a\", { staticClass: \"navbar-brand\", attrs: { href: \"/\" } }, [\n          _vm._v(_vm._s(_vm.appName))\n        ]),\n        _vm._v(\" \"),\n        _c(\n          \"div\",\n          {\n            staticClass: \"collapse navbar-collapse\",\n            attrs: { id: \"navbarColor01\" }\n          },\n          [\n            _c(\n              \"ul\",\n              { staticClass: \"navbar-nav\" },\n              _vm._l(_vm.menus, function(menu) {\n                return _c(\n                  \"li\",\n                  { staticClass: \"nav-item\" },\n                  [\n                    _c(\n                      \"router-link\",\n                      { staticClass: \"nav-link\", attrs: { to: menu.to } },\n                      [\n                        _c(\"span\", { staticClass: \"mr-1\", class: menu.icon }),\n                        _vm._v(\" \"),\n                        _c(\"span\", {\n                          staticClass: \"d-none d-md-inline\",\n                          domProps: { textContent: _vm._s(menu.label) }\n                        })\n                      ]\n                    )\n                  ],\n                  1\n                )\n              }),\n              0\n            )\n          ]\n        ),\n        _vm._v(\" \"),\n        _c(\"ul\", { staticClass: \"navbar-nav ml-auto flex-row\" }, [\n          _c(\"li\", { staticClass: \"nav-item px-2 px-sm-0\" }, [\n            _c(\n              \"a\",\n              {\n                directives: [\n                  {\n                    name: \"b-toggle\",\n                    rawName: \"v-b-toggle.messagesDrawer\",\n                    modifiers: { messagesDrawer: true }\n                  }\n                ],\n                staticClass: \"nav-link\",\n                attrs: { href: \"#\" },\n                on: {\n                  click: function($event) {\n                    $event.preventDefault()\n                  }\n                }\n              },\n              [\n                _c(\"i\", { staticClass: \"fas fa-envelope fa-fw\" }),\n                _vm._v(\" \"),\n                _c(\n                  \"span\",\n                  {\n                    staticClass:\n                      \"badge badge-danger badge-counter invisible initialHidden\"\n                  },\n                  [\n                    _vm.messages.length > 0\n                      ? _c(\"span\", [_vm._v(_vm._s(_vm.messages.length))])\n                      : _vm._e()\n                  ]\n                )\n              ]\n            )\n          ]),\n          _vm._v(\" \"),\n          _c(\"li\", { staticClass: \"nav-item px-2 px-sm-0\" }, [\n            _c(\n              \"a\",\n              {\n                directives: [\n                  {\n                    name: \"b-toggle\",\n                    rawName: \"v-b-toggle.teamsDrawer\",\n                    modifiers: { teamsDrawer: true }\n                  }\n                ],\n                staticClass: \"nav-link\",\n                attrs: { href: \"#\" },\n                on: {\n                  click: function($event) {\n                    $event.preventDefault()\n                  }\n                }\n              },\n              [_c(\"i\", { staticClass: \"fas fa-users fa-fw\" })]\n            )\n          ]),\n          _vm._v(\" \"),\n          _c(\"li\", { staticClass: \"nav-item px-2 px-sm-0 dropdown\" }, [\n            _c(\n              \"a\",\n              {\n                staticClass: \"nav-link  dropdown-toggle\",\n                attrs: {\n                  href: \"#\",\n                  id: \"userDropdown\",\n                  role: \"button\",\n                  \"data-toggle\": \"dropdown\",\n                  \"aria-haspopup\": \"true\",\n                  \"aria-expanded\": \"false\"\n                }\n              },\n              [\n                _c(\"b-avatar\", {\n                  attrs: {\n                    variant: \"info\",\n                    size: \"sm\",\n                    src: _vm.urlProfilePicture\n                  }\n                })\n              ],\n              1\n            ),\n            _vm._v(\" \"),\n            _c(\n              \"div\",\n              {\n                staticClass: \"dropdown-menu dropdown-menu-right\",\n                staticStyle: { position: \"absolute\" },\n                attrs: { \"aria-labelledby\": \"userDropdown\" }\n              },\n              [\n                _c(\n                  \"router-link\",\n                  { staticClass: \"dropdown-item\", attrs: { to: \"/accounts\" } },\n                  [\n                    _c(\"i\", { staticClass: \"fas fa-user fa-sm fa-fw mr-2\" }),\n                    _vm._v(\n                      \"\\n                        Account\\n                    \"\n                    )\n                  ]\n                ),\n                _vm._v(\" \"),\n                _c(\"div\", { staticClass: \"dropdown-divider\" }),\n                _vm._v(\" \"),\n                _c(\n                  \"router-link\",\n                  { staticClass: \"dropdown-item\", attrs: { to: \"/clinic\" } },\n                  [\n                    _c(\"i\", { staticClass: \"fas fa-home fa-sm fa-fw mr-2\" }),\n                    _vm._v(\n                      \"\\n                        Clinic Info\\n                    \"\n                    )\n                  ]\n                ),\n                _vm._v(\" \"),\n                _c(\"div\", { staticClass: \"dropdown-divider\" }),\n                _vm._v(\" \"),\n                _c(\n                  \"a\",\n                  {\n                    staticClass: \"dropdown-item\",\n                    attrs: {\n                      href: \"#\",\n                      \"data-toggle\": \"modal\",\n                      \"data-target\": \"#logoutModal\"\n                    }\n                  },\n                  [\n                    _c(\"i\", {\n                      staticClass: \"fas fa-sign-out-alt fa-sm fa-fw mr-2 \"\n                    }),\n                    _vm._v(\n                      \"\\n                        Logout\\n                    \"\n                    )\n                  ]\n                )\n              ],\n              1\n            )\n          ])\n        ])\n      ]),\n      _vm._v(\" \"),\n      _c(\"notifications-drawer\", {\n        attrs: { notifications: _vm.notifications }\n      }),\n      _vm._v(\" \"),\n      _c(\"messages-drawer\", { attrs: { messages: _vm.messages } })\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/_Shared/app-bar.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "xfhM":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/Pedia/Pages/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fullcalendar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/vue */ \"9f/t\");\n/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/daygrid */ \"PN1e\");\n/* harmony import */ var _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fullcalendar/timegrid */ \"PjKf\");\n/* harmony import */ var _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fullcalendar/interaction */ \"ogxq\");\n/* harmony import */ var _Core_Mixins_pageMixin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_Core/Mixins/pageMixin */ \"EQT1\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mixins: [_Core_Mixins_pageMixin__WEBPACK_IMPORTED_MODULE_4__[\"default\"]],\n  props: {\n    uid: String\n  },\n  components: {\n    FullCalendar: _fullcalendar_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n\n  data() {\n    return {\n      calendarOptions: {\n        plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_3__[\"default\"] // needed for dateClick\n        ],\n        headerToolbar: {\n          left: 'prev,next today',\n          center: 'title',\n          right: 'dayGridMonth,timeGridWeek,timeGridDay'\n        },\n        initialView: 'dayGridMonth',\n        initialEvents: [{\n          id: 1,\n          title: 'All-day event',\n          start: new Date()\n        }, {\n          id: 2,\n          title: 'Timed event',\n          start: moment().add(1, 'hours')\n        }],\n        // alternatively, use the `events` setting to fetch from a feed\n        editable: true,\n        selectable: true,\n        selectMirror: true,\n        dayMaxEvents: true,\n        weekends: true,\n        select: this.handleDateSelect,\n        eventClick: this.handleEventClick,\n        eventsSet: this.handleEvents\n        /* you can update a remote database when these fire:\n        eventAdd:\n        eventChange:\n        eventRemove:\n        */\n\n      },\n      currentEvents: []\n    };\n  },\n\n  computed: {},\n\n  async created() {\n    const vm = this;\n  },\n\n  async mounted() {\n    const vm = this; //await vm.get();\n  },\n\n  methods: {\n    handleWeekendsToggle() {\n      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property\n    },\n\n    handleDateSelect(selectInfo) {\n      let title = prompt('Please enter a new title for your event');\n      let calendarApi = selectInfo.view.calendar;\n      calendarApi.unselect(); // clear date selection\n\n      if (title) {\n        calendarApi.addEvent({\n          id: createEventId(),\n          title,\n          start: selectInfo.startStr,\n          end: selectInfo.endStr,\n          allDay: selectInfo.allDay\n        });\n      }\n    },\n\n    handleEventClick(clickInfo) {\n      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {\n        clickInfo.event.remove();\n      }\n    },\n\n    handleEvents(events) {\n      this.currentEvents = events;\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/Pedia/Pages/index.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ })

/******/ });