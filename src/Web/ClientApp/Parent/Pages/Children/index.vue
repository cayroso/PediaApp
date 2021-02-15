<template>
    <div v-cloak>

        <div class="row align-items-center">
            <div class="col-sm">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-address-book mr-1"></i>Children
                </h1>
            </div>
            <div class="col-sm-auto">
                <div class="d-flex flex-row">
                    <div class="mr-1">
                        <router-link to="/children/add" class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                        </router-link>
                    </div>

                    <!--<div v-if="filter.visible" class="mr-1">
                        <button @click="resetDates" class="btn btn-primary">
                            <i class="fas fa-sync mr-1"></i>
                        </button>
                    </div>
                    <div class="mr-1">
                        <button @click="filter.visible = !filter.visible" class="btn btn-secondary">
                            <span class="fa fas fa-fw fa-filter"></span>
                        </button>
                    </div>-->
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
            <!--<div class="card p-2 mt-2 bg-secondary">
                <div class="row">
                    <div class="col-6 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label class="col-form-label">Patients</label>
                            <b-select v-model="filter.query.patientId" :options="lookups.patients" :value-field="`id`" :text-field="`name`">
                                <template v-slot:first>
                                    <option :value="null">All</option>
                                </template>
                            </b-select>
                        </div>
                    </div>
                    <div class="col-6 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label class="col-form-label">Caregivers</label>
                            <b-form-select v-model="filter.query.caregiverId" :options="lookups.caregivers" :value-field="`id`" :text-field="`name`">
                                <template v-slot:first>
                                    <option :value="null">All</option>
                                </template>
                            </b-form-select>
                        </div>
                    </div>
                    <div class="col-6 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label class="col-form-label ">Job Status</label>
                            <b-form-select v-model="filter.query.jobStatus" :options="lookups.jobStatuses" :value-field="`id`" :text-field="`name`" :class="`text-capitalize`">
                                <template v-slot:first>
                                    <option :value="`0`">All</option>
                                </template>

                            </b-form-select>
                        </div>
                    </div>

                    <div class="w-100 d-block d-sm-none d-md-block"></div>

                    <div class="col-6 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="createdForm" class="col-form-label">Created From</label>

                            <b-form-datepicker id="dateStart"
                                               v-model="filter.query.dateStart"
                                               right
                                               :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>

                        </div>
                    </div>
                    <div class="col-6 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="createdForm" class="col-form-label">Created To</label>
                            <b-form-datepicker id="dateEnd"
                                               v-model="filter.query.dateEnd"
                                               right
                                               :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>

                        </div>
                    </div>
                </div>
            </div>-->
        </b-collapse>

        <b-overlay :show="busy">
            <div class="mt-2 table-responsive shadow-sm">
                <table-list :header="{key: 'childId', columns:[]}" :items="filter.items" :getRowNumber="getRowNumber" :setSelected="setSelected" :isSelected="isSelected" table-css="">
                    <template #header>
                        <th class="text-center">#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                    </template>
                    <template slot="table" slot-scope="row">
                        <td v-text="getRowNumber(row.index)" class="text-center"></td>
                        <td class="text-break">
                            <b-avatar :src="row.item.imageUrl"></b-avatar>
                            <router-link :to="{name: 'childrenView', params:{id: row.item.childId}}">
                                {{row.item.firstName}} {{row.item.middleName}} {{row.item.lastName}}
                            </router-link>
                        </td>
                        <td>
                            {{row.item.genderText}}
                        </td>
                        <td>
                            {{row.item.dateOfBirth|moment('calendar')}}
                        </td>
                    </template>

                    <template slot="list" slot-scope="row">
                        <div class="form-group mb-0 row no-gutters">
                            <div class="offset-4 col align-self-center">
                                <b-avatar :src="row.item.imageUrl"></b-avatar>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-4 col-form-label">Name</label>
                            <div class="col align-self-center">
                                <router-link :to="{name: 'childrenView', params:{id: row.item.childId}}">
                                    {{row.item.firstName}} {{row.item.middleName}} {{row.item.lastName}}
                                </router-link>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-4 col-form-label">Gender</label>
                            <div class="col align-self-center">
                                {{row.item.genderText}}
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-4 col-form-label">Date of Brith</label>
                            <div class="col align-self-center">
                                {{row.item.dateOfBirth|moment('calendar')}}
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
                baseUrl: `/api/children/parent/search`,
                filter: {
                    cacheKey: `filter-${this.uid}/children/parent/search`,
                    //query: {
                    //    orderStatus: 0,
                    //    dateStart: moment().startOf('week').format('YYYY-MM-DD'),
                    //    dateEnd: moment().endOf('week').format('YYYY-MM-DD')
                    //}
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

        }
    }
</script>