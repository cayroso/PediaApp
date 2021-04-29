<style scoped>
    label {
        font-weight: bold;
        font-size: small;
    }
</style>
<template>
    <b-modal ref="modal"
             :no-close-on-esc="false"
             :no-close-on-backdrop="true"
             scrollable>
        <template v-slot:modal-header>
            <div class="w-100">
                <div class="d-flex flex-row  align-items-center justify-content-between">
                    <h5 class="m-0">
                        View Appointment - {{item.referenceNumber}}

                        <!--{{isClinic}} - {{viewMode}}-->
                    </h5>
                </div>
            </div>
        </template>
        <template v-slot:modal-footer>
            <!--{{item.type}}/{{item.status}}
            {{item.parent.parentId}}={{uid}}-->
            <template v-if="isClinic">
                <button v-if="canDelete" @click="deleteAppointment" class="btn btn-danger">
                    Delete
                </button>

                <button v-if="canCancel" @click="cancelAppointment" class="btn btn-warning">
                    Cancel
                </button>

                <button v-if="canAcceptReject" @click="acceptAppointment" class="btn btn-success">
                    Accept
                </button>
                <button v-if="canAcceptReject" @click="rejectAppointment" class="btn btn-warning">
                    Reject
                </button>

                <button v-if="canSetInProgress" @click="setInProgressAppointment" class="btn btn-success">
                    Set In Progress
                </button>

                <button v-if="canComplete" @click="completeAppointment" class="btn btn-info">
                    Completed
                </button>
            </template>

            <template v-if="viewMode==='parent'">
                <button v-if="canDelete" @click="deleteAppointment" class="btn btn-danger">
                    Delete
                </button>

                <button v-if="canCancel" @click="cancelAppointment" class="btn btn-warning">
                    Cancel
                </button>


                <button v-if="canAcceptReject" @click="acceptAppointment" class="btn btn-success">
                    Accept
                </button>
                <button v-if="canAcceptReject" @click="rejectAppointment" class="btn btn-warning">
                    Reject
                </button>

            </template>

            <router-link :to="{name: 'childrenView', params:{id: item.child.childId}, query:{appointmentId: item.appointmentId}}" class="btn btn-primary ml-auto">
                View
            </router-link>
            <button @click="close" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div v-if="item">

            <div class="form-row">
                <div class="form-group col-md">
                    <label>Type</label>
                    <div class="form-control-plaintext">
                        {{item.typeText}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label>Status</label>
                    <div class="form-control-plaintext">
                        {{item.statusText}}
                        <div class="mt-2 small mr-2">
                            {{item.statusReason}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md">
                    <label>Start</label>
                    <div class="form-control-plaintext">
                        {{item.dateStart|moment('calendar')}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label>End</label>
                    <div class="form-control-plaintext">
                        {{item.dateEnd|moment('calendar')}}
                    </div>
                </div>
            </div>
            <template v-if="viewMode==='parent'">
                <div class="form-row">
                    <div class="form-group col-md">
                        <label>Clinic</label>
                        <div class="form-control-plaintext">
                            {{item.clinic.name}}
                        </div>
                    </div>
                    <div class="form-group col-md">
                        <label>Business Hours</label>
                        <div class="form-control-plaintext">
                            <ul class="list-unstyled">
                                <li v-for="br in clinicBusinessHours">
                                    {{br}}
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </template>
            <template v-if="viewMode==='clinic'">
                <div class="form-group">
                    <label>Parent</label>
                    <div class="form-control-plaintext">
                        <span v-on:mouseover="avatarSize='6rem'" v-on:mouseleave="avatarSize=''">
                            <b-avatar :src="item.parent.imageUrl" :size="avatarSize"></b-avatar>
                        </span>
                        {{item.parent.name}}
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md">
                        <label>Phone</label>
                        <div class="form-control-plaintext">
                            {{item.parent.phoneNumber}}
                        </div>
                    </div>
                    <div class="form-group col-md">
                        <label>Email</label>
                        <div class="form-control-plaintext">
                            {{item.parent.email}}
                        </div>
                    </div>
                </div>
            </template>

            <div class="form-group">
                <label>Child</label>
                <div class="form-control-plaintext">
                    <b-avatar :src="item.child.imageUrl"></b-avatar>
                    {{item.child.firstName}} {{item.child.middleName}} {{item.child.lastName}}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md">
                    <label>Gender</label>
                    <div class="form-control-plaintext">
                        {{item.child.genderText}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label>Date of Birth</label>
                    <div class="form-control-plaintext">
                        {{item.child.dateOfBirth|moment('calendar')}}
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import pageMixin from '../../../_Core/Mixins/pageMixin';

    export default {
        mixins: [pageMixin],
        props: {
            uid: {
                type: String,
                required: true,
            },
            viewMode: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                moment: moment,

                busy: false,
                id: null,
                item: {
                    dateStart: null,
                    dateEnd: null,
                    clinic: {
                        businessHours: []
                    },
                    parent: {},
                    child: {}
                },
                avatarSize: 'md'
            }
        },
        computed: {
            isClinic() {
                const vm = this;
                
                if (vm.viewMode === 'pedia')
                    return true;
                if (vm.viewMode === 'staff')
                    return true;

                return false;
            },
            canDelete() {
                const vm = this;
                const item = vm.item;
                
                //  clinic (clinicrequested, cliniccancelled, parentrejected)
                if (item.type === 1 && vm.isClinic) {
                    return [2, 4, 5,].includes(item.status);
                }

                //  parent (parentrequested, parentcancelled, clinicrejected)
                if (item.type === 2 && vm.viewMode === 'parent') {
                    if (item.parent.parentId === vm.uid)
                        return [1, 3, 6].includes(item.status);
                }

                return false;
            },

            canCancel() {
                const vm = this;
                const item = vm.item;

                //  clinic
                if (item.type === 1 && vm.isClinic) {
                    return [1, 2].includes(item.status);
                }

                //  parent
                if (item.type === 2 && vm.viewMode === 'parent') {
                    if (item.parent.parentId === vm.uid)
                        return [1, 2].includes(item.status);
                }

                return false;
            },

            canAcceptReject() {
                const vm = this;
                const item = vm.item;

                //  parent initilated and viewed by clinic
                if (item.type === 2 && vm.isClinic) {
                    return [1, 2].includes(item.status);
                    //return item.status === 1 || item.status === 2;
                }

                //  clinic initiated and viewed by parent
                if (item.type === 1 && vm.viewMode === 'parent' && item.parent.parentId === vm.uid) {
                    return [1, 2].includes(item.status);
                    //return item.status === 1 || item.status === 2;
                }

                return false;
                //return item.type === 2 && item.status < 7;
            },

            canSetInProgress() {
                const vm = this;
                const item = vm.item;

                if (vm.viewMode === 'pedia')
                    return item.status === 7;

                return false;
            },

            canComplete() {
                const vm = this;
                const item = vm.item;

                if (vm.viewMode === 'pedia')
                    return item.status === 8;

                return false;
            },

            clinicBusinessHours() {
                const vm = this;

                return vm.getBusinessHours(vm.item.clinic.businessHours);

                //const vm = this;
                //const clinic = vm.item.clinic;
                //const businessHours = clinic.businessHours;

                //const output = [];

                //const weekDays = [
                //    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
                //]

                //businessHours.forEach(br => {
                //    var daysOfWeek = br.daysOfWeek.split(',');

                //    const wds = daysOfWeek.map(dw => {
                //        var wd = weekDays[dw];

                //        return wd;

                //    })

                //    var xx = `${wds.join('-')} ${moment(br.startTime, 'HH:mm').format('h:mm A')}-${moment(br.endTime, 'HH:mm').format('h:mm A')}`;
                //    output.push(xx);

                //    //output.push(daysOfWeek);
                //})

                //return output;
            },
        },
        methods: {
            reset() {
                const vm = this;

                vm.item = {
                    clinic: {
                        businessHours: []
                    },
                    parent: {},
                    child: {}
                }
            },
            async open(id) {
                const vm = this;

                vm.reset();

                vm.id = id;

                await vm.get();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },

            async get() {
                const vm = this;

                if (vm.busy)
                    return;

                try {
                    await vm.$util.axios.get(`/api/appointments/${vm.id}`)
                        .then(resp => {
                            vm.item = resp.data;
                        })
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },

            async deleteAppointment() {
                const vm = this;
                const item = vm.item;

                await vm.$util.axios.delete(`/api/appointments/${item.appointmentId}/${item.token}`)
                    .then(_ => {
                        vm.$emit('saved');
                        vm.close();
                    })
            },

            async cancelAppointment() {
                const vm = this;
                const item = vm.item;

                const notes = prompt('Reason for Cancelling');

                if (!notes) {
                    return;
                }

                const payload = {
                    appointmentId: item.appointmentId,
                    token: item.token,
                    notes: notes
                };
                const role = vm.isClinic ? 'clinic' : 'parent';
                
                await vm.$util.axios.put(`/api/appointments/${role}/cancel`, payload)
                    .then(_ => {
                        vm.$emit('saved');
                        vm.close();
                    })
            },

            async acceptAppointment() {
                const vm = this;
                const item = vm.item;

                const payload = {
                    appointmentId: item.appointmentId,
                    token: item.token,
                    //notes: notes
                };
                const role = vm.isClinic ? 'clinic' : 'parent';
                await vm.$util.axios.put(`/api/appointments/${role}/accept`, payload)
                    .then(_ => {
                        vm.$emit('saved');
                        vm.close();
                    })
            },

            async rejectAppointment() {
                const vm = this;
                const item = vm.item;

                const notes = prompt('Reason for Rejecting');

                if (!notes) {
                    return;
                }

                const payload = {
                    appointmentId: item.appointmentId,
                    token: item.token,
                    notes: notes
                };
                const role = vm.isClinic ? 'clinic' : 'parent';

                await vm.$util.axios.put(`/api/appointments/${role}/reject`, payload)
                    .then(_ => {
                        vm.$emit('saved');
                        vm.close();
                    })
            },

            async setInProgressAppointment() {
                const vm = this;
                const item = vm.item;

                const payload = {
                    appointmentId: item.appointmentId,
                    token: item.token,
                };
                const role = vm.isClinic ? 'clinic' : 'parent';
                await vm.$util.axios.put(`/api/appointments/${role}/inprogress`, payload)
                    .then(_ => {
                        vm.$emit('saved');
                        vm.close();
                    })
            },

            async completeAppointment() {
                const vm = this;
                const item = vm.item;

                const payload = {
                    appointmentId: item.appointmentId,
                    token: item.token,
                };
                const role = vm.isClinic ? 'clinic' : 'parent';
                await vm.$util.axios.put(`/api/appointments/${role}/complete`, payload)
                    .then(_ => {
                        vm.$emit('saved');
                        vm.close();
                    })
            },

        }
    }
</script>