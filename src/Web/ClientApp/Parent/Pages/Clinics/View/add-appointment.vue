<style scoped>
    label {
        font-size: small;
    }
</style>
<template>
    <div v-cloak>

        <div class="d-flex flex-row justify-content-between">
            <h1 class="h3 mb-sm-0">
                <i class="fas fa-fw fa-calendar mr-1"></i>Book Appointment
            </h1>
            <div class="text-right">
                <b-overlay :show="busy">
                    <button @click="refresh" class="btn btn-info">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
                    <!--<button v-bind:disabled="isDirty && !formIsValid" @click="save" class="btn btn-primary">
                        <span class="fas fa-fw fa-save"></span>
                    </button>-->
                    <button @click="close" class="btn btn-secondary">
                        <span class="fas fa-fw fa-times-circle"></span>
                    </button>
                </b-overlay>
            </div>
        </div>


        <div class='mt-2'>
            <full-calendar ref="fullCalendar"
                           :options='calendarOptions'>
            </full-calendar>
        </div>

        <b-modal ref="modal"
                 :no-close-on-esc="false"
                 :no-close-on-backdrop="true"
                 scrollable>
            <template v-slot:modal-header>
                <div class="w-100">
                    <div class="d-flex flex-row  align-items-center justify-content-between">
                        Book Appointment
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
            <div v-if="selectionDateInfo">
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

        <modal-view ref="modalView" :uid="uid" view-mode="parent" @saved="refresh"></modal-view>
    </div>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'

    import pageMixin from '../../../../_Core/Mixins/pageMixin';
    import modalView from '../../../../_Common/Modals/Appointments/view.vue';
    export default {
        mixins: [pageMixin],
        props: {
            uid: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },

        },
        components: {
            FullCalendar, modalView
        },
        data() {
            return {
                calendarOptions: {
                    contentHeight: 'auto',
                    plugins: [
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin // needed for dateClick
                    ],
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        //right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    nowIndicator: true,
                    allDaySlot: false,
                    initialView: 'timeGridWeek',
                    slotMinTime: '06:00:00',
                    slotMaxTime: '20:00:00',
                    businessHours: true,
                    selectConstraint: 'businessHours',
                    eventConstraint: true,

                    datesSet: this.datesSet,
                    eventOverlap: false,
                    eventSources: [
                        {
                            events: this.getAppointments,
                        }
                    ],
                    editable: true,
                    selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true,
                    weekends: true,
                    select: this.onClickCalendar,
                    //dateClick: this.onClickCalendar,
                    eventClick: this.onClickEvent,
                    //eventsSet: this.handleEvents
                    /* you can update a remote database when these fire:
                    eventAdd:
                    eventChange:
                    eventRemove:
                    */
                    //eventAdd: this.eventAdded,
                    eventChange: this.eventChanged
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
                },

                selectionDateInfo: null,
                initialLoadAppointment: true,
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
        async created() {
            const vm = this;

            var settings = JSON.parse(localStorage.getItem('calendar:settings')) || {};

            vm.calendarOptions.initialView = settings.viewType;


        },

        async mounted() {
            const vm = this;

            await vm.getClinicInfo();
            await vm.getChildren();

            vm.$bus.$on('event:appointment-updated', async (resp) => {
                await vm.refresh();
            });
        },

        methods: {
            async refresh() {
                const vm = this;

                const fullCalendar = vm.$refs.fullCalendar;

                fullCalendar.getApi().refetchEvents();
            },
            datesSet(dateInfo) {
                var setting = {
                    start: dateInfo.start,
                    end: dateInfo.end,
                    viewType: dateInfo.view.type
                }
                localStorage.setItem('calendar:settings', JSON.stringify(setting));
            },
            getValidClass(field) {
                const vm = this;

                if (!vm.isDirty)
                    return '';

                if (vm.validations.has(field))
                    return 'is-invalid';
                return 'is-valid';
            },
            async eventChanged(info) {
                const vm = this;
                const item = info.event.extendedProps.item;

                if (item.status > 2) {
                    info.revert();
                    return;
                }

                const payload = {
                    clinicId: vm.id,
                    appointmentId: item.appointmentId,
                    token: item.token,
                    dateStart: moment(info.event.start),
                    dateEnd: moment(info.event.end)
                }

                try {
                    await vm.$util.axios.put(`/api/appointments/`, payload);
                    vm.$bvToast.toast('Appointment updated.', { title: 'Edit Appointment Date', variant: 'success', toaster: 'b-toaster-bottom-right' });

                } catch (e) {
                    vm.$util.handleError(e);
                    info.revert();
                }
            },
            async onClickCalendar(selectionDateInfo) {
                if (selectionDateInfo.allDay)
                    return;

                const vm = this;

                const start = moment(selectionDateInfo.start);
                if (start.isBefore()) {
                    vm.$bvToast.toast('Cannot book appointment in the past, move on let go..', { title: 'Book Appointment', variant: 'warning' });
                    return;
                }

                vm.selectionDateInfo = selectionDateInfo;
                vm.item.dateStart = moment(selectionDateInfo.start);//.format('YYYY-MM-DDTHH:mm');
                vm.item.dateEnd = moment(selectionDateInfo.end);//.format('YYYY-MM-DDTHH:mm');

                vm.$refs.modal.show();
            },

            async onClickEvent(info) {
                const vm = this;
                if (info.event.extendedProps.item.parent.parentId === vm.uid)
                    vm.$refs.modalView.open(info.event.id);
            },

            getEventBg(item) {
                let bg = '';

                switch (item.status) {

                    // ParentRequested,
                    // ClinicRequested,
                    case 1:
                    case 2:
                        bg = 'magenta';
                        break;

                    // ParentCancelled,
                    // ClinicCancelled,
                    case 3:
                    case 4:
                        bg = 'silver';
                        break;

                    // ParentRejected,
                    // ClinicRejected,
                    case 5:
                    case 6:
                        bg = 'red';
                        break;

                    //Accepted,
                    case 7:
                        bg = 'blue';
                        break;
                    // InProgress,
                    case 8:
                        bg = 'green';
                        break;
                    // Completed,
                    case 9:
                        bg = 'bluegreen';
                        break;
                    //Archived
                }

                return bg;
            },

            async getClinicInfo() {
                const vm = this;

                await vm.$util.axios.get(`/api/clinics/${vm.id}`)
                    .then(resp => vm.clinic = resp.data);

                vm.calendarOptions.businessHours = vm.clinic.businessHours;
                vm.calendarOptions.eventConstraint = vm.clinic.businessHours;
            },

            async getAppointments(fetchInfo) {
                const vm = this;

                try {
                    const query = [
                        '?c=',
                        '&p=', 1,
                        '&s=', 100,
                        '&sf=',
                        '&so=', -1,
                        '&ds=', moment(fetchInfo.start).valueOf(),
                        '&de=', moment(fetchInfo.end).valueOf(),

                    ].join('');

                    return await vm.$util.axios.get(`/api/appointments/clinic/search/${vm.id}/${query}`)
                        .then(resp => {

                            const items = resp.data.items.map(e => {
                                return {
                                    id: e.appointmentId,
                                    display: 'list-item',                                    
                                    //title: vm.uid !== e.parent.parentId ? `RESERVED` : `${e.clinic.name} - ${e.child.name}`,
                                    title: vm.uid !== e.parent.parentId ? `RESERVED` : e.referenceNumber,
                                    allDay: false,
                                    editable: vm.uid === e.parent.parentId,
                                    start: moment(e.dateStart).format('YYYY-MM-DDTHH:mm'),
                                    end: moment(e.dateEnd).format('YYYY-MM-DDTHH:mm'),

                                    backgroundColor: vm.uid !== e.parent.parentId ? 'gray' : vm.getEventBg(e),

                                    item: e
                                };
                            });

                            const urlParams = new URLSearchParams(window.location.search);
                            const appointmentId = urlParams.get('appointmentId');

                            if (vm.initialLoadAppointment && appointmentId) {
                                vm.initialLoadAppointment = false;
                                vm.$refs.modalView.open(appointmentId);
                            }

                            return items;
                        });
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

                    if (vm.lookups.children.length === 1) {
                        vm.item.childId = vm.lookups.children[0].id;
                    }

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

                    await vm.$util.axios.post(`/api/appointments/parent/request`, payload)
                        .then(async _ => {
                            vm.$bvToast.toast('Appointment requested.', { title: 'Request Appointment', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            vm.$refs.modal.hide();
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