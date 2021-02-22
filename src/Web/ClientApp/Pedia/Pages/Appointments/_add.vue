<template>
    <b-modal ref="modal"
             :no-close-on-esc="false"
             :no-close-on-backdrop="true"
             scrollable>
        <template v-slot:modal-header>
            <div class="w-100">
                <div class="d-flex flex-row  align-items-center justify-content-between">
                    <h5 class="m-0">
                        Book Appointment
                    </h5>
                </div>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button v-bind:disabled="isDirty && !formIsValid" @click="save" class="btn btn-primary">
                <span class="fas fa-fw fa-save"></span>
            </button>
            <button @click="$refs.modal.hide" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div>
            <div class="form-row">
                <div class="form-group col-md">
                    <label for="parentId">Parent</label>
                    <div>
                        <b-form-select v-model="item.parentId" :options="lookups.parents" @change="getParentChildren(item.parentId)" value-field="id" text-field="name" id="parentId" v-bind:class="getValidClass('parentId')" />
                        <div v-if="validations.has('parentId')" class="invalid-feedback">
                            {{validations.get('parentId')}}
                        </div>
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="childId">Child</label>
                    <div>
                        <b-form-select v-model="item.childId" :options="lookups.children" value-field="id" text-field="name" id="childId" v-bind:class="getValidClass('childId')" />
                        <div v-if="validations.has('childId')" class="invalid-feedback">
                            {{validations.get('childId')}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-sm">
                    <label for="dateStart">Start</label>
                    <div>
                        <div type="text" class="form-control">
                            {{item.dateStart|moment('calendar')}}
                        </div>
                    </div>
                </div>
                <div class="form-group col-sm">
                    <label for="dateEnd">End</label>
                    <div>
                        <div type="text" class="form-control">
                            {{item.dateEnd|moment('calendar')}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="notes">Notes</label>
                <div>
                    <textarea v-model="item.notes" rows="3" class="form-control"></textarea>
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
                isDirty: false,
                validations: new Map(),
                lookups: {
                    parents: [],
                    children: []
                },
                busy: false,

                item: {
                    parentId: null,
                    childId: null,
                    dateStart: null,
                    dateEnd: null,
                    notes: null,
                },
            }
        },
        computed: {

            formIsValid() {
                const vm = this;

                //if (!vm.isDirty)
                //    return true;

                const item = vm.item;

                const validations = new Map();

                if (!item.parentId) {
                    validations.set('parentId', 'Parent is required.');
                }
                if (!item.childId) {
                    validations.set('childId', 'Child is required.');
                }
                if (!item.dateStart) {
                    validations.set('dateStart', 'Start Date is required.');
                }
                if (!item.dateEnd) {
                    validations.set('dateEnd', 'End Date is required.');
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

                vm.isDirty = false;
                vm.validations.clear();
                vm.item = {
                    parentId: null,
                    childId: null,
                    dateStart: null,
                    dateEnd: null,
                    notes: null,
                };
            },
            async open(item) {
                const vm = this;

                vm.reset();

                vm.item = item;

                await vm.getParents();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },

            async getParents() {
                const vm = this;

                await vm.$util.axios.get(`/api/clinics/parents`)
                    .then(resp => vm.lookups.parents = resp.data);
            },
            async getParentChildren(id) {
                const vm = this;

                await vm.$util.axios.get(`/api/clinics/parents/${vm.item.parentId}/children`)
                    .then(resp => {
                        vm.lookups.children = resp.data;

                        if (vm.lookups.children.length === 1) {
                            vm.item.childId = vm.lookups.children[0].id;
                        }
                    });

                
            },

            async save() {
                const vm = this;

                if (vm.busy)
                    return;

                if (!vm.formIsValid)
                    return;

                try {
                    vm.busy = true;

                    const payload = vm.$util.clone(vm.item);

                    payload.clinicId = vm.id;
                    payload.dateStart = moment(payload.dateStart).utc();
                    payload.dateEnd = moment(payload.dateEnd).utc();

                    await vm.$util.axios.post(`/api/appointments/clinic/request`, payload)
                        .then(async _ => {
                            vm.$bvToast.toast('Appointment requested.', { title: 'Request Appointment', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            vm.$emit('saved');

                            vm.close();
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