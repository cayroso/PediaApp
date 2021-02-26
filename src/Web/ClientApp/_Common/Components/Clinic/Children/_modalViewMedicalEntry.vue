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
            <div class="w-100">
                <div class="d-flex flex-row  align-items-center justify-content-between">
                    <h5 class="m-0">
                        View Medical Entry
                    </h5>
                </div>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button @click="close" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div v-if="item">

            <div class="form-row">
                <div class="form-group col-md">
                    <label for="age">Age</label>
                    <div class="form-control-plaintext">
                        {{item.age}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="weight">Weight</label>
                    <div class="form-control-plaintext">
                        {{item.weight}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="height">Height</label>
                    <div class="form-control-plaintext">
                        {{item.height}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md">
                    <label for="headCircumference">Head Circumference</label>                    
                    <div class="form-control-plaintext">
                        {{item.headCircumference}}
                    </div>
                </div>
                <div class="form-group col-md">
                    <label for="chestCircumference">Chest Circumference</label>                    
                    <div class="form-control-plaintext">
                        {{item.chestCircumference}}
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="summary">Summary</label>                
                <div class="form-control-plaintext">
                    {{item.summary}}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm">
                    <label for="dateCreated">Date</label>                    
                    <div class="form-control-plaintext">
                        {{item.dateCreated|moment('calendar')}}
                    </div>
                </div>
                <div class="form-group col-sm">
                    <label for="dateReturn">Return</label>                    
                    <div class="form-control-plaintext">
                        {{item.dateReturn|moment('calendar')}}
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
                busy: false,
                moment: moment,

                id: null,
                item: {},
            }
        },

        methods: {

            reset() {
                const vm = this;

                vm.busy = false;
                vm.id = null;
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
                    await vm.$util.axios.get(`/api/children/medical-entry/${vm.id}`)
                        .then(resp => {
                            vm.item = resp.data;

                            //vm.item.age = moment().diff(vm.item.dateOfBirth, 'years');
                            vm.item.dateCreated = moment(vm.item.dateCreated).format('YYYY-MM-DD');
                            vm.item.dateReturn = moment(vm.item.dateReturn).format('YYYY-MM-DD');
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

        }
    }
</script>