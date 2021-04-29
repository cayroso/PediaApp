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
                    <i class="fas fa-fw fa-clinic-medical mr-1"></i>View Clinic
                </h1>
            </div>
            <div class="col-auto">
                <div class="">
                    <!--<button @click="grantAccess(item.allowed)" class="btn btn-outline-primary">
                        <span v-if="item.allowed">
                            <i class="fas fa-fw fa-times-circle text-success mr-1 d-none"></i>Deny Access
                        </span>
                        <span v-else>
                            <i class="fas fa-fw fa-check-circle text-warning mr-1 d-none"></i>Grant Access
                        </span>
                    </button>-->
                    <!--<router-link :to="{name: 'clinicsAddAppointment', params:{id: id}}" v-bind:disabled="!item.allowed" class="btn btn-primary" tag="button">
                        <i class="fas fa-fw fa-calendar"></i> Book
                    </router-link>-->
                    <button @click="showMap = !showMap" class="btn" v-bind:class="showMap ?'btn-primary':'btn-outline-primary'">
                        <span v-if="showMap">Hide Map</span>
                        <span v-else>Show map</span>
                    </button>

                    <button @click="get" class="btn btn-primary">
                        <span class="fas fa-fw fa-sync"></span>
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
                <div class="form-control-plaintext">
                    {{item.name}}
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md">
                    <label for="name">Phone Number</label>
                    <div class="form-control-plaintext">
                        {{item.phoneNumber}}
                    </div>
                </div>

                <div class="form-group col-md">
                    <label for="name">Mobile Number</label>
                    <div class="form-control-plaintext">
                        {{item.mobileNumber}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="name">Email</label>
                    <div class="form-control-plaintext">
                        {{item.email}}
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="name">Open Hours</label>
                    <div class="form-control-plaintext">
                        <ol class="list-unstyled">
                            <li v-for="br in businessHours">
                                {{br}}
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="name">Address</label>
                    <div class="form-control-plaintext">
                        {{item.address}}
                    </div>
                </div>
            </div>




        </div>

        <div v-if="showMap" style="height:500px;">
            <g-map ref="gmap" map-name="local-map"
                   :fixed="false"
                   :show-location="true"
                   :cx="0"
                   :cy="0"
                   :draggable="false"
                   @onMapReady="onMapReady">
            </g-map>
        </div>
    </div>
</template>
<script>
    import pageMixin from '../../../../_Core/Mixins/pageMixin';
    import gMap from './_map.vue';
    export default {
        mixins: [pageMixin],
        components: {
            gMap
        },
        props: {
            uid: String,
            id: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                showMap: false,
                item: {}
            };
        },

        computed: {
            businessHours() {
                const vm = this;
                const item = vm.item;

                return vm.getBusinessHours(item.businessHours);
            }
        },

        async created() {
            const vm = this;

        },

        async mounted() {
            const vm = this;
            await vm.get();
        },

        methods: {
            async onMapReady() {
                const vm = this;

                //await vm.get();

                const gmap = vm.$refs.gmap;
                const items = [vm.item];
                gmap.initMap(items);
            },
            async get() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/clinics/${vm.id}`)
                        .then(resp => vm.item = resp.data);

                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async grantAccess(allowed) {
                const vm = this;

                try {
                    const payload = {
                        clinicId: vm.id,
                        parentId: vm.uid,
                    };

                    let api = `/api/clinics/grant-access`;

                    if (allowed)
                        api = `/api/clinics/deny-access`;

                    await vm.$util.axios.post(api, payload)

                    await vm.get();
                } catch (e) {
                    vm.$util.handleError(e);
                }
            }
        }
    }
</script>