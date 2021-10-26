<template>
    <v-card :class=color max-width="344">
        <v-list-item three-line>
            <v-list-item-content class=" white--text">
                <div class="overline mb-4">
                    {{text}}
                </div>
                <v-list-item-title class="headline mb-1">
                    {{calls}}
                    <v-btn class="float-right " outlined rounded text @click="getDashboardData()">
                    Voir <v-icon right dark>mdi-chart-bar</v-icon>
                    </v-btn>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <LoadingDialog :loading='loading' message="Chargement des données" />
    </v-card>
</template>

<script>
    import axios from 'axios';
    import LoadingDialog from '../Loader.vue';
    export default {
        props: ['color', 'text','calls', 'path'],
        data(){
            return {
                loading: false
            }
        },
        components: { LoadingDialog },
        methods:{
            getDashboardData(){
                this.loading = true;
                axios.get(`${this.path}`).then(response =>{
                    this.$emit('changedashboard', response.data);
                    this.loading = false;
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    }
</script>

<style>

</style>