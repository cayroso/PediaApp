﻿<style>
    label {
        font-size: small;
        font-weight: bold;
    }
</style>
<template>
    <div v-cloak>
        <div class="row align-items-center">
            <div class="col-sm">
                <h1 class="h3 mb-sm-0">
                    <span class="fas fa-fw fa-map-marked mr-1"></span>View
                </h1>
            </div>
            <div class="col-sm-auto">
                <div class="text-right">
                    <button v-if="item.status!==10 && item.status!==11" @click="cancelTrip()" class="btn btn-danger mr-2">Cancel</button>

                    <button v-if="item.status===7" @click="startTrip()" class="btn btn-primary">Start</button>
                    <button v-if="item.status===9" @click="completeTrip()" class="btn btn-primary">Complete</button>

                    <span v-if="item.status===6">
                        <button @click="acceptRejectFare(true)" class="btn btn-primary">Accept Fare</button>
                        <button @click="acceptRejectFare(false)" class="btn btn-warning">Reject Fare</button>
                    </span>

                    <button v-if="item.status===1 || item.status===5" @click="sendRequest" class="btn btn-primary">Send Request</button>
                    <!--<button @click="sendRequest" class="btn btn-primary">Send Request XXX</button>-->

                    <button @click="get" class="btn btn-primary">
                        <i class="fas fa-fw fa-sync"></i>
                    </button>
                    <button @click="close" class="btn btn-secondary">
                        <i class="fas fa-fw fa-times"></i>
                    </button>
                </div>
            </div>
        </div>



        <div class="card mt-2">
            <div @click="toggle('information')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h5 class="mb-0 align-self-start">
                    <span class="fas fa-fw fa-info-circle mr-1"></span>Information
                </h5>
                <div>
                    <span>
                        <span v-if="toggles.information" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.information">
                <div class="p-2">
                    <div class="form-row">
                        <div class="form-group col-md">
                            <label>Status</label>
                            <div class="form-control-plaintext">
                                {{item.statusText}}
                            </div>
                            <div class="small">
                                {{item.cancelReason}}
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Pickup</label>
                            <div class="form-control-plaintext">
                                {{item.startAddress}}
                                <div class="small">
                                    {{item.startAddressDescription}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Destination</label>
                            <div class="form-control-plaintext">
                                {{item.endAddress}}
                                <div class="small">
                                    {{item.endAddressDescription}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-collapse>
        </div>

        <div class="card mt-2">
            <div @click="toggle('driver')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h5 class="mb-0 align-self-start">
                    <span class="fas fa-fw fa-motorcycle mr-1"></span>Driver
                </h5>
                <div>
                    <span>
                        <span v-if="toggles.driver" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.driver">
                <div class="p-2">
                    <div v-if="item.driver">
                        <div class="text-right">
                            <button @click.prevent="$bus.$emit('event:send-message', item.driver.driverId)" class="btn btn-primary">
                                <i class="fas fa-fw fa-envelope"></i>
                            </button>
                            <a :href="`tel:${item.driver.phoneNumber}`" class="btn btn-primary">
                                <i class="fas fa-fw fa-phone"></i>
                            </a>
                            <a :href="`sms:${item.driver.phoneNumber}`" class="btn btn-primary">
                                <i class="fas fa-fw fa-sms"></i>
                            </a>
                        </div>
                        <div class="mt-2 form-row">
                            <div class="form-group col-md">
                                <label>Name</label>
                                <div class="form-control-plaintext">
                                    <b-avatar :src="item.driver.urlProfilePicture" :inline="true"></b-avatar>
                                    <span>
                                        {{item.driver.firstName}} {{item.driver.middleName}} {{item.driver.lastName}}
                                    </span>
                                </div>

                            </div>
                            <div class="form-group col-md">
                                <label>Phone Number</label>
                                <div class="form-control-plaintext">
                                    {{item.driver.phoneNumber}}
                                </div>
                            </div>
                            <div class="form-group col-md">
                                <label>Offer</label>
                                <div class="form-control-plaintext">
                                    {{item.fare|toCurrency}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center">
                        No driver assigned yet
                    </div>
                </div>
            </b-collapse>
        </div>

        <div class="card mt-2">
            <div @click="toggle('map')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h5 class="mb-0 align-self-start">
                    <span class="fas fa-fw fa-map mr-1"></span>Map
                </h5>
                <div>
                    <span>
                        <span v-if="toggles.map" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.map">
                <div v-if="item.startAddress && toggles.map" style="height:500px;">
                    <rider-map map-name="add-trip"
                               :fixed="false"
                               :show-location="true"
                               :cx="item.startX"
                               :cy="item.startY"
                               :startX="item.startX"
                               :startY="item.startY"
                               :endX="item.endX"
                               :endY="item.endY"
                               :draggable="false">
                    </rider-map>
                </div>
            </b-collapse>
        </div>

        <div class="card mt-2">
            <div @click="toggle('timeline')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h5 class="mb-0 align-self-start">
                    <span class="fas fa-fw fa-history mr-1"></span>Timeline
                </h5>
                <div>
                    <span>
                        <span v-if="toggles.timeline" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.timeline">
                <div class="table-responsive mb-0">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Notes</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tl,index) in item.timelines">
                                <td>{{index+1}}</td>
                                <td>
                                    <div>
                                        {{tl.statusText}}
                                    </div>
                                    <div class="small ml-3">
                                        {{tl.dateTimeline|moment('calendar')}}
                                    </div>
                                </td>
                                <td>{{tl.notes}}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </b-collapse>
        </div>


    </div>
</template>
<script>
    import pageMixin from '../../../../_Core/Mixins/pageMixin';
    import RiderMap from './_rider-map.vue';
    export default {
        mixins: [pageMixin],
        components: {
            RiderMap
        },
        props: {
            uid: String,
            id: String,
        },

        data() {
            return {
                togglesKey: `view-trip/${this.uid}/toggles`,
                toggles: {
                    information: false,
                    driver: false,
                    map: false,
                    timeline: false,
                    locations: false,
                },

                item: {}
            };
        },

        computed: {

        },

        async created() {
            const vm = this;

            const toggles = JSON.parse(localStorage.getItem(vm.togglesKey)) || null;

            if (toggles)
                vm.toggles = toggles;
        },

        async mounted() {
            const vm = this;

            await vm.get();

            vm.$bus.$on('event:driver-assigned', vm.refresh);
            vm.$bus.$on('event:driver-accepted', vm.refresh);
            vm.$bus.$on('event:driver-rejected', vm.refresh);
            vm.$bus.$on('event:driver-fare-offered', vm.refresh);
            vm.$bus.$on('event:driver-trip-inprogress', vm.refresh);
            vm.$bus.$on('event:driver-trip-completed', vm.refresh);
        },

        methods: {
            async refresh(resp) {
                const vm = this;

                if (resp.tripId === vm.id) {
                    await vm.get();
                }
            },
            async get() {
                const vm = this;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    await vm.$util.axios.get(`/api/trips/${vm.id}`)
                        .then(resp => {
                            vm.item = resp.data;
                        })

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },

            async cancelTrip() {
                const vm = this;

                if (vm.busy)
                    return;

                var notes = prompt("Enter reason here...", "Cancel Reason");

                try {
                    vm.busy = true;

                    const item = vm.item;

                    const payload = {
                        tripId: item.tripId,
                        token: item.token,
                        notes: notes,
                    };
                    await vm.$util.axios.put(`/api/trips/rider/cancel`, payload)
                        .then(async resp => {
                            vm.$bvToast.toast('Trip cancelled.', { title: 'Cancel Trip', variant: 'success', toaster: 'b-toaster-bottom-right' });
                        })

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;

                    await vm.get();
                }
            },

            async startTrip() {
                const vm = this;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    const item = vm.item;

                    await vm.$util.axios.put(`/api/trips/${item.tripId}/rider-inprogress/${item.token}`)
                        .then(async resp => {
                            vm.$bvToast.toast('Trip started.', { title: 'Start Trip', variant: 'success', toaster: 'b-toaster-bottom-right' });
                        })

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;

                    await vm.get();
                }
            },

            async completeTrip() {
                const vm = this;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    const item = vm.item;

                    await vm.$util.axios.put(`/api/trips/${item.tripId}/rider-complete/${item.token}`)
                        .then(async resp => {
                            vm.$bvToast.toast('Trip completed.', { title: 'Complete Trip', variant: 'success', toaster: 'b-toaster-bottom-right' });
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;

                    await vm.get();
                }
            },

            async sendRequest() {
                const vm = this;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    const item = vm.item;

                    const payload = {
                        tripId: item.tripId,
                        token: item.token,
                    };
                    await vm.$util.axios.put(`/api/trips/rider/request`, payload)
                        .then(async resp => {
                            vm.$bvToast.toast('Trip sent for request.', { title: 'Request Trip', variant: 'success', toaster: 'b-toaster-bottom-right' });
                        })

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;

                    await vm.get();
                }
            },

            async acceptRejectFare(flag) {
                const vm = this;

                if (vm.busy)
                    return;

                let notes = '';

                if (!flag)
                    notes = prompt("Enter reason here...", "Reject Reason");

                try {
                    vm.busy = true;

                    const item = vm.item;

                    var url = `/api/trips/rider/` + (flag ? 'accept-driver-offer' : 'reject-driver-offer');

                    const payload = {
                        tripId: item.tripId,
                        token: item.token,
                        notes: notes
                    };

                    await vm.$util.axios.put(url, payload)
                        .then(async resp => {
                            let title = flag ? 'Accept Offered Fare' : 'Reject Offered Fare';
                            let msg = flag ? 'Offered fare accepted' : 'Offered fare rejected';

                            vm.$bvToast.toast(msg, { title: title, variant: 'success', toaster: 'b-toaster-bottom-right' });
                        })

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;

                    await vm.get();
                }
            }
        }
    }
</script>