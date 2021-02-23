<template>
    <div v-cloak>
        <div class="row align-items-center">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-address-book mr-1"></i>View Child
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
                    <h5 class="mb-0">
                        Child Information
                    </h5>
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-md">
                            <label>Child</label>
                            <div class="form-control-plaintext">
                                <b-avatar :src="item.imageUrl"></b-avatar>
                                {{item.firstName}} {{item.middleName}} {{item.lastName}}
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Gender</label>
                            <div class="form-control-plaintext">
                                {{item.genderText}}
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Date of Birth</label>
                            <div class="form-control-plaintext">
                                {{item.dateOfBirth|moment('calendar')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-2">
                <div class="card-header">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <h5 class="mb-0">Medical Entries</h5>
                        <div>
                            <button @click="openModalAddMedicalEntry" class="btn  btn-primary">
                                <i class="fas fa-fw fa-plus-circle"></i> Add Entry
                            </button>
                        </div>
                    </div>
                    
                </div>
                <div class="card-body">
                    <div>
                        
                    </div>
                    {{item.medicalEntries}}
                </div>
            </div>
        </div>
        {{item}}

        <modal-add-medical-entry ref="modalAddMedicalEntry"></modal-add-medical-entry>
    </div>
</template>
<script>
    import pageMixin from '../../../_Core/Mixins/pageMixin';
    import modalAddMedicalEntry from './_modalAddMedicalEntry.vue';

    export default {
        mixins: [pageMixin],
        components: {
            modalAddMedicalEntry
        },
        props: {
            uid: String,
            id: { required: true }
        },

        data() {
            return {
                item: {}
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
                    await vm.$util.axios.get(`/api/children/${vm.id}`)
                        .then(resp => vm.item = resp.data);
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },
            openModalAddMedicalEntry() {
                const vm = this;

                const urlParams = new URLSearchParams(window.location.search);
                const appointmentId = urlParams.get('appointmentId');
                
                vm.$refs.modalAddMedicalEntry.open(vm.id, appointmentId);
            },
        }
    }
</script>