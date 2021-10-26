<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
    >
        <v-toolbar-title>Gestion du poste</v-toolbar-title>
    </v-toolbar>
    <v-tabs centered>
        <v-tab>
            <v-icon left>
                mdi-folder
            </v-icon>
            Projets
        </v-tab>
        <v-tab v-if="userType != 'Télévendeur'">
            <v-icon left>
                mdi-account
            </v-icon>
            Reattribution
        </v-tab>

        <v-tab-item>
            <PostProjects :projects="projects" @delete="deleteProject"/>
        </v-tab-item>
        <v-tab-item>
            <Users />
        </v-tab-item>
    </v-tabs>
    <LoadingDialog :loading='loading' message="Chargement des projets" />
  </v-card>
</template>

<script>
    import Users from '@/components/User-bottom-sheet.vue';
    import PostProjects from '@/components/Post-projects.vue';
    import LoadingDialog from '@/components/Loader.vue';
    import server from '../config/address';
    import axios from 'axios';
    export default {
        name: "Post-details",
        data(){
            return{
                loading: false,
                projects: [],
                userType: this.$store.getters.getUserData.type,
            }
        },
        components: {
            Users, PostProjects, LoadingDialog
        },
        mounted(){
            // get all projects managed by this post
            this.loading = true;
            axios.get(`${server.address}/project/post/${this.$route.params.id}`).then(response =>{
                this.projects = response.data;
                this.loading = false;
            }).catch(error =>{
                console.log(error);
            })
        },
        methods: {
            deleteProject(project){
                // Remove project of a post
                this.loading = true;
                axios.delete(`${server.address}/project/post/${project.id}`).then(()=>{
                    let projectIndex = this.projects.indexOf(project);
                    this.projects.splice(projectIndex, 1);
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