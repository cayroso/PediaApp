﻿<template>
    <div v-cloak>
        <div class="row align-items-center">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-address-book mr-1"></i>View Child
                </h1>
            </div>
            <div class="col-auto">
                <div>
                    <button @click="get" class="btn btn-primary">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
                    <button @click="close" class="btn btn-secondary">
                        <span class="fas fa-fw fa-times-circle"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="">
            <div class="card mt-2">
                <div class="card-header">
                    Child Information
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-md">
                            <label>Child</label>
                            <div class="form-control-plaintext">
                                <b-avatar :src="item.imageUrl"></b-avatar>
                                {{item.firstName}} {{item.middleName}} {{item.lastName}}
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Gender</label>
                            <div class="form-control-plaintext">
                                {{item.genderText}}
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Date of Birth</label>
                            <div class="form-control-plaintext">
                                {{item.dateOfBirth|moment('calendar')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-2">
                <div class="card-header">
                    Medical Entries
                </div>
                <div class="table-responsive mb-0">
                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Age</th>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>Date</th>
                                <th>Return</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(me,index) in item.medicalEntries">
                                <td>{{index+1}}</td>
                                <td>{{me.age}}</td>
                                <td>{{me.height}}</td>
                                <td>{{me.weight}}</td>
                                <td>{{me.dateCreated|moment('calendar')}}</td>
                                <td>{{me.dateReturn|moment('calendar')}}</td>
                                <td>
                                    <button @click="openModalViewMedicalEntry(me)" class="btn btn-sm btn-outline-info">
                                        <i class="fas fa-fw fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <modal-view-medical-entry ref="modalViewMedicalEntry"></modal-view-medical-entry>

    </div>
</template>
<script>
    import pageMixin from '../../../_Core/Mixins/pageMixin';
    import modalViewMedicalEntry from './_modalViewMedicalEntry.vue';

    export default {
        mixins: [pageMixin],
        components: {
            modalViewMedicalEntry
        },
        props: {
            uid: String,
            id: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                item: {                    
                }
            };
        },

        computed: {

        },

        async created() {
            const vm = this;

        },

        async mounted() {
            const vm = this;
            await vm.get();
        },

        methods: {
            async get() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/children/${vm.id}`)
                        .then(resp => vm.item = resp.data);                    
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },
            openModalViewMedicalEntry(entry) {
                const vm = this;

                vm.$refs.modalViewMedicalEntry.open(entry.childMedicalEntryId);
            },
        }
    }
</script>