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
                        View Appointment
                    </h5>
                </div>
            </div>
        </template>
        <template v-slot:modal-footer>

            <button v-if="canCancel" @click="cancelAppointment" class="btn btn-warning">
                Cancel
            </button>

            <template v-if="viewMode==='clinic'">
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
            <button @click="close" class="btn btn-secondary ml-auto">
                Close
            </button>
        </template>
        <div>
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
                <div class="form-group">
                    <label>Clinic</label>
                    <div class="form-control-plaintext">                        
                        {{item.clinic.name}}
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
    export default {
        props: {
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
                    clinic: {},
                    parent: {},
                    child: {}
                },
                avatarSize: 'md'
            }
        },
        computed: {
            canCancel() {
                const vm = this;
                const item = vm.item;

                //  clinic
                if (item.type === 1) {                                        
                    return item.status === 1 || item.status === 2;
                }

                //  parent
                if (item.type === 2) {
                    if (item.parent.parentId !== vm.uid)
                        return false;
                    return item.status === 1 || item.status === 2;
                }
                
            },

            canAcceptReject() {
                const vm = this;
                const item = vm.item;

                return item.type === 2 && item.status < 7;
            },

            canSetInProgress() {
                const vm = this;
                const item = vm.item;

                return item.status === 7;
            },

            canComplete() {
                const vm = this;
                const item = vm.item;

                return item.status === 8;
            },
        },
        methods: {
            reset() {
                const vm = this;

                vm.item = {
                    clinic: {},
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
                debugger
                await vm.$util.axios.put(`/api/appointments/clinic/cancel`, payload)
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
                debugger
                await vm.$util.axios.put(`/api/appointments/clinic/accept`, payload)
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

                await vm.$util.axios.put(`/api/appointments/clinic/reject`, payload)
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

                await vm.$util.axios.put(`/api/appointments/clinic/inprogress`, payload)
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

                await vm.$util.axios.put(`/api/appointments/clinic/complete`, payload)
                    .then(_ => {
                        vm.$emit('saved');
                        vm.close();
                    })
            },

        }
    }
</script>