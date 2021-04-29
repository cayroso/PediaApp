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
            <div class="w-100">
                <div class="d-flex flex-row  align-items-center justify-content-between">
                    <h5 class="m-0">
                        Add Medical Entry
                    </h5>
                </div>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button v-bind:disabled="isDirty && !formIsValid" @click="save" class="btn btn-primary">
                <span class="fas fa-fw fa-save"></span>
            </button>
            <button @click="close" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div v-if="item">
            <div class="form-group">
                <label for="age">Age</label>
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <input v-model="item.age" id="age" type="number" min="0" class="form-control" v-bind:class="getValidClass('age')" />
                    </div>
                    <div>
                        {{child.dateOfBirth|moment('calendar')}}
                    </div>
                    <div v-if="validations.has('age')" class="invalid-feedback">
                        {{validations.get('age')}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md">
                    <label for="weight">Weight</label>
                    <input v-model="item.weight" id="weight" type="number" min="0" class="form-control" v-bind:class="getValidClass('weight')" />
                    <div v-if="validations.has('weight')" class="invalid-feedback">
                        {{validations.get('weight')}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="height">Height</label>
                    <input v-model="item.height" id="height" type="number" min="0" class="form-control" v-bind:class="getValidClass('height')" />
                    <div v-if="validations.has('height')" class="invalid-feedback">
                        {{validations.get('height')}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md">
                    <label for="headCircumference">Head Circumference</label>
                    <input v-model="item.headCircumference" id="headCircumference" type="number" min="0" class="form-control" v-bind:class="getValidClass('headCircumference')" />
                    <div v-if="validations.has('headCircumference')" class="invalid-feedback">
                        {{validations.get('headCircumference')}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="chestCircumference">Chest Circumference</label>
                    <input v-model="item.chestCircumference" id="chestCircumference" type="number" min="0" class="form-control" v-bind:class="getValidClass('chestCircumference')" />
                    <div v-if="validations.has('chestCircumference')" class="invalid-feedback">
                        {{validations.get('chestCircumference')}}
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="summary">Summary</label>
                <textarea v-model="item.summary" id="summary" rows="4" class="form-control" v-bind:class="getValidClass('summary')" />
                <div v-if="validations.has('summary')" class="invalid-feedback">
                    {{validations.get('summary')}}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm">
                    <label for="dateCreated">Date</label>
                    <input v-model="item.dateCreated" id="dateCreated" type="date" class="form-control" v-bind:class="getValidClass('dateCreated')" />
                    <div v-if="validations.has('dateCreated')" class="invalid-feedback">
                        {{validations.get('dateCreated')}}
                    </div>
                </div>
                <div class="form-group col-sm">
                    <label for="dateReturn">Return</label>
                    <input v-model="item.dateReturn" id="dateReturn" type="date" class="form-control" v-bind:class="getValidClass('dateReturn')" />
                    <div v-if="validations.has('dateReturn')" class="invalid-feedback">
                        {{validations.get('dateReturn')}}
                    </div>
                </div>

                {{validations.length}}
            </div>
        </div>

    </b-modal>
</template>
<script>
    export default {
        data() {
            return {
                busy: false,
                isDirty: false,
                validations: new Map(),
                moment: moment,

                childId: null,
                appointmentId: null,
                item: {},
                child: {
                    age: 0,
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

                if (item.age < 1) {
                    validations.set('age', 'Age is required.');
                }

                if (!item.dateCreated) {
                    validations.set('dateCreated', 'Date is required.');
                }

                if (!item.dateReturn) {
                    validations.set('dateReturn', 'Return date is required.');
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
            reset() {
                const vm = this;

                vm.busy = false;
                vm.isDirty = false;
                vm.validations.clear();
                vm.childId = null;
                vm.appointmentId = null;
                vm.item = {
                    dateCreated: moment().format('YYYY-MM-DD'),
                    dateReturn: moment().add(1, 'months').format('YYYY-MM-DD')

                }
            },
            async open(id, appointmentId) {
                const vm = this;

                vm.reset();

                vm.childId = id;
                vm.appointmentId = appointmentId;

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
                    await vm.$util.axios.get(`/api/children/${vm.childId}`)
                        .then(resp => {
                            vm.child = resp.data;

                            vm.item.age = moment().diff(vm.child.dateOfBirth, 'years');
                            //vm.item.taskItems.forEach(ti => {
                            //    ti.dateCompleted = moment(ti.dateCompleted);
                            //});

                        })
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
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
                    payload.childId = vm.childId;
                    payload.appointmentId = vm.appointmentId;
                    
                    await vm.$util.axios.post(`/api/children/medical-entry`, payload)
                        .then(resp => {
                            vm.$bvToast.toast('Child medical entry created.', { title: 'Add Medical Entry', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            vm.$emit('saved');
                            vm.close();
                        })
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false
                }
            },
        }
    }
</script>