<style scoped>
    label{
        font-size: small;
        font-weight: bold;
    }
</style>
<template>
    <b-modal ref="modal"
             :no-close-on-esc="false"
             :no-close-on-backdrop="true"
             scrollable>
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    View Appointment 
                    <span v-if="moment(item.dateStart).isBefore() && item.status<6">
                        Overdue
                    </span>
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button @click="save(false)" class="btn btn-primary">
                Save
            </button>
            <button @click="close" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div>
            <div class="form-group">
                <label>Clinic</label>
                <div class="form-control-plaintext">
                    {{item.clinic.name}}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm">
                    <label>Phone Number</label>
                    <div class="form-control-plaintext">
                        {{item.clinic.phoneNumber}}
                    </div>
                </div>
                <div class="form-group col-sm">
                    <label>Mobile Number</label>
                    <div class="form-control-plaintext">
                        {{item.clinic.mobileNumber}}
                    </div>
                </div>
                <div class="form-group col-sm">
                    <label>Email</label>
                    <div class="form-control-plaintext">
                        {{item.clinic.email}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-4">
                    <label>Opening Hours</label>
                    <div class="form-control-plaintext">
                        {{item.clinic.openingHours}}
                    </div>
                </div>
                <div class="form-group col-sm">
                    <label>Address</label>
                    <div class="form-control-plaintext">
                        {{item.clinic.address}}
                    </div>
                </div>
            </div>
            <hr />
            <div class="form-row">
                <div class="form-group col-sm">
                    <label>Child</label>
                    <div class="form-control-plaintext">
                        {{item.child.firstName}} {{item.child.middleName}} {{item.child.lastName}}
                    </div>
                </div>
                <div class="form-group col-sm-3">
                    <label>Gender</label>
                    <div class="form-control-plaintext">
                        {{item.child.genderText}}
                    </div>
                </div>
                <div class="form-group col-sm-3">
                    <label>Date of Birth</label>
                    <div class="form-control-plaintext">
                        {{item.child.dateOfBirth|moment('calendar')}}
                    </div>
                </div>
            </div>
            <hr />
            <div class="form-row">
                <div class="form-group col-sm-6">
                    <label>Appointment Type</label>
                    <div class="form-control-plaintext">
                        {{item.typeText}}
                    </div>
                </div>
                <div class="form-group col-sm-6">
                    <label>Status</label>
                    <div class="form-control-plaintext">
                        {{item.statusText}}
                    </div>
                </div>
                <div class="form-group col-sm-6">
                    <label>Status</label>
                    <div class="form-control-plaintext">
                        {{item.dateStart|moment('calendar')}}
                    </div>
                </div>
                <div class="form-group col-sm-6">
                    <label>Status</label>
                    <div class="form-control-plaintext">
                        {{item.dateEnd|moment('calendar')}}
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    export default {
        data() {
            return {
                moment: moment,
                busy: false,

                id: null,
                item: {
                    clinic: {}
                },
            }
        },
        methods: {

            reset() {
                const vm = this;

                vm.id = null;
                vm.item = {
                    clinic: {}
                };
                vm.busy = false;
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

                try {
                    await vm.$util.axios.get(`/api/appointments/${vm.id}`)
                        .then(resp => {
                            vm.item = resp.data;
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },
        }
    }
</script>