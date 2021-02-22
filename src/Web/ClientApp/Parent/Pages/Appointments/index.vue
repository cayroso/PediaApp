<template>
    <div v-cloak>

        <div class="row align-items-center">
            <div class="col-sm">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-calendar mr-1"></i>Appointments
                </h1>
            </div>
            <div class="col-sm-auto">
                <div class="d-flex flex-row">
                    <div class="mr-1">
                        <router-link to="/children/add" class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                        </router-link>
                    </div>

                    <div v-if="filter.visible" class="mr-1">
                        <button @click="resetDates" class="btn btn-primary">
                            <i class="fas fa-sync mr-1"></i>
                        </button>
                    </div>
                    <div class="mr-1">
                        <button @click="filter.visible = !filter.visible" class="btn btn-secondary">
                            <span class="fa fas fa-fw fa-filter"></span>
                        </button>
                    </div>
                    <div class="flex-grow-1">
                        <div class="input-group">
                            <input v-model="filter.query.criteria" @keyup.enter="search(1)" type="text" class="form-control" placeholder="Enter criteria..." aria-label="Enter criteria..." aria-describedby="button-addon2">
                            <div class="input-group-append">
                                <button @click="search(1)" class="btn btn-primary" type="button" id="button-addon2">
                                    <span class="fa fas fa-fw fa-search"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-collapse v-model="filter.visible">
            <div class="card p-2 mt-2 bg-secondary">
                <div class="row">

                    <div class="col-6 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="createdForm" class="col-form-label">From</label>
                            <input v-model="filter.query.dateStart" type="date" class="form-control" />
                            <!--<b-form-datepicker id="dateStart"
                                               v-model="filter.query.dateStart"
                                               right
                                               :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>-->

                        </div>
                    </div>
                    <div class="col-6 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="createdForm" class="col-form-label">To</label>
                            <input v-model="filter.query.dateEnd" type="date"  class="form-control"/>
                            <!--<b-form-datepicker id="dateEnd"
                            v-model="filter.query.dateEnd"
                            right
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>-->

                        </div>
                    </div>
                </div>
            </div>
        </b-collapse>

        <b-overlay :show="busy">
            <div class="mt-2 table-responsive shadow-sm">
                <table-list :header="{key: 'appointmentId', columns:[]}" :items="filter.items" :getRowNumber="getRowNumber" :setSelected="setSelected" :isSelected="isSelected" table-css="">
                    <template #header>
                        <th class="text-center">#</th>
                        <th>Status</th>
                        <th>Parent</th>
                        <th>Child</th>
                        <th>Date</th>
                    </template>
                    <template slot="table" slot-scope="row">
                        <td v-text="getRowNumber(row.index)" class="text-center"></td>
                        <td class="text-break">
                            <router-link :to="{name: 'appointmentsView', params:{id: row.item.appointmentId}}">
                                {{row.item.statusText}}
                            </router-link>
                            <div class="small">
                                {{row.item.typeText}}
                            </div>
                        </td>
                        <td>
                            <ul class="list-unstyled">
                                <li>
                                    <b-avatar :src="row.item.parent.imageUrl"></b-avatar> {{row.item.parent.name}}
                                    <ul class="list-unstyled">
                                        <li>Phone: {{row.item.parent.phoneNumber}}</li>
                                        <li>Email: {{row.item.parent.email}}</li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        <td>
                            <b-avatar :src="row.item.child.imageUrl"></b-avatar> {{row.item.child.name}}
                        </td>
                        <td>
                            <div class="small">
                                Start: {{row.item.dateStart|moment('calendar')}}
                            </div>
                            <div class="small">
                                Start: {{row.item.dateEnd|moment('calendar')}}
                            </div>

                        </td>
                    </template>

                    <template slot="list" slot-scope="row">

                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-4 col-form-label">Status</label>
                            <div class="col align-self-center">
                                <router-link :to="{name: 'appointmentsView', params:{id: row.item.appointmentId}}">
                                    {{row.item.statusText}}
                                </router-link>
                                <div class="small">
                                    {{row.item.typeText}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-4 col-form-label">Parent</label>
                            <div class="col align-self-center">
                                <ul class="list-unstyled">
                                    <li>
                                        <b-avatar :src="row.item.parent.imageUrl"></b-avatar> {{row.item.parent.name}}
                                        <ul class="list-unstyled">
                                            <li>Phone: {{row.item.parent.phoneNumber}}</li>
                                            <li>Email: {{row.item.parent.email}}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-4 col-form-label">Child</label>
                            <div class="col align-self-center">
                                <b-avatar :src="row.item.child.imageUrl"></b-avatar> {{row.item.child.name}}
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-4 col-form-label">Date</label>
                            <div class="col align-self-center">
                                {{row.item.dateStart|moment('calendar')}} to {{row.item.dateEnd|moment('calendar')}}
                            </div>
                        </div>
                    </template>
                </table-list>
            </div>
        </b-overlay>


        <m-pagination :filter="filter" :search="search" :showPerPage="true" class="mt-2"></m-pagination>
    </div>
</template>
<script>
    import paginatedMixin from '../../../_Core/Mixins/paginatedMixin';
    //import tableList from '../../../_Core/Components/table-list.vue';
    export default {
        mixins: [paginatedMixin],

        props: {
            uid: String,
            urlAdd: String,
            urlView: String,
        },
        components: {
            //tableList
        },
        data() {
            return {
                baseUrl: `/api/appointments/parent/search`,
                filter: {
                    cacheKey: `filter-${this.uid}/appointments/parent/search`,
                    query: {
                        //    orderStatus: 0,
                        dateStart: moment().startOf('week').format('YYYY-MM-DD'),
                        dateEnd: moment().endOf('week').format('YYYY-MM-DD')
                    }
                },
            };
        },

        computed: {

        },

        async created() {
            const vm = this;
            const cache = JSON.parse(localStorage.getItem(vm.filter.cacheKey)) || {};

            vm.initializeFilter(cache);

            await vm.search();

        },

        async mounted() {
            const vm = this;

        },

        methods: {
            resetDates() {
                const vm = this;

                vm.filter.query.dateStart = moment().startOf('week').format('YYYY-MM-DD');
                vm.filter.query.dateEnd = moment().endOf('week').format('YYYY-MM-DD');
            },
            initializeFilter(cache) {
                const filter = this.filter;
                const urlParams = new URLSearchParams(window.location.search);

                filter.query.criteria = urlParams.get('c') || cache.criteria || filter.query.criteria;
                filter.query.pageIndex = parseInt(urlParams.get('p'), 10) || cache.pageIndex || filter.query.pageIndex;
                filter.query.pageSize = parseInt(urlParams.get('s'), 10) || cache.pageSize || filter.query.pageSize;
                filter.query.sortField = urlParams.get('sf') || cache.sortField || filter.query.sortField;
                filter.query.sortOrder = parseInt(urlParams.get('so'), 10) || cache.sortOrder || filter.query.sortOrder;
                filter.visible = cache.visible || filter.visible;

                const dateStart = parseInt(urlParams.get('ds'), 10) || cache.sortOrder || filter.query.dateStart;
                const dateEnd = parseInt(urlParams.get('de'), 10) || cache.dateEnd || filter.query.dateEnd;

                filter.query.dateStart = moment(dateStart).format('YYYY-MM-DD');
                filter.query.dateEnd = moment(dateEnd).format('YYYY-MM-DD');


            },
            getQuery() {

                const vm = this;
                const filter = vm.filter;

                if (vm.busy)
                    return;

                const query = [
                    '?c=', encodeURIComponent(filter.query.criteria),
                    '&p=', filter.query.pageIndex,
                    '&s=', filter.query.pageSize,
                    '&sf=', filter.query.sortField,
                    '&so=', filter.query.sortOrder,
                    '&ds=', moment(filter.query.dateStart).valueOf(),
                    '&de=', moment(filter.query.dateEnd).valueOf(),
                ].join('');

                return query;
            },
            saveQuery() {
                const vm = this;
                const filter = vm.filter;

                localStorage.setItem(filter.cacheKey, JSON.stringify({
                    criteria: filter.query.criteria,
                    pageIndex: filter.query.pageIndex,
                    pageSize: filter.query.pageSize,
                    sortField: filter.query.sortField,
                    sortOrder: filter.query.sortOrder,
                    dateStart: moment(filter.query.dateStart).valueOf(),
                    dateEnd: moment(filter.query.dateEnd).valueOf(),
                    visible: filter.visible
                }));
            },
        }
    }
</script>