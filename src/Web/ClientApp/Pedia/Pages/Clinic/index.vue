<style scoped>
    label {
        font-size: small;
        font-weight: bold;
    }
</style>
<template>
    <div v-cloak>
        <div class="row align-items-center">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-clinic-medical mr-1"></i>Clinic Information
                </h1>
            </div>
            <div class="col-auto">
                <div>
                    <button @click="openModalAddBusinessHour" class="btn btn-primary">
                        <span class="fas fa-fw fa-clock"></span> Add Business Hour
                    </button>

                    <button @click="get" class="btn btn-primary">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
                    <button v-bind:disabled="isDirty && !formIsValid" @click="save" class="btn btn-primary">
                        <span class="fas fa-fw fa-save"></span>
                    </button>
                    <button @click="close" class="btn btn-secondary">
                        <span class="fas fa-fw fa-times-circle"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-2">
            <div class="form-group">
                <label for="name">Name</label>
                <div>
                    <input v-model="item.name" type="text" id="name" class="form-control" v-bind:class="getValidClass('name')" />
                    <div v-if="validations.has('name')" class="invalid-feedback">
                        {{validations.get('name')}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md">
                    <label for="phoneNumber">Phone</label>
                    <div>
                        <input v-model="item.phoneNumber" type="tel" id="phoneNumber" class="form-control" v-bind:class="getValidClass('phoneNumber')" />
                        <div v-if="validations.has('phoneNumber')" class="invalid-feedback">
                            {{validations.get('phoneNumber')}}
                        </div>
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="mobileNumber">Mobile</label>
                    <div>
                        <input v-model="item.mobileNumber" type="tel" id="mobileNumber" class="form-control" v-bind:class="getValidClass('mobileNumber')" />
                        <div v-if="validations.has('mobileNumber')" class="invalid-feedback">
                            {{validations.get('mobileNumber')}}
                        </div>
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="email">Email</label>
                    <div>
                        <input v-model="item.email" type="email" id="email" class="form-control" v-bind:class="getValidClass('email')" />
                        <div v-if="validations.has('email')" class="invalid-feedback">
                            {{validations.get('email')}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md">
                    <div class="d-flex flex-row justify-content-between align-items-baseline">
                        <label>Business Hours</label>
                        <button @click="openModalAddBusinessHour(-1)" class="btn btn-sm btn-outline-primary">
                            <i class="fas fa-fw fa-plus-circle"></i>
                        </button>
                    </div>
                    <div>
                        <div class="table-responsive">
                            <table class="table table-bordered table-sm">
                                <tbody>
                                    <tr v-for="(br,index) in clinicBusinessHours">
                                        <td>
                                            {{index+1}}
                                        </td>
                                        <td>
                                            {{br}}
                                        </td>
                                        <td>
                                            <button @click="openModalAddBusinessHour(index)" class="btn btn-sm btn-outline-info">
                                                <i class="fas fa-fw fa-edit"></i>
                                            </button>
                                            <button @click="deleteBusinessHour(index)" class="btn btn-sm btn-outline-danger">
                                                <i class="fas fa-fw fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="address">Address</label>
                <div>
                    <textarea v-model="item.address" type="text" id="address" class="form-control" v-bind:class="getValidClass('address')"></textarea>
                    <div v-if="validations.has('address')" class="invalid-feedback">
                        {{validations.get('address')}}
                    </div>
                </div>
            </div>
        </div>

        <div style="height:500px;">
            <g-map ref="gmap" map-name="local-map"
                   :fixed="false"
                   :show-location="true"
                   :cx="item.geoX"
                   :cy="item.geoY"
                   :draggable="true"
                   @onMapReady="onMapReady"
                   @onAddress="onAddress">
            </g-map>
        </div>

        <modalAddBusinessHour ref="modalAddBusinessHour"
                              :item="item"
                              :businessHours="clinicBusinessHours"
                              @saved="get">

        </modalAddBusinessHour>
    </div>
</template>
<script>
    import pageMixin from '../../../_Core/Mixins/pageMixin';
    import modalAddBusinessHour from './_add-business-hour.vue';
    import gMap from './_map.vue';

    export default {
        mixins: [pageMixin],
        components: {
            modalAddBusinessHour, gMap
        },
        props: {
            uid: String,
        },

        data() {
            return {
                isDirty: false,
                validations: new Map(),

                item: {
                    geoX: 0,
                    geoY: 0
                }
            };
        },

        computed: {
            formIsValid() {
                const vm = this;

                //if (!vm.isDirty)
                //    return true;

                const item = vm.item;

                const validations = new Map();

                if (!item.name) {
                    validations.set('name', 'Name is required.');
                }

                vm.isDirty = true;
                vm.validations = validations;

                return validations.size == 0;
            },
            clinicBusinessHours() {
                const vm = this;

                return vm.getBusinessHours(vm.item.businessHours);

            }
        },

        async created() {
            const vm = this;

        },

        async mounted() {
            const vm = this;
            //await vm.get();
        },

        methods: {
            async onMapReady() {
                const vm = this;

                await vm.get();

                const gmap = vm.$refs.gmap;

                gmap.initMap(vm.item.geoX, vm.item.geoY);
            },
            onAddress(address, location) {
                const vm = this;
                vm.item.address = address.formatted_address;
                vm.item.geoX = location.lat();
                vm.item.geoY = location.lng();
            },
            getValidClass(field) {
                const vm = this;

                if (!vm.isDirty)
                    return '';

                if (vm.validations.has(field))
                    return 'is-invalid';
                return 'is-valid';
            },
            async get() {
                const vm = this;

                await vm.$util.axios.get(`/api/clinics/my-clinic`)
                    .then(resp => vm.item = resp.data);

                //vm.openModalAddBusinessHour();
            },
            async save() {
                const vm = this;

                if (vm.busy)
                    return;

                if (!vm.formIsValid)
                    return;

                try {
                    vm.busy = true;

                    const item = vm.item;

                    const payload = vm.$util.clone(item);

                    await vm.$util.axios.put(`/api/clinics/`, payload)
                        .then(resp => {
                            vm.$bvToast.toast('Clinic information created.', { title: 'Updated Clinic Information', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            vm.get();
                        })
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false
                }
            },

            openModalAddBusinessHour(index) {
                const vm = this;

                let br = null;

                if (index > -1) {
                    br = vm.item.businessHours[index];
                }
                vm.$refs.modalAddBusinessHour.open(br);
            },

            async deleteBusinessHour(index) {
                const vm = this;
                const br = vm.item.businessHours[index];
                debugger;
                try {
                    await vm.$util.axios.delete(`/api/clinics/business-hour/${br.clinicBusinessHourId}`)

                    await vm.get();
                } catch (e) {
                    vm.$util.handleError(e);
                }
            }
        }
    }
</script>