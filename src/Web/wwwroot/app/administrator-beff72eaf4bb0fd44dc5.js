!function(t){function e(e){for(var a,n,l=e[0],o=e[1],c=e[2],d=0,u=[];d<l.length;d++)n=l[d],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&u.push(i[n][0]),i[n]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(t[a]=o[a]);for(m&&m(e);u.length;)u.shift()();return r.push.apply(r,c||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],a=!0,l=1;l<s.length;l++){var o=s[l];0!==i[o]&&(a=!1)}a&&(r.splice(e--,1),t=n(n.s=s[0]))}return t}var a={},i={24:0},r=[];function n(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=a,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(s,a,function(e){return t[e]}.bind(null,a));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/app/";var l=window.webpackJsonp=window.webpackJsonp||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var m=o;r.push(["SjEb",4,17,8,3,9,20,10,12,22,5,1,13,21,11,15,14,2,19,6,18,16,23,7,0]),s()}({B4wR:function(t,e,s){},KN73:function(t,e,s){"use strict";var a=s("8GYW"),i=s("y2gb"),r=s("8/S3"),n=s("It2h"),l=s("IImL"),o=s("KUgy"),c={mixins:[r.a],props:{uid:String,appName:{type:String,required:!0,default:"LMS"},urlProfilePicture:String,menus:Array},components:{NotificationsDrawer:n.a,MessagesDrawer:l.a,TeamsDrawer:o.a}},m=s("KHd+"),d=Object(m.a)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-navbar",{attrs:{toggleable:"sm",fixed:"top",sticky:!0,type:"dark",variant:"dark"}},[s("div",{staticClass:"container-lg"},[s("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[t._v(t._s(t.appName))]),t._v(" "),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarColor01"}},[s("ul",{staticClass:"navbar-nav"},t._l(t.menus,(function(e){return s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{to:e.to}},[s("span",{staticClass:"mr-1",class:e.icon}),t._v(" "),s("span",{staticClass:"d-none d-md-inline",domProps:{textContent:t._s(e.label)}})])],1)})),0)]),t._v(" "),s("ul",{staticClass:"navbar-nav ml-auto flex-row"},[s("li",{staticClass:"nav-item px-2 px-sm-0"},[s("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.messagesDrawer",modifiers:{messagesDrawer:!0}}],staticClass:"nav-link",attrs:{href:"#"},on:{click:function(t){t.preventDefault()}}},[s("i",{staticClass:"fas fa-envelope fa-fw"}),t._v(" "),s("span",{staticClass:"badge badge-danger badge-counter invisible initialHidden"},[t.messages.length>0?s("span",[t._v(t._s(t.messages.length))]):t._e()])])]),t._v(" "),s("li",{staticClass:"nav-item px-2 px-sm-0"},[s("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.teamsDrawer",modifiers:{teamsDrawer:!0}}],staticClass:"nav-link",attrs:{href:"#"},on:{click:function(t){t.preventDefault()}}},[s("i",{staticClass:"fas fa-users fa-fw"})])]),t._v(" "),s("li",{staticClass:"nav-item px-2 px-sm-0 dropdown"},[s("a",{staticClass:"nav-link  dropdown-toggle",attrs:{href:"#",id:"userDropdown",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[s("b-avatar",{attrs:{variant:"info",size:"sm",src:t.urlProfilePicture}})],1),t._v(" "),s("div",{staticClass:"dropdown-menu dropdown-menu-right",staticStyle:{position:"absolute"},attrs:{"aria-labelledby":"userDropdown"}},[s("router-link",{staticClass:"dropdown-item",attrs:{to:"/accounts"}},[s("i",{staticClass:"fas fa-user fa-sm fa-fw mr-2"}),t._v("\n                        Account\n                    ")]),t._v(" "),s("div",{staticClass:"dropdown-divider"}),t._v(" "),s("a",{staticClass:"dropdown-item",attrs:{href:"/"}},[s("i",{staticClass:"fas fa-home fa-sm fa-fw mr-2"}),t._v("\n                        Home Page\n                    ")]),t._v(" "),s("div",{staticClass:"dropdown-divider"}),t._v(" "),s("a",{staticClass:"dropdown-item",attrs:{href:"#","data-toggle":"modal","data-target":"#logoutModal"}},[s("i",{staticClass:"fas fa-sign-out-alt fa-sm fa-fw mr-2 "}),t._v("\n                        Logout\n                    ")])],1)])])]),t._v(" "),s("notifications-drawer",{attrs:{notifications:t.notifications}}),t._v(" "),s("messages-drawer",{attrs:{messages:t.messages}}),t._v(" "),s("teams-drawer",{attrs:{uid:t.uid}})],1)}),[],!1,null,null,null).exports,u={props:{appName:String}},v=Object(m.a)(u,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-sidebar",{attrs:{id:"navDrawer",title:t.appName,backdrop:"",shadow:""}},[s("div",{staticClass:"list-group list-group-flush"},[s("router-link",{staticClass:"list-group-item list-group-item-action",attrs:{to:"/"}},[s("span",{staticClass:"fas fa-fw fa-home mr-1"}),t._v("Home\n        ")]),t._v(" "),s("router-link",{staticClass:"list-group-item list-group-item-action",attrs:{to:"/contacts"}},[s("span",{staticClass:"fas fa-fw fa-id-card mr-1"}),t._v("Contacts\n        ")]),t._v(" "),s("router-link",{staticClass:"list-group-item list-group-item-action",attrs:{to:"/tasks"}},[s("span",{staticClass:"fas fa-fw fa-tasks mr-1"}),t._v("Tasks\n        ")]),t._v(" "),s("router-link",{staticClass:"list-group-item list-group-item-action",attrs:{to:"/documents"}},[s("span",{staticClass:"fas fa-fw fa-archive mr-1"}),t._v("Documents\n        ")])],1)])}),[],!1,null,null,null).exports,f={mixins:[s("EQT1").a],props:{uid:String,menus:Array},data:()=>({}),computed:{},async created(){},async mounted(){},methods:{}},p=Object(m.a)(f,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-navbar",{staticClass:"d-block d-sm-none",attrs:{fixed:"bottom",type:"dark",variant:"dark"}},[s("b-navbar-nav",{attrs:{align:"center",justified:!0}},t._l(t.menus,(function(e){return s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{to:e.to}},[s("span",{staticClass:"mr-1",class:e.icon}),t._v(" "),s("span",{staticClass:"d-none d-md-inline",domProps:{textContent:t._s(e.label)}})])],1)})),0)],1)}),[],!1,null,null,null).exports,b={mixins:[a.a],components:{modalViewChat:i.a,AppBar:d,NavDrawer:v,BottomNav:p},props:{uid:String,appName:String,urlProfilePicture:String},data:()=>({menus:[{to:"/",label:"Home",icon:"fas fa-fw fa-home"},{to:"/teams",label:"Teams",icon:"fas fa-fw fa-users"},{to:"/users",label:"Users",icon:"fas fa-fw fa-user"}]}),async mounted(){},async created(){},methods:{}},_=Object(m.a)(b,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("app-bar",{attrs:{uid:t.uid,appName:t.appName,urlProfilePicture:t.urlProfilePicture,menus:t.menus}}),t._v(" "),s("main",{staticClass:"container-lg main mb-5 mb-md-0 pb-5 pb-sm-0"},[s("router-view",{attrs:{uid:t.uid}})],1),t._v(" "),s("bottom-nav",{attrs:{menus:t.menus}}),t._v(" "),s("modal-view-chat",{ref:"modalViewChat",attrs:{uid:t.uid}})],1)}),[],!1,null,null,null);e.a=_.exports},LzTX:function(t,e,s){},SjEb:function(t,e,s){"use strict";s.r(e),function(t){s("zCnV"),s("juk6");var e=s("oCYn"),a=s("KN73"),i=s("hf7O"),r=s("bM+u"),n=s("jE9Z"),l=s("aooX");e.default.use(i.a),e.default.use(r.a),e.default.use(n.a),new e.default({el:"#app",router:l.a,components:{App:a.a},created(){t(document).ready((function(){t(".main").addClass("main-loaded")}))}})}.call(this,s("EVdn"))},aooX:function(t,e,s){"use strict";var a=s("jE9Z"),i=s("EQT1"),r={mixins:[i.a],props:{uid:String},data:()=>({item:{}}),computed:{},async created(){},async mounted(){await this.get()},methods:{async get(){const t=this;try{await t.$util.axios.get("/api/administrators/default/dashboard").then((e=>t.item=e.data))}catch(e){t.$util.handleError(e)}}}},n=s("KHd+"),l=Object(n.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("div",{staticClass:"row row-cols-2 row-cols-sm-3"},[s("div",{staticClass:"col mb-2"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[t._v("Teams")]),t._v(" "),s("div",{staticClass:"d-flex flex-row justify-content-between"},[s("h5",[t._v(t._s(t.item.teams))]),t._v(" "),t._m(0)])])])]),t._v(" "),s("div",{staticClass:"col mb-2"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[t._v("Users")]),t._v(" "),s("div",{staticClass:"d-flex flex-row justify-content-between"},[s("h5",[t._v(t._s(t.item.users))]),t._v(" "),t._m(1)])])])]),t._v(" "),s("div",{staticClass:"col mb-2"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[t._v("Tasks")]),t._v(" "),s("div",{staticClass:"d-flex flex-row justify-content-between"},[s("h5",[t._v(t._s(t.item.tasks))]),t._v(" "),t._m(2)])])])]),t._v(" "),s("div",{staticClass:"col mb-2"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[t._v("Contacts")]),t._v(" "),s("div",{staticClass:"d-flex flex-row justify-content-between"},[s("h5",[t._v(t._s(t.item.contacts))]),t._v(" "),t._m(3)])])])]),t._v(" "),s("div",{staticClass:"col mb-2"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[t._v("Attachments")]),t._v(" "),s("div",{staticClass:"d-flex flex-row justify-content-between"},[s("h5",[t._v(t._s(t.item.attachments))]),t._v(" "),t._m(4)])])])]),t._v(" "),s("div",{staticClass:"col mb-2"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h5",{staticClass:"card-title"},[t._v("Documents")]),t._v(" "),s("div",{staticClass:"d-flex flex-row justify-content-between"},[s("h5",[t._v(t._s(t.item.documents))]),t._v(" "),t._m(5)])])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"fas fa-fw fa-lg fa-users"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"fas fa-fw fa-lg fa-user"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"fas fa-fw fa-lg fa-tasks"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"fas fa-fw fa-lg fa-id-card"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"fas fa-fw fa-lg fa-paperclip"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"fas fa-fw fa-lg fa-archive"})])}],!1,null,null,null).exports,o=s("qUQk"),c={props:{uid:String},components:{accountsIndex:o.a},data:()=>({}),computed:{},async created(){},async mounted(){},methods:{}},m=Object(n.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{},[e("accounts-index")],1)}),[],!1,null,null,null).exports,d=s("8KAK"),u={data:()=>({moment:moment,isDirty:!1,validations:new Map,busy:!1,teamId:null,memberId:null,members:[],team:{}}),methods:{async getTeam(t){const e=this;try{await e.$util.axios.get(`/api/teams/${t}`).then((t=>{e.team=t.data}))}catch(t){}},getValidClass(t){return this.isDirty?this.validations.has(t)?"is-invalid":"is-valid":""},reset(){const t=this;t.busy=!1,t.teamId=null,t.memberId=null},async open(t){const e=this;e.teamId=t,e.teamName=name,await e.getTeam(t),await e.get(),e.$refs.modal.show()},close(){this.$refs.modal.hide()},async get(){const t=this;if(!t.busy)try{await t.$util.axios.get("/api/users/lookup/").then((e=>{const s=e.data,a=[];s.forEach((e=>{t.team.members.find((t=>t.userId==e.id))||a.push(e)})),t.members=a}))}catch(e){t.$util.handleError(e)}finally{t.busy=!1}},async save(){const t=this;if(!t.busy)try{const e={teamId:t.teamId,memberId:t.memberId};await t.$util.axios.post("/api/teams/add-member/",e).then((e=>{t.$bvToast.toast("Member added.",{title:"Add Member",variant:"success",toaster:"b-toaster-bottom-right"}),t.$emit("saved"),t.close()}))}catch(e){t.$util.handleError(e)}finally{t.busy=!1}}}},v=(s("f1Cy"),Object(n.a)(u,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{ref:"modal",attrs:{"no-close-on-esc":!1,"no-close-on-backdrop":!0,scrollable:""},scopedSlots:t._u([{key:"modal-header",fn:function(){return[s("div",{staticClass:"w-100"},[s("div",{staticClass:"d-flex flex-row  align-items-center justify-content-between"},[s("h5",{staticClass:"m-0"},[t._v("\n                    Add Team Member\n                ")])])])]},proxy:!0},{key:"modal-footer",fn:function(){return[s("button",{staticClass:"btn btn-primary",on:{click:t.save}},[t._v("\n            Save\n        ")]),t._v(" "),s("button",{staticClass:"btn btn-secondary",on:{click:t.close}},[t._v("\n            Close\n        ")])]},proxy:!0}])},[t._v(" "),t._v(" "),s("div",[s("div",{staticClass:"form-group col-md-3"},[s("label",[t._v("Status")]),t._v(" "),s("div",[t._v(t._s(t.team.name))])]),t._v(" "),s("div",{staticClass:"form-group col-md"},[s("label",{attrs:{for:"memberId"}},[t._v("Member")]),t._v(" "),s("div",[s("b-form-select",{class:t.getValidClass("memberId"),attrs:{options:t.members,"text-field":"name","value-field":"id"},model:{value:t.memberId,callback:function(e){t.memberId=e},expression:"memberId"}}),t._v(" "),t.validations.get("memberId")?s("span",{staticClass:"text-danger"},[t._v("\n                    "+t._s(t.validations.get("memberId"))+"\n                ")]):t._e()],1)])])])}),[],!1,null,"02b3a260",null).exports),f={mixins:[d.a],props:{uid:String,urlAdd:String,urlView:String},components:{modalAddMember:v},data(){return{baseUrl:"/api/teams",filter:{cacheKey:`filter-${this.uid}/teams`}}},computed:{},async created(){const t=this,e=JSON.parse(localStorage.getItem(t.filter.cacheKey))||{};t.initializeFilter(e),await t.search()},async mounted(){},methods:{addTeamMember(t){this.$refs.modalAddMember.open(t.teamId,t.name)},async removeTeamMember(t,e){const s=this;try{this.$bvModal.msgBoxConfirm(`Are you sure you want to remove "${e.name}" from "${t.name}"?`).then((async a=>{a&&(await s.$util.axios.delete(`/api/teams/${t.teamId}/remove-member/${e.userId}/`).then((t=>{s.$bvToast.toast("User removed from group.",{title:"Remove User from Group",variant:"success",toaster:"b-toaster-bottom-right"})})),s.search())})).catch((t=>{s.$util.handleError(t)}))}catch(t){s.$util.handleError(t)}},async removeTeam(t){const e=this;try{this.$bvModal.msgBoxConfirm(`Are you sure you want to delete "${t.name}"?`).then((async s=>{s&&(await e.$util.axios.delete(`/api/teams/${t.teamId}`).then((t=>{e.$bvToast.toast("Team deleted.",{title:"Delete Team",variant:"warning",toaster:"b-toaster-bottom-right"})})),e.search())})).catch((t=>{e.$util.handleError(t)}))}catch(t){e.$util.handleError(t)}}}},p=Object(n.a)(f,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("div",{staticClass:"row align-items-center"},[t._m(0),t._v(" "),s("div",{staticClass:"col-sm-auto"},[s("div",{staticClass:"d-flex flex-row"},[s("div",{staticClass:"mr-1"},[s("router-link",{staticClass:"btn btn-primary",attrs:{to:"/teams/add"}},[s("i",{staticClass:"fas fa-plus"})])],1),t._v(" "),s("div",{staticClass:"flex-grow-1"},[s("div",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.query.criteria,expression:"filter.query.criteria"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter criteria...","aria-label":"Enter criteria...","aria-describedby":"button-addon2"},domProps:{value:t.filter.query.criteria},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(1)},input:function(e){e.target.composing||t.$set(t.filter.query,"criteria",e.target.value)}}}),t._v(" "),s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-primary",attrs:{type:"button",id:"button-addon2"},on:{click:function(e){return t.search(1)}}},[s("span",{staticClass:"fa fas fa-fw fa-search"})])])])])])])]),t._v(" "),s("b-collapse",{model:{value:t.filter.visible,callback:function(e){t.$set(t.filter,"visible",e)},expression:"filter.visible"}}),t._v(" "),s("b-overlay",{attrs:{show:t.busy}},[s("div",{staticClass:"mt-2 table-responsive shadow-sm"},[s("table-list",{attrs:{header:{key:"teamId",columns:[]},items:t.filter.items,getRowNumber:t.getRowNumber,setSelected:t.setSelected,isSelected:t.isSelected,"table-css":""},scopedSlots:t._u([{key:"header",fn:function(){return[s("th",{staticClass:"text-center"},[t._v("#")]),t._v(" "),s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Members")]),t._v(" "),s("th",[t._v("Action(s)")])]},proxy:!0},{key:"table",fn:function(e){return[s("td",{staticClass:"text-center",domProps:{textContent:t._s(t.getRowNumber(e.index))}}),t._v(" "),s("td",[s("div",[t._v("\n                            "+t._s(e.item.name)+"\n                        ")]),t._v(" "),s("small",[t._v(t._s(e.item.description))])]),t._v(" "),s("td",[s("ol",{staticClass:"list-unstyled"},t._l(e.item.members,(function(a){return s("li",[s("div",{staticClass:"d-flex flex-row justify-content-between"},[s("div",[s("b-avatar",{attrs:{src:a.urlProfilePicture,size:"sm"}}),t._v(" "),a.userId===t.uid?s("span",[t._v("\n                                            "+t._s(a.name)+"\n                                        ")]):s("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.$bus.$emit("event:send-message",a.userId)}}},[t._v("\n                                            "+t._s(a.name)+"\n                                        ")])],1),t._v(" "),s("button",{staticClass:"btn btn-sm btn-outline-danger",on:{click:function(s){return t.removeTeamMember(e.item,a)}}},[s("i",{staticClass:"fas fa-fw fa-trash"})])])])})),0)]),t._v(" "),s("td",[s("button",{staticClass:"btn btn-sm btn-primary",on:{click:function(s){return t.addTeamMember(e.item)}}},[s("i",{staticClass:"fas fa-fw fa-user-plus mr-1"}),t._v("Add Member\n                        ")]),t._v(" "),s("button",{staticClass:"btn btn-sm btn-danger",on:{click:function(s){return t.removeTeam(e.item)}}},[s("i",{staticClass:"fas fa-fw fa-trash mr-1"}),t._v("Remove Team\n                        ")])])]}},{key:"list",fn:function(e){return[s("div",[s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("label",{staticClass:"col-3 col-form-label"},[t._v("Name")]),t._v(" "),s("div",{staticClass:"col align-self-center"},[s("div",[t._v("\n                                    "+t._s(e.item.name)+"\n                                ")]),t._v(" "),s("small",[t._v(t._s(e.item.description))])])]),t._v(" "),s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("label",{staticClass:"col-3 col-form-label"},[t._v("Members")]),t._v(" "),s("div",{staticClass:"col align-self-center"},[s("ul",{staticClass:"list-unstyled"},t._l(e.item.members,(function(a){return s("li",[s("div",{staticClass:"d-flex flex-row justify-content-between"},[s("div",[s("b-avatar",{attrs:{src:a.urlProfilePicture,size:"sm"}}),t._v(" "),a.userId===t.uid?s("span",[t._v("\n                                                    "+t._s(a.name)+"\n                                                ")]):s("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.$bus.$emit("event:send-message",a.userId)}}},[t._v("\n                                                    "+t._s(a.name)+"\n                                                ")])],1),t._v(" "),s("button",{staticClass:"btn btn-sm btn-outline-danger",on:{click:function(s){return t.removeTeamMember(e.item,a)}}},[s("i",{staticClass:"fas fa-fw fa-trash"})])])])})),0)])]),t._v(" "),s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("div",{staticClass:"offset-3 col align-self-center"},[s("div",[s("button",{staticClass:"btn btn-sm btn-outline-primary",on:{click:function(s){return t.addTeamMember(e.item)}}},[s("i",{staticClass:"fas fa-fw fa-user-plus"}),t._v(" "),s("span",{staticClass:"ml-1 d-none d-sm-inline-flex"},[t._v("\n                                            Add Member\n                                        ")])]),t._v(" "),s("button",{staticClass:"btn btn-sm btn-outline-danger",on:{click:function(s){return t.removeTeam(e.item)}}},[s("i",{staticClass:"fas fa-fw fa-trash"}),t._v(" "),s("span",{staticClass:"ml-1 d-none d-sm-inline-flex"},[t._v("\n                                            Remove Team\n                                        ")])])])])])])]}}])})],1)]),t._v(" "),s("m-pagination",{staticClass:"mt-2",attrs:{filter:t.filter,search:t.search,showPerPage:!0}}),t._v(" "),s("modal-add-member",{ref:"modalAddMember",on:{saved:t.search}})],1)}),[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-sm"},[s("h1",{staticClass:"h3 mb-sm-0"},[s("i",{staticClass:"fas fa-fw fa-users mr-1"}),t._v("Teams\n            ")])])}],!1,null,null,null).exports,b={mixins:[i.a],props:{uid:String},data:()=>({item:{}}),computed:{},async created(){},async mounted(){},methods:{async save(){const t=this;try{const e=t.item,s=t.$util.clone(e);await t.$util.axios.post("/api/teams/",s).then((e=>{t.$bvToast.toast("New team created.",{title:"Add Team",variant:"success",toaster:"b-toaster-bottom-right"}),t.close()}))}catch(e){t.$util.handleError(e)}}}},_=Object(n.a)(b,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("div",{staticClass:"d-flex flex-column flex-sm-row justify-content-sm-between"},[t._m(0),t._v(" "),s("div",{staticClass:"text-right"},[s("button",{staticClass:"btn btn-primary",on:{click:t.save}},[s("span",{staticClass:"fas fa-fw fa-save"})]),t._v(" "),s("button",{staticClass:"btn btn-secondary",on:{click:t.close}},[s("span",{staticClass:"fas fa-fw fa-times-circle"})])])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.name,expression:"item.name"}],staticClass:"form-control",attrs:{type:"text",id:"name"},domProps:{value:t.item.name},on:{input:function(e){e.target.composing||t.$set(t.item,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"description"}},[t._v("Description")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.description,expression:"item.description"}],staticClass:"form-control",attrs:{type:"text",id:"description"},domProps:{value:t.item.description},on:{input:function(e){e.target.composing||t.$set(t.item,"description",e.target.value)}}})])])])}),[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",{staticClass:"mb-sm-0"},[s("i",{staticClass:"fas fa-fw fa-user-plus mr-1"}),t._v("Add Team\n        ")])}],!1,null,null,null).exports,h={data:()=>({moment:moment,isDirty:!1,validations:new Map,busy:!1,userId:null,item:{},selectedRoles:[],roles:[{value:"administrator",text:"Administrator"},{value:"manager",text:"Manager"},{value:"member",text:"Member"}]}),methods:{getValidClass(t){return this.isDirty?this.validations.has(t)?"is-invalid":"is-valid":""},reset(){const t=this;t.busy=!1,t.userId=null,t.item={}},async open(t){const e=this;e.userId=t,await e.get(),e.$refs.modal.show()},close(){this.$refs.modal.hide()},async get(){const t=this;if(!t.busy)try{await t.$util.axios.get(`/api/administrators/users/${t.userId}/`).then((e=>{t.item=e.data,t.selectedRoles=t.item.roles.map((t=>t.roleId))}))}catch(e){t.$util.handleError(e)}finally{t.busy=!1}},async save(){const t=this;if(!t.busy)try{const e={userId:t.userId,roleIds:t.selectedRoles};await t.$util.axios.post("/api/administrators/users/manage-roles/",e).then((e=>{t.$bvToast.toast("User roles updated.",{title:"Update User Roles",variant:"success",toaster:"b-toaster-bottom-right"}),t.$emit("saved"),t.close()}))}catch(e){t.$util.handleError(e)}finally{t.busy=!1}}}},C=(s("fOBc"),Object(n.a)(h,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{ref:"modal",attrs:{"no-close-on-esc":!1,"no-close-on-backdrop":!0,scrollable:""},scopedSlots:t._u([{key:"modal-header",fn:function(){return[s("div",{staticClass:"w-100"},[s("div",{staticClass:"d-flex flex-row  align-items-center justify-content-between"},[s("h5",{staticClass:"m-0"},[t._v("\n                    Add Team Member\n                ")])])])]},proxy:!0},{key:"modal-footer",fn:function(){return[s("button",{staticClass:"btn btn-primary",on:{click:t.save}},[t._v("\n            Save\n        ")]),t._v(" "),s("button",{staticClass:"btn btn-secondary",on:{click:t.close}},[t._v("\n            Close\n        ")])]},proxy:!0}])},[t._v(" "),t._v(" "),s("div",[s("div",{staticClass:"form-group"},[s("label",[t._v("User")]),t._v(" "),s("div",[t._v("\n                "+t._s(t.item.firstName)+" "+t._s(t.item.middleName)+" "+t._s(t.item.lastName)+"\n            ")])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"memberId"}},[t._v("Member")]),t._v(" "),s("div",[s("b-form-group",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.ariaDescribedby;return[s("b-form-checkbox-group",{attrs:{id:"checkbox-group-1",options:t.roles,"aria-describedby":a,name:"flavour-1"},model:{value:t.selectedRoles,callback:function(e){t.selectedRoles=e},expression:"selectedRoles"}})]}}])})],1)])])])}),[],!1,null,"2579905f",null).exports),g={mixins:[d.a],props:{uid:String,urlAdd:String,urlView:String},components:{ModalManageUserRole:C},data(){return{baseUrl:"/api/administrators/users",filter:{cacheKey:`filter-${this.uid}/users`}}},computed:{},async created(){const t=this,e=JSON.parse(localStorage.getItem(t.filter.cacheKey))||{};t.initializeFilter(e),await t.search()},async mounted(){},methods:{openManageUserRole(t){this.$refs.modalManageUserRole.open(t.userId)}}},w=Object(n.a)(g,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("div",{staticClass:"row align-items-center"},[t._m(0),t._v(" "),s("div",{staticClass:"col-sm-auto"},[s("div",{staticClass:"d-flex flex-row"},[s("div",{staticClass:"mr-1"},[s("router-link",{staticClass:"btn btn-primary",attrs:{to:"/users/add"}},[s("i",{staticClass:"fas fa-plus"})])],1),t._v(" "),s("div",{staticClass:"flex-grow-1"},[s("div",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.query.criteria,expression:"filter.query.criteria"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter criteria...","aria-label":"Enter criteria...","aria-describedby":"button-addon2"},domProps:{value:t.filter.query.criteria},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(1)},input:function(e){e.target.composing||t.$set(t.filter.query,"criteria",e.target.value)}}}),t._v(" "),s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-primary",attrs:{type:"button",id:"button-addon2"},on:{click:function(e){return t.search(1)}}},[s("span",{staticClass:"fa fas fa-fw fa-search"})])])])])])])]),t._v(" "),s("b-collapse",{model:{value:t.filter.visible,callback:function(e){t.$set(t.filter,"visible",e)},expression:"filter.visible"}}),t._v(" "),s("b-overlay",{attrs:{show:t.busy}},[s("div",{staticClass:"mt-2 table-responsive shadow-sm"},[s("table-list",{attrs:{header:{key:"userId",columns:[]},items:t.filter.items,getRowNumber:t.getRowNumber,setSelected:t.setSelected,isSelected:t.isSelected,"table-css":""},scopedSlots:t._u([{key:"header",fn:function(){return[s("th",{staticClass:"text-center"},[t._v("#")]),t._v(" "),s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Email")]),t._v(" "),s("th",[t._v("Phone")]),t._v(" "),s("th",[t._v("Roles")]),t._v(" "),s("th",[t._v("Teams")]),t._v(" "),s("th")]},proxy:!0},{key:"table",fn:function(e){return[s("td",{staticClass:"text-center",domProps:{textContent:t._s(t.getRowNumber(e.index))}}),t._v(" "),s("td",[s("b-avatar",{attrs:{src:e.item.urlProfilePicture}}),t._v(" "),s("div",[t._v("\n                            "+t._s(e.item.firstName)+" "+t._s(e.item.middleName)+" "+t._s(e.item.lastName)+"\n                        ")])],1),t._v(" "),s("td",[t._v("\n                        "+t._s(e.item.email)+"\n                    ")]),t._v(" "),s("td",[t._v("\n                        "+t._s(e.item.phoneNumber)+"\n                    ")]),t._v(" "),s("td",[s("ul",t._l(e.item.roles,(function(e){return s("li",[t._v("\n                                "+t._s(e)+"\n                            ")])})),0)]),t._v(" "),s("td",[s("ul",t._l(e.item.teams,(function(e){return s("li",[t._v("\n                                "+t._s(e)+"\n                            ")])})),0)]),t._v(" "),s("td",[e.item.userId!==t.uid?s("button",{staticClass:"btn btn-sm btn-outline-primary",on:{click:function(s){return t.$bus.$emit("event:send-message",e.item.userId)}}},[s("i",{staticClass:"fas fa-fw fa-comment"})]):t._e(),t._v(" "),s("button",{staticClass:"btn btn-sm btn-outline-warning",on:{click:function(s){return t.openManageUserRole(e.item)}}},[s("i",{staticClass:"fas fa-fw fa-key"})])])]}},{key:"list",fn:function(e){return[s("div",[s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("label",{staticClass:"col-3 col-form-label"},[t._v("Name")]),t._v(" "),s("div",{staticClass:"col align-self-center"},[s("b-avatar",{attrs:{src:e.item.urlProfilePicture,size:"sm"}}),t._v("\n                                "+t._s(e.item.firstName)+" "+t._s(e.item.middleName)+" "+t._s(e.item.lastName)+"\n                            ")],1)]),t._v(" "),s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("label",{staticClass:"col-3 col-form-label"},[t._v("Email")]),t._v(" "),s("div",{staticClass:"col align-self-center"},[t._v("\n                                "+t._s(e.item.email)+"\n                            ")])]),t._v(" "),s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("label",{staticClass:"col-3 col-form-label"},[t._v("Phone Number")]),t._v(" "),s("div",{staticClass:"col align-self-center"},[t._v("\n                                "+t._s(e.item.phoneNumber)+"\n                            ")])]),t._v(" "),s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("label",{staticClass:"col-3 col-form-label"},[t._v("Roles")]),t._v(" "),s("div",{staticClass:"col align-self-center"},[s("ul",{staticClass:"list-unstyled"},t._l(e.item.roles,(function(e){return s("li",[t._v("\n                                        "+t._s(e)+"\n                                    ")])})),0)])]),t._v(" "),s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("label",{staticClass:"col-3 col-form-label"},[t._v("Teams")]),t._v(" "),s("div",{staticClass:"col align-self-center"},[s("ul",{staticClass:"list-unstyled"},t._l(e.item.teams,(function(e){return s("li",[t._v("\n                                        "+t._s(e)+"\n                                    ")])})),0)])]),t._v(" "),s("div",{staticClass:"form-group mb-0 row no-gutters"},[s("div",{staticClass:"offset-3 col align-self-center"},[e.item.userId!==t.uid?s("button",{staticClass:"btn btn-sm btn-outline-primary",on:{click:function(s){return t.$bus.$emit("event:send-message",e.item.userId)}}},[s("i",{staticClass:"fas fa-fw fa-comment"})]):t._e(),t._v(" "),s("button",{staticClass:"btn btn-sm btn-outline-warning",on:{click:function(s){return t.openManageUserRole(e.item)}}},[s("i",{staticClass:"fas fa-fw fa-key"})])])])])]}}])})],1)]),t._v(" "),s("m-pagination",{staticClass:"mt-2",attrs:{filter:t.filter,search:t.search,showPerPage:!0}}),t._v(" "),s("modal-manage-user-role",{ref:"modalManageUserRole",on:{saved:t.search}})],1)}),[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-sm"},[s("h1",{staticClass:"h3 mb-sm-0"},[s("i",{staticClass:"fas fa-fw fa-user mr-1"}),t._v("Users\n            ")])])}],!1,null,null,null).exports,y={mixins:[i.a],props:{uid:String},data:()=>({isDirty:!1,validations:new Map,item:{email:null,phoneNumber:null,firstName:null,middleName:null,lastName:null,password:null,confirmPassword:null}}),computed:{formIsValid(){const t=this,e=t.item,s=new Map;e.email||s.set("email","Email is required."),e.phoneNumber||s.set("phoneNumber","Phone Number is required.");!e.firstName&&!e.middleName&&e.lastName;return e.firstName||s.set("firstName","First name is required."),e.lastName||s.set("lastName","Last name is required."),e.password||s.set("password","Password is required."),e.confirmPassword||s.set("confirmPassword","Confirm Password is required."),e.password!==e.confirmPassword&&(s.set("password","Password and Confirm Password must."),s.set("confirmPassword","Password and Confirm Password must.")),t.isDirty=!0,t.validations=s,0==s.size}},async created(){},async mounted(){},methods:{getValidClass(t){return this.isDirty?this.validations.has(t)?"is-invalid":"is-valid":""},async save(){const t=this;if(!t.busy&&t.formIsValid)try{t.busy=!0;const e=t.item,s=t.$util.clone(e);await t.$util.axios.post("/api/administrators/users/",s).then((e=>{t.$bvToast.toast("New user created.",{title:"Add User",variant:"success",toaster:"b-toaster-bottom-right"}),setTimeout((()=>{t.close()}),500)}))}catch(e){t.$util.handleError(e)}finally{t.busy=!1}}}},x=Object(n.a)(y,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("div",{staticClass:"d-flex flex-column flex-sm-row justify-content-sm-between"},[t._m(0),t._v(" "),s("div",{staticClass:"text-right"},[s("button",{staticClass:"btn btn-primary",attrs:{disabled:t.isDirty&&!t.formIsValid},on:{click:t.save}},[s("span",{staticClass:"fas fa-fw fa-save"})]),t._v(" "),s("button",{staticClass:"btn btn-secondary",on:{click:t.close}},[s("span",{staticClass:"fas fa-fw fa-times-circle"})])])]),t._v(" "),s("div",{staticClass:"form-row"},[s("div",{staticClass:"form-group col-md"},[s("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.email,expression:"item.email"}],staticClass:"form-control",class:t.getValidClass("email"),attrs:{type:"text",id:"email"},domProps:{value:t.item.email},on:{input:function(e){e.target.composing||t.$set(t.item,"email",e.target.value)}}}),t._v(" "),t.validations.has("email")?s("div",{staticClass:"invalid-feedback"},[t._v("\n                    "+t._s(t.validations.get("email"))+"\n                ")]):t._e()])]),t._v(" "),s("div",{staticClass:"form-group col-md"},[s("label",{attrs:{for:"phoneNumber"}},[t._v("Phone Number")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.phoneNumber,expression:"item.phoneNumber"}],staticClass:"form-control",class:t.getValidClass("phoneNumber"),attrs:{type:"text",id:"phoneNumber"},domProps:{value:t.item.phoneNumber},on:{input:function(e){e.target.composing||t.$set(t.item,"phoneNumber",e.target.value)}}}),t._v(" "),t.validations.has("phoneNumber")?s("div",{staticClass:"invalid-feedback"},[t._v("\n                    "+t._s(t.validations.get("phoneNumber"))+"\n                ")]):t._e()])])]),t._v(" "),s("div",{staticClass:"form-row"},[s("div",{staticClass:"form-group col-md"},[s("label",{attrs:{for:"firstName"}},[t._v("First Name")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.firstName,expression:"item.firstName"}],staticClass:"form-control",class:t.getValidClass("firstName"),attrs:{type:"text",id:"firstName"},domProps:{value:t.item.firstName},on:{input:function(e){e.target.composing||t.$set(t.item,"firstName",e.target.value)}}}),t._v(" "),t.validations.has("firstName")?s("div",{staticClass:"invalid-feedback"},[t._v("\n                    "+t._s(t.validations.get("firstName"))+"\n                ")]):t._e()])]),t._v(" "),s("div",{staticClass:"form-group col-md"},[s("label",{attrs:{for:"middleName"}},[t._v("Middle Name")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.middleName,expression:"item.middleName"}],staticClass:"form-control",class:t.getValidClass("middleName"),attrs:{type:"text",id:"middleName"},domProps:{value:t.item.middleName},on:{input:function(e){e.target.composing||t.$set(t.item,"middleName",e.target.value)}}}),t._v(" "),t.validations.has("middleName")?s("div",{staticClass:"invalid-feedback"},[t._v("\n                    "+t._s(t.validations.get("middleName"))+"\n                ")]):t._e()])]),t._v(" "),s("div",{staticClass:"form-group col-md"},[s("label",{attrs:{for:"lastName"}},[t._v("Last Name")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.lastName,expression:"item.lastName"}],staticClass:"form-control",class:t.getValidClass("lastName"),attrs:{type:"text",id:"lastName"},domProps:{value:t.item.lastName},on:{input:function(e){e.target.composing||t.$set(t.item,"lastName",e.target.value)}}}),t._v(" "),t.validations.has("lastName")?s("div",{staticClass:"invalid-feedback"},[t._v("\n                    "+t._s(t.validations.get("lastName"))+"\n                ")]):t._e()])])]),t._v(" "),s("div",{staticClass:"form-row"},[s("div",{staticClass:"form-group col-md"},[s("label",{attrs:{for:"password"}},[t._v("Password")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.password,expression:"item.password"}],staticClass:"form-control",class:t.getValidClass("password"),attrs:{type:"password",id:"password"},domProps:{value:t.item.password},on:{input:function(e){e.target.composing||t.$set(t.item,"password",e.target.value)}}}),t._v(" "),t.validations.has("password")?s("div",{staticClass:"invalid-feedback"},[t._v("\n                    "+t._s(t.validations.get("password"))+"\n                ")]):t._e()])]),t._v(" "),s("div",{staticClass:"form-group col-md"},[s("label",{attrs:{for:"confirmPassword"}},[t._v("Confirm Password")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.confirmPassword,expression:"item.confirmPassword"}],staticClass:"form-control",class:t.getValidClass("confirmPassword"),attrs:{type:"password",id:"confirmPassword"},domProps:{value:t.item.confirmPassword},on:{input:function(e){e.target.composing||t.$set(t.item,"confirmPassword",e.target.value)}}}),t._v(" "),t.validations.has("confirmPassword")?s("div",{staticClass:"invalid-feedback"},[t._v("\n                    "+t._s(t.validations.get("confirmPassword"))+"\n                ")]):t._e()])])])])}),[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",{staticClass:"mb-sm-0"},[s("i",{staticClass:"fas fa-fw fa-user-plus mr-1"}),t._v("Add User\n        ")])}],!1,null,null,null).exports,N={mixins:[i.a],props:{uid:String},data:()=>({}),computed:{},async created(){},async mounted(){},methods:{}};const k=[{path:"/",name:"index",component:l},{path:"/accounts",name:"accounts",component:m},{path:"/teams",name:"teams",component:p},{path:"/teams/add",name:"teamsAdd",component:_},{path:"/teams/view/:id",name:"teamsView",component:p,props:!0},{path:"/users",name:"users",component:w},{path:"/users/add",name:"usersAdd",component:x},{path:"/users/view/:id",name:"usersView",component:Object(n.a)(N,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{},[t._v("\n    Users\n")])}),[],!1,null,null,null).exports,props:!0},{path:"*",component:{template:"<div>Not found</div>"}}],$=new a.a({base:"/administrator",mode:"history",routes:k});e.a=$},f1Cy:function(t,e,s){"use strict";s("B4wR")},fOBc:function(t,e,s){"use strict";s("LzTX")},juk6:function(t,e,s){}});