<style scoped>
    label {
        font-size: small;
    }
</style>
<template>
    <div v-cloak>

        <div class="d-flex flex-row justify-content-between">
            <h1 class="h3 mb-sm-0">
                <i class="fas fa-fw fa-calendar mr-1"></i>Appointments
            </h1>
            <div class="text-right">
                <b-overlay :show="busy">
                    <button @click="refresh" class="btn btn-info">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>

                    <button @click="close" class="btn btn-secondary">
                        <span class="fas fa-fw fa-times-circle"></span>
                    </button>
                </b-overlay>
            </div>
        </div>


        <div class="mt-2">
            <full-calendar ref="fullCalendar"                            
                           :options='calendarOptions'>

            </full-calendar>
        </div>

        <modal-add ref="modalAdd"></modal-add>
        <modal-view ref="modalView" :uid="uid" view-mode="clinic"></modal-view>

    </div>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'

    import pageMixin from '../../../_Core/Mixins/pageMixin';
    import modalAdd from './_add.vue';
    import modalView from '../../../_Common/Modals/Appointments/view.vue';

    export default {
        mixins: [pageMixin],
        props: {
            uid: {
                type: String,
                required: true
            }
        },
        components: {
            FullCalendar, modalAdd, modalView
        },
        data() {
            return {
                calendarOptions: {
                    contentHeight: 'auto',
                    //height: '100%',
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
                    eventChange: this.eventChanged,

                },
                clinic: {},
                items: []
            }
        },
        async created() {
            const vm = this;

            var settings = JSON.parse(localStorage.getItem('calendar:settings')) || {};

            vm.calendarOptions.initialView = settings.viewType;

            vm.$bus.$on('event:appointment-updated', async (resp) => {
                await vm.refresh();
            });
        },
        async mounted() {
            const vm = this;

            await vm.getClinicInfo();
        },

        methods: {
            async refresh() {
                const vm = this;

                const fullCalendar = vm.$refs.fullCalendar;

                fullCalendar.getApi().refetchEvents();
            },
            async datesSet(dateInfo) {
                var setting = {
                    start: dateInfo.start,
                    end: dateInfo.end,
                    viewType: dateInfo.view.type
                }
                localStorage.setItem('calendar:settings', JSON.stringify(setting));
            },
            async eventChanged(info) {
                const vm = this;
                const item = info.event.extendedProps.item;

                if (item.status > 2) {
                    info.revert();
                    return;
                }

                const payload = {
                    appointmentId: item.appointmentId,
                    token: item.token,
                    dateStart: moment(info.event.start),
                    dateEnd: moment(info.event.end)
                }

                try {
                    await vm.$util.axios.put(`/api/appointments/`, payload);
                } catch (e) {
                    vm.$util.handleError(e);
                    info.revert();
                }
            },

            async onClickCalendar(selectInfo) {
                if (selectInfo.allDay)
                    return;

                const start = moment(selectInfo.start);
                const end = moment(selectInfo.end);
                if (start.isBefore()) {
                    return;
                }

                const vm = this;

                vm.$refs.modalAdd.open({
                    dateStart: (start).format('YYYY-MM-DDTHH:mm'),
                    dateEnd: (end).format('YYYY-MM-DDTHH:mm')
                });
            },

            async onClickEvent(info) {
                const vm = this;

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

                await vm.$util.axios.get(`/api/clinics/my-clinic`)
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

                    return await vm.$util.axios.get(`/api/appointments/clinic/search/${query}`)
                        .then(resp => {
                            vm.items = resp.data.items;

                            //vm.calendarOptions.events
                            const items = resp.data.items.map(e => {
                                return {
                                    id: e.appointmentId,
                                    title: `${e.referenceNumber}`,
                                    description: `${e.statusText}: ${e.parent.name} - ${e.child.name}`,
                                    start: moment(e.dateStart).format('YYYY-MM-DDTHH:mm'),
                                    end: moment(e.dateEnd).format('YYYY-MM-DDTHH:mm'),

                                    color: 'red',
                                    color: vm.getEventBg(e),

                                    item: e,
                                    eventDidMount: function () {
                                        debugger;
                                    }
                                };
                            });

                            return items;
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

        }
    }
</script>