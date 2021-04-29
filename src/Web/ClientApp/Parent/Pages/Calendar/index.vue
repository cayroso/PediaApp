<style scoped>
    .fc-header-toolbar .fc-toolbar .fc-toolbar-ltr {
        display: flex;
        padding: 2px 4px;
    }
</style>
<template>
    <div v-cloak>
        <div class="row align-items-center">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-calendar-alt mr-1"></i>Calendar
                </h1>
            </div>
            <div class="col-auto">
                <div>
                    <button @click="refresh" class="btn btn-primary">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
                    <button @click="close" class="btn btn-secondary">
                        <span class="fas fa-fw fa-times-circle"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class='mt-2'>
            <full-calendar ref="fullCalendar"
                           :options='calendarOptions'>
            </full-calendar>
        </div>

        <view-appointment ref="viewAppointment"></view-appointment>

    </div>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'

    import pageMixin from '../../../_Core/Mixins/pageMixin';
    import viewAppointment from '../../Modals/Appointments/view-appointment.vue';

    export default {
        mixins: [pageMixin],

        props: {
            uid: String,
        },
        components: {
            FullCalendar,
            viewAppointment
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
                    slotMinTime: '07:00:00',
                    slotMaxTime: '20:00:00',
                    businessHours: false,
                    //selectConstraint: 'businessHours',
                    //eventConstraint: true,

                    datesSet: this.datesSet,
                    eventOverlap: false,
                    eventSources: [
                        {
                            events: this.getAppointments,
                        }
                    ],
                    //editable: true,
                    //selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true,
                    weekends: true,
                    //select: this.onClickCalendar,
                    //dateClick: this.onClickCalendar,
                    eventClick: this.onClickEvent,
                    //eventsSet: this.handleEvents
                    /* you can update a remote database when these fire:
                    eventAdd:
                    eventChange:
                    eventRemove:
                    */
                    //eventAdd: this.eventAdded,
                    //eventChange: this.eventChanged
                }
            }
        },

        computed: {

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

            //await vm.getAppointments();
        },

        methods: {
            async refresh() {
                const vm = this;

                const fullCalendar = vm.$refs.fullCalendar;
                if (fullCalendar)
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
            async onClickEvent(info) {
                const vm = this;

                vm.$refs.viewAppointment.open(info.event.id);
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

                    return await vm.$util.axios.get(`/api/appointments/parent/search/${query}`)
                        .then(resp => {

                            const items = resp.data.items.map(e => {
                                return {
                                    id: e.appointmentId,
                                    //display: 'list-item',
                                    title: `${e.statusText}: ${e.clinic.name} - ${e.child.name}`,
                                    allDay: false,
                                    //editable: vm.uid === e.parent.parentId,
                                    start: moment(e.dateStart).format('YYYY-MM-DDTHH:mm'),
                                    end: moment(e.dateEnd).format('YYYY-MM-DDTHH:mm'),

                                    backgroundColor: vm.getEventBg(e),

                                    item: e
                                };
                            });

                            return items;
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                }

            },

            async getAppointment(id) {
                const vm = this;

                vm.$refs.viewAppointment.open(id);
            }
        }
    }
</script>