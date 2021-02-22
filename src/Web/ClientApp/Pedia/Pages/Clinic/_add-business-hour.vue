<template>
    <b-modal ref="modal"
             :no-close-on-esc="false"
             :no-close-on-backdrop="true"
             scrollable>
        <template v-slot:modal-header>
            <div class="w-100">
                <div class="d-flex flex-row  align-items-center justify-content-between">
                    <h5 class="m-0">
                        Add Business Hours
                    </h5>
                </div>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button @click="save" class="btn btn-primary">
                Save
            </button>
            <button @click="close" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div>
            <div class="form-group">
                <label>Current Business Hours</label>
                <div>
                    <ul>
                        <li v-for="br in businessHours">
                            {{br}}
                        </li>
                    </ul>
                </div>
            </div>

            <b-form-group label="Days of Week" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group id="checkbox-group-1"
                                       v-model="selected"
                                       :options="options"
                                       :aria-describedby="ariaDescribedby"
                                       name="flavour-1"></b-form-checkbox-group>
            </b-form-group>

            <div class="form-row">
                <div class="form-group col-md">
                    <label>Start Time</label>
                    <input v-model="startTime" type="time" class="form-control" />
                </div>

                <div class="form-group col-md">
                    <label>End Time</label>
                    <input v-model="endTime" type="time" class="form-control" />
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    export default {
        props: {
            item: {
                type: Object,
                required: true
            },
            businessHours: {
                //type: Array,
                required: true
            }
        },
        data() {
            return {
                moment: moment,
                busy: false,
                selected: [], // Must be an array reference!
                options: [
                    { text: 'Sun', value: '0' },
                    { text: 'Mon', value: '1' },
                    { text: 'Tue', value: '2' },
                    { text: 'Wed', value: '3' },
                    { text: 'Thu', value: '4' },
                    { text: 'Fri', value: '5' },
                    { text: 'Sat', value: '6' },
                ],
                startTime: '07:00',
                endTime: '19:00',

                currentBr: null,
            }
        },
        methods: {
            reset() {
                const vm = this;
                vm.selected = [];
                vm.startTime = '07:00';
                vm.endTime = '19:00';
            },
            async open(br) {
                const vm = this;

                vm.reset();

                vm.currentBr = br;

                if (br) {
                    vm.selected = br.daysOfWeek.split(',');
                    vm.startTime = br.startTime;
                    vm.endTime = br.endTime;
                }


                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },

            async save() {
                const vm = this;

                try {
                    const payload = {
                        clinicId: vm.item.clinicId,
                        daysOfWeek: vm.selected.join(','),
                        startTime: vm.startTime,
                        endTime: vm.endTime
                    };

                    if (vm.currentBr) {
                        payload.clinicBusinessHourId = vm.currentBr.clinicBusinessHourId;
                        await vm.$util.axios.put(`/api/clinics/business-hour/`, payload);
                    }
                    else {
                        await vm.$util.axios.post(`/api/clinics/business-hour/`, payload);
                    }
                   
                    vm.$emit('saved');
                    vm.close();

                } catch (e) {
                    vm.$util.handleError(e);
                }
            }


        }
    }
</script>