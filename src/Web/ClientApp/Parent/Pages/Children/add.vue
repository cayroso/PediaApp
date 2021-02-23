<style scoped>
    label {
        font-size: small;
    }
</style>
<template>
    <div v-cloak>
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
            <h1 class="h3 mb-sm-0">
                <i class="fas fa-fw fa-book mr-1"></i>Add Child
            </h1>
            <div class="text-right">
                <b-overlay :show="busy">
                    <button v-bind:disabled="isDirty && !formIsValid" @click="save" class="btn btn-primary">
                        <span class="fas fa-fw fa-save"></span>
                    </button>
                    <button @click="close" class="btn btn-secondary">
                        <span class="fas fa-fw fa-times-circle"></span>
                    </button>
                </b-overlay>
            </div>
        </div>
        <div class="mt-2">
            <b-overlay :show="busy">
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <div>
                        <b-form-select v-model="item.gender" :options="lookups.gender" value-field="id" text-field="name" id="name" v-bind:class="getValidClass('name')" />
                        <div v-if="validations.has('gender')" class="invalid-feedback">
                            {{validations.get('gender')}}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <div>
                        <input v-model="item.firstName" type="text" class="form-control" id="firstName" v-bind:class="getValidClass('firstName')" />
                        <div v-if="validations.has('firstName')" class="invalid-feedback">
                            {{validations.get('firstName')}}
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="middleName">Middle Name</label>
                    <div>
                        <input v-model="item.middleName" type="text" class="form-control" id="middleName" v-bind:class="getValidClass('middleName')" />
                        <div v-if="validations.has('middleName')" class="invalid-feedback">
                            {{validations.get('middleName')}}
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <div>
                        <input v-model="item.lastName" type="text" class="form-control" id="lastName" v-bind:class="getValidClass('lastName')" />
                        <div v-if="validations.has('lastName')" class="invalid-feedback">
                            {{validations.get('lastName')}}
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="dateOfBirth">Date of Birth</label>
                    <div>
                        <input v-model="item.dateOfBirth" type="date" class="form-control" id="dateOfBirth" v-bind:class="getValidClass('dateOfBirth')" />
                        <div v-if="validations.has('dateOfBirth')" class="invalid-feedback">
                            {{validations.get('dateOfBirth')}}
                        </div>
                    </div>
                </div>

            </b-overlay>
        </div>
    </div>
</template>
<script>
    import pageMixin from '../../../_Core/Mixins/pageMixin';

    export default {
        mixins: [pageMixin],

        data() {
            return {
                isDirty: false,
                validations: new Map(),
                lookups: {
                    gender: [
                        //{ id: 0, name: 'Unknown' },
                        { id: 1, name: 'Male' },
                        { id: 2, name: 'Female' },
                    ]
                },
                item: {
                    gender: null,
                    firstName: null,
                    middleName: null,
                    lastName: null,
                    dateOfBirth: null// moment().format('YYYY-MM-DD'),
                }
            }
        },
        computed: {
            formIsValid() {
                const vm = this;

                //if (!vm.isDirty)
                //    return true;

                const item = vm.item;

                const validations = new Map();

                if (!item.gender) {
                    validations.set('gender', 'Gender is required.');
                }
                if (!item.firstName) {
                    validations.set('firstName', 'First name is required.');
                }
                if (!item.middleName) {
                    validations.set('middleName', 'Middle name is required.');
                }
                if (!item.lastName) {
                    validations.set('lastName', 'Last name is required.');
                }
                if (!item.dateOfBirth) {
                    validations.set('dateOfBirth', 'Date of Birth is required.');
                }

                vm.isDirty = true;
                vm.validations = validations;

                return validations.size == 0;
            },
        },
        methods: {
            getValidClass(field) {
                const vm = this;

                if (!vm.isDirty)
                    return '';

                if (vm.validations.has(field))
                    return 'is-invalid';
                return 'is-valid';
            },



            async save() {
                const vm = this;

                if (vm.busy)
                    return;

                if (!vm.formIsValid)
                    return;

                try {
                    vm.busy = true;

                    const paylod = vm.$util.clone(vm.item);

                    paylod.dateOfBirth = moment(paylod.dateOfBirth).utc();

                    await vm.$util.axios.post(`/api/children`, paylod)
                        .then(resp => {
                            vm.$bvToast.toast('Child added.', { title: 'Add Child', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            setTimeout(_ => {
                                vm.$router.push({ name: 'childrenView', params: { id: resp.data } });
                            }, 1000);
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },
        }
    }
</script>