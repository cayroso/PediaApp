<style scoped>
    label {
        font-size: small;
    }
</style>
<template>
    <div v-cloak>

        <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
            <h1 class="h3 mb-sm-0">
                <i class="fas fa-fw fa-calendar mr-1"></i>Appointments
            </h1>
            <div class="text-right">
                <b-overlay :show="busy">
                    <button @click="getAppointments" class="btn btn-info">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>

                    <button @click="close" class="btn btn-secondary">
                        <span class="fas fa-fw fa-times-circle"></span>
                    </button>
                </b-overlay>
            </div>
        </div>


        <div class='card p-2 border-info mt-2'>
            <full-calendar class='demo-app-calendar'
                           :options='calendarOptions'>
                <template v-slot:eventContent='arg'>
                    <b>{{ arg.timeText }}</b>
                    <i>{{ arg.event.title }}</i>
                </template>
            </full-calendar>
        </div>

        <modal-add ref="modalAdd" @saved="getAppointments"></modal-add>
        <modal-view ref="modalView" view-mode="clinic" @saved="getAppointments"></modal-view>
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
                    initialView: 'timeGridWeek',
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
                    select: this.onClickCalendar,
                    //dateClick: this.onClickCalendar,
                    eventClick: this.onClickEvent,
                    //eventsSet: this.handleEvents
                    /* you can update a remote database when these fire:
                    eventAdd:
                    eventChange:
                    eventRemove:
                    */
                },

            }
        },

        //watch: {
        //    parentId() {
        //        const vm = this;

        //        debugger;
        //    }
        //},
        async mounted() {
            const vm = this;

            await vm.getAppointments();
        },

        methods: {

            async onClickCalendar(selectionDateInfo) {
                if (selectionDateInfo.allDay)
                    return;

                const start = moment(selectionDateInfo.start);
                const end = moment(selectionDateInfo.end);
                if (start.isBefore()) {
                    //alert('Cannot book appointment in the past')
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

            async getAppointments() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/appointments/clinic/search/?c=&p=1&s=100&sf=&so=-1`)
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
                                    title: `${e.statusText}: ${e.child.name}`,
                                    //title: `RESERVED`,
                                    allDay: false,

                                    start: moment(e.dateStart).format('YYYY-MM-DDTHH:mm'),
                                    end: moment(e.dateEnd).format('YYYY-MM-DDTHH:mm'),

                                    backgroundColor: vm.getEventBg(e)
                                };
                            });
                        })
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

        }
    }
</script>