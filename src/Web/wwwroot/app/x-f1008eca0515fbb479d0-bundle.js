(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["parent~staff"],{

/***/ "Eaik":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/_Common/Drawers/teams-drawer.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    uid: String\n  },\n\n  data() {\n    return {\n      teams: null\n    };\n  },\n\n  async mounted() {\n    const vm = this;\n    await vm.get();\n  },\n\n  methods: {\n    async get() {\n      const vm = this;\n\n      try {\n        const query = ['?c=', //encodeURIComponent(filter.query.criteria),\n        '&p=', 1, //filter.query.pageIndex,\n        '&s=', 5, //filter.query.pageSize,\n        '&sf=', //filter.query.sortField,\n        '&so=', -1 //filter.query.sortOrder\n        ].join('');\n        await vm.$util.axios.get(`/api/teams/my-teams/${query}`).then(resp => {\n          vm.teams = resp.data;\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/_Common/Drawers/teams-drawer.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "KUgy":
/*!****************************************************!*\
  !*** ./ClientApp/_Common/Drawers/teams-drawer.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _teams_drawer_vue_vue_type_template_id_794e1e3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./teams-drawer.vue?vue&type=template&id=794e1e3e& */ \"hTEU\");\n/* harmony import */ var _teams_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./teams-drawer.vue?vue&type=script&lang=js& */ \"ukvb\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _teams_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _teams_drawer_vue_vue_type_template_id_794e1e3e___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _teams_drawer_vue_vue_type_template_id_794e1e3e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/_Common/Drawers/teams-drawer.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/_Common/Drawers/teams-drawer.vue?");

/***/ }),

/***/ "L0w+":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/_Common/Drawers/teams-drawer.vue?vue&type=template&id=794e1e3e& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"b-sidebar\",\n    {\n      attrs: {\n        id: \"teamsDrawer\",\n        title: \"My Teams\",\n        backdrop: \"\",\n        right: \"\",\n        shadow: \"\"\n      }\n    },\n    [\n      _vm.teams\n        ? _c(\"div\", { staticClass: \"px-2\" }, [\n            _c(\n              \"ul\",\n              { staticClass: \"list-unstyled\" },\n              _vm._l(_vm.teams.items, function(t) {\n                return _c(\"li\", [\n                  _c(\"i\", { staticClass: \"fas fa-fw fa-users mr-1\" }),\n                  _vm._v(\" \"),\n                  _c(\n                    \"a\",\n                    {\n                      attrs: { href: \"#\" },\n                      on: {\n                        click: function($event) {\n                          $event.preventDefault()\n                          return _vm.$bus.$emit(\n                            \"event:send-team-message\",\n                            t.teamId\n                          )\n                        }\n                      }\n                    },\n                    [\n                      _vm._v(\n                        \"\\n                    \" +\n                          _vm._s(t.name) +\n                          \"\\n                \"\n                      )\n                    ]\n                  ),\n                  _vm._v(\" \"),\n                  _c(\n                    \"ul\",\n                    _vm._l(t.members, function(tm) {\n                      return tm.userId !== _vm.uid\n                        ? _c(\n                            \"li\",\n                            [\n                              _c(\"b-avatar\", {\n                                attrs: { src: tm.urlProfilePicture, size: \"sm\" }\n                              }),\n                              _vm._v(\" \"),\n                              _c(\n                                \"a\",\n                                {\n                                  attrs: { href: \"#\" },\n                                  on: {\n                                    click: function($event) {\n                                      $event.preventDefault()\n                                      return _vm.$bus.$emit(\n                                        \"event:send-message\",\n                                        tm.userId\n                                      )\n                                    }\n                                  }\n                                },\n                                [\n                                  _vm._v(\n                                    \"\\n                            \" +\n                                      _vm._s(tm.firstName) +\n                                      \" \" +\n                                      _vm._s(tm.lastName) +\n                                      \"\\n                        \"\n                                  )\n                                ]\n                              )\n                            ],\n                            1\n                          )\n                        : _vm._e()\n                    }),\n                    0\n                  )\n                ])\n              }),\n              0\n            )\n          ])\n        : _vm._e()\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/_Common/Drawers/teams-drawer.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "hTEU":
/*!***********************************************************************************!*\
  !*** ./ClientApp/_Common/Drawers/teams-drawer.vue?vue&type=template&id=794e1e3e& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_teams_drawer_vue_vue_type_template_id_794e1e3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./teams-drawer.vue?vue&type=template&id=794e1e3e& */ \"L0w+\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_teams_drawer_vue_vue_type_template_id_794e1e3e___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_teams_drawer_vue_vue_type_template_id_794e1e3e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/_Common/Drawers/teams-drawer.vue?");

/***/ }),

/***/ "ukvb":
/*!*****************************************************************************!*\
  !*** ./ClientApp/_Common/Drawers/teams-drawer.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_teams_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./teams-drawer.vue?vue&type=script&lang=js& */ \"Eaik\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_teams_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/_Common/Drawers/teams-drawer.vue?");

/***/ })

}]);