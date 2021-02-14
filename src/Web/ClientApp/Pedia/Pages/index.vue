<template>
    <div v-cloak>
        <div class='demo-app-main'>
            <FullCalendar class='demo-app-calendar'
                          :options='calendarOptions'>
                <template v-slot:eventContent='arg'>
                    <b>{{ arg.timeText }}</b>
                    <i>{{ arg.event.title }}</i>
                </template>
            </FullCalendar>
        </div>
    </div>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'

    import pageMixin from '../../_Core/Mixins/pageMixin';

    export default {
        mixins: [pageMixin],

        props: {
            uid: String,
        },
        components: {
            FullCalendar 
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
                        {
                            id: 1,
                            title: 'All-day event',
                            start: new Date()
                        },
                        {
                            id: 2,
                            title: 'Timed event',
                            start: moment().add(1, 'hours')
                        }
                    ], // alternatively, use the `events` setting to fetch from a feed
                    editable: true,
                    selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true,
                    weekends: true,
                    select: this.handleDateSelect,
                    eventClick: this.handleEventClick,
                    eventsSet: this.handleEvents
                    /* you can update a remote database when these fire:
                    eventAdd:
                    eventChange:
                    eventRemove:
                    */
                },
                currentEvents: []
            }
        },

        computed: {

        },

        async created() {
            const vm = this;

        },

        async mounted() {
            const vm = this;

            //await vm.get();
        },

        methods: {
            handleWeekendsToggle() {
                this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
            },
            handleDateSelect(selectInfo) {
                let title = prompt('Please enter a new title for your event')
                let calendarApi = selectInfo.view.calendar
                calendarApi.unselect() // clear date selection
                if (title) {
                    calendarApi.addEvent({
                        id: createEventId(),
                        title,
                        start: selectInfo.startStr,
                        end: selectInfo.endStr,
                        allDay: selectInfo.allDay
                    })
                }
            },
            handleEventClick(clickInfo) {
                if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
                    clickInfo.event.remove()
                }
            },
            handleEvents(events) {
                this.currentEvents = events
            }
        }
    }
</script>