<style scoped>
    label {
        font-size: small;
    }
</style>
<template>
    <div v-cloak>

        <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
            <h1 class="h3 mb-sm-0">
                <i class="fas fa-fw fa-book mr-1"></i>Add Appointment
            </h1>
            <div class="text-right">
                <b-overlay :show="busy">
                    <button @click="getAppointments" class="btn btn-info">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
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
                    <label for="childId">Child</label>
                    <div>
                        <b-form-select v-model="item.childId" :options="lookups.children" value-field="id" text-field="name" id="childId" v-bind:class="getValidClass('childId')" />
                        <div v-if="validations.has('childId')" class="invalid-feedback">
                            {{validations.get('childId')}}
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-sm">
                        <label for="dateStart">Start</label>
                        <div>
                            <input v-model="item.dateStart" type="datetime-local" class="form-control" id="dateStart" v-bind:class="getValidClass('dateStart')" />
                            <div v-if="validations.has('dateStart')" class="invalid-feedback">
                                {{validations.get('dateStart')}}
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm">
                        <label for="dateEnd">End</label>
                        <div>
                            <input v-model="item.dateEnd" type="datetime-local" class="form-control" id="dateEnd" v-bind:class="getValidClass('dateEnd')" />
                            <div v-if="validations.has('dateEnd')" class="invalid-feedback">
                                {{validations.get('dateEnd')}}
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
            </b-overlay>
        </div>

        <div class='card p-2 border-info'>
            <full-calendar class='demo-app-calendar'
                           :options='calendarOptions'>
                <template v-slot:eventContent='arg'>
                    <b>{{ arg.timeText }}</b>
                    <i>{{ arg.event.title }}</i>
                </template>
            </full-calendar>
        </div>
    </div>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'

    import pageMixin from '../../../../_Core/Mixins/pageMixin';

    export default {
        mixins: [pageMixin],
        props: {
            id: {
                type: String,
                required: true
            }
        },
        components: {
            FullCalendar,
        },
        data() {
            return {
                calendarOptions: {
                    plugins: [
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin // needed for dateClick
                    ],
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    initialView: 'dayGridMonth',
                    initialEvents: [
                        //{
                        //    id: 1,
                        //    title: 'All-day event',
                        //    start: new Date()
                        //},
                        //{
                        //    id: 2,
                        //    title: 'Timed event',
                        //    start: moment().add(1, 'hours')
                        //}
                    ], // alternatively, use the `events` setting to fetch from a feed
                    events: [],
                    //editable: true,
                    selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true,
                    weekends: true,
                    //select: this.handleDateSelect,
                    eventClick: this.handleEventClick,
                    //eventsSet: this.handleEvents
                    /* you can update a remote database when these fire:
                    eventAdd:
                    eventChange:
                    eventRemove:
                    */
                },

                isDirty: false,
                validations: new Map(),
                lookups: {
                    children: []
                },
                item: {
                    childId: null,
                    dateStart: moment().format('YYYY-MM-DDTHH:mm'),
                    dateEnd: moment().add(2, 'hours').format('YYYY-MM-DDTHH:mm'),
                    notes: null,
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
        async mounted() {
            const vm = this;

            await vm.getChildren();
            await vm.getAppointments();
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
            async getAppointments() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/appointments/clinic/search/${vm.id}/?c=&p=1&s=100&sf=&so=-1`)
                        .then(resp => {

                            //vm.calendarOptions.events.push({

                            //    id: 1,
                            //    title: 'All-day event',
                            //    start: new Date()
                            //})
                            vm.calendarOptions.events = resp.data.items.map(e => {

                                return {
                                    id: e.appointmentId,
                                    display: 'list-item',
                                    //title: `${e.statusText}: ${e.clinic.name} - ${e.child.name}`,
                                    title: `RESERVED`,
                                    allDay: false,

                                    start: moment(e.dateStart).format('YYYY-MM-DDTHH:mm'),
                                    end: moment(e.dateEnd).format('YYYY-MM-DDTHH:mm'),
                                };
                            });
                        })
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async getChildren() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/children/parent/search/?c=&p=1&s=100&sf=&so=-1`)
                        .then(resp => {

                            vm.lookups.children = resp.data.items.map(e => {
                                return {
                                    id: e.childId,
                                    name: `${e.genderText}: ${e.firstName} ${e.middleName}${e.lastName} - ${moment(e.dateOfBirth).calendar()}`
                                };
                            });

                        });

                } catch (e) {
                    vm.$util.handleError(e);
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

                    const payload = vm.$util.clone(vm.item);

                    payload.clinicId = vm.id;
                    payload.dateStart = moment(payload.dateStart).utc();
                    payload.dateEnd = moment(payload.dateEnd).utc();
                    debugger
                    await vm.$util.axios.post(`/api/appointments/parent/request`, payload)
                        .then(resp => {
                            vm.$bvToast.toast('Appointment requested.', { title: 'Request Appointment', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            //setTimeout(_ => {
                            //    vm.$router.push({ name: 'childrenView', params: { id: resp.data } });
                            //}, 2000);
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