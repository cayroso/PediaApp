<style scoped>
    label {
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
                <div class="form-group col-md">
                    <label>Date</label>
                    <div class="form-control-plaintext">
                        {{item.dateStart|moment('calendar')}}
                        to
                        {{item.dateEnd|moment('calendar')}}
                    </div>
                </div>
            </div>
            <hr />
            <div class="form-row">
                <div class="form-group col-md">
                    <label>Clinic</label>
                    <div class="form-control-plaintext">
                        {{item.clinic.name}}
                        <div>
                            <router-link :to="{name: 'clinicsView', params:{id:item.clinic.clinicId}, query:{appointmentid: item.appointmentId}}">
                             <i class="fas fa-fw fa-clinic-medical"></i> View Clinic
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{name: 'clinicsAddAppointment', params:{id:item.clinic.clinicId}, query:{appointmentId: item.appointmentId}}">
                               <i class="fas fa-fw fa-calendar-alt"></i> View Appointment
                            </router-link>
                        </div>
                        
                        
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
        </div>
    </b-modal>
</template>
<script>
    import pageMixin from '../../../_Core/Mixins/pageMixin';
    export default {
        mixins: [pageMixin],
        computed: {
            clinicBusinessHours() {
                const vm = this;

                return vm.getBusinessHours(vm.item.clinic.businessHours);
            }
        },
        data() {
            return {
                moment: moment,
                busy: false,

                id: null,
                item: {
                    parent: {},
                    child: {},
                    clinic: {
                        businessHours: []
                    }
                },
            }
        },
        methods: {

            reset() {
                const vm = this;

                vm.id = null;
                vm.item = {
                    parent: {},
                    child: {},
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