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
                    <i class="fas fa-fw fa-calendar mr-1"></i>View Appointment
                </h1>
            </div>
            <div class="col-auto">
                <div>
                    <button @click="get" class="btn btn-primary">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
                    <button @click="close" class="btn btn-secondary">
                        <span class="fas fa-fw fa-times-circle"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="">
            <div class="card mt-2">
                <div class="card-header">
                    Information
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-sm-6 col-md">
                            <label>Reference Number</label>
                            <div class="form-control-plaintext">
                                {{item.referenceNumber}}
                            </div>
                        </div>
                        <div class="form-group col-sm-6 col-md">
                            <label>Appointment Type</label>
                            <div class="form-control-plaintext">
                                {{item.typeText}}
                            </div>
                        </div>
                        <div class="form-group col-sm-6 col-md">
                            <label>Status</label>
                            <div class="form-control-plaintext">
                                {{item.statusText}}
                                <div class="mt-1 small">
                                    {{item.statusReason}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 col-md">
                            <label>Date</label>
                            <div class="form-control-plaintext">
                                <div>
                                    From: {{item.dateStart|moment('calendar')}}
                                </div>
                                <div>
                                    To: {{item.dateEnd|moment('calendar')}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-2">
                <div class="card-header">
                    Clinic
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-md">
                            <label>Name</label>
                            <div class="form-control-plaintext">
                                {{item.clinic.name}}
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Business Hours</label>
                            <div class="form-control-plaintext">
                                <ul>
                                    <li v-for="br in getBusinessHours(item.clinic.businessHours)">
                                        {{br}}
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div class="form-group col-md">
                            <label>Address</label>
                            <div class="form-control-plaintext">
                                {{item.clinic.address}}
                            </div>
                        </div>
                        <div class="form-group col-md-auto">
                            <label>Contact</label>
                            <div class="form-control-plaintext">
                                <div v-if="item.clinic.phoneNumber">
                                    <i class="fas fa-fw fa-phone mr-1"></i>
                                    {{item.clinic.phoneNumber}}
                                </div>
                                <div v-if="item.clinic.mobileNumber">
                                    <i class="fas fa-fw fa-mobile mr-1"></i>
                                    {{item.clinic.mobileNumber}}
                                </div>
                                <div v-if="item.clinic.email">
                                    <i class="fas fa-fw fa-envelope mr-1"></i>
                                    {{item.clinic.email}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-2">
                <div class="card-header">
                    Child Information
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-md">
                            <label>Child</label>
                            <div class="form-control-plaintext">
                                <b-avatar :src="item.child.imageUrl"></b-avatar>
                                {{item.child.firstName}} {{item.child.middleName}} {{item.child.lastName}}
                            </div>
                        </div>
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
            </div>
        </div>
    </div>
</template>
<script>
    import pageMixin from '../../../_Core/Mixins/pageMixin';

    export default {
        mixins: [pageMixin],

        props: {
            uid: String,
            id: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                item: {
                    clinic: {},
                    child: {}
                }
            };
        },

        computed: {

        },

        async created() {
            const vm = this;

        },

        async mounted() {
            const vm = this;
            await vm.get();
        },

        methods: {
            async get() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/appointments/${vm.id}`)
                        .then(resp => vm.item = resp.data);
                } catch (e) {
                    vm.$util.handleError(e);
                }
            }
        }
    }
</script>