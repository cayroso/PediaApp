<template>
    <div v-cloak>
        <div class="d-flex flex-row justify-content-between align-items-center">

            <h1 class="h3 mb-sm-0">
                <i class="fas fa-fw fa-user mr-1"></i>View Parent
            </h1>
            <div>
                <button @click="get" class="btn btn-primary">
                    <span class="fas fa-fw fa-sync"></span>
                </button>
                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>

            </div>
        </div>
        <div>
            <div class="card mt-2">
                <div class="card-header">
                    Information
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-md">
                            <label>Name</label>
                            <div class="form-control-plaintext">
                                <b-avatar :src="item.imageUrl"></b-avatar>
                                {{item.name}}
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Email</label>
                            <div class="form-control-plaintext">
                                {{item.email}}
                            </div>
                        </div>
                        <div class="form-group col-md">
                            <label>Phone Number</label>
                            <div class="form-control-plaintext">
                                {{item.phoneNumber}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-2">
                <div class="card-header">
                    Children
                </div>
                <div class="table-responsive mb-0">
                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Date Of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(c,index) in item.children">
                                <td>{{index+1}}</td>
                                <td>
                                    <b-avatar :src="c.imageUrl"></b-avatar>
                                    <router-link :to="{name: 'childrenView', params:{id:c.childId}}">
                                        {{c.name}}
                                    </router-link>
                                </td>
                                <td>
                                    {{c.genderText}}
                                </td>
                                <td>
                                    {{c.dateOfBirth|moment('calendar')}}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pageMixin from '../../../_Core/Mixins/pageMixin';

    export default {
        mixins: [pageMixin],

        props: {
            uid: String,
            id: { required: true }
        },

        data() {
            return {
                item: {}
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
                    await vm.$util.axios.get(`/api/parents/${vm.id}`)
                        .then(resp => vm.item = resp.data);
                } catch (e) {
                    vm.$util.handleError(e);
                }
            }
        }
    }
</script>