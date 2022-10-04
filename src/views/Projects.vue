<template>
    <v-container>
        <v-row>
            <v-col v-for="(project, i) in projects" :key="i" cols="auto">
                <ProjectCard :project="project" />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        id="floating-btn"
                        color="teal accent-4"
                        class="mb-10"
                        dark
                        fixed
                        bottom
                        right
                        fab
                        large
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Nouveau projet</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col
                                    cols="12"
                                    sm="6"
                                >
                                    <v-text-field
                                    v-model="formValues.name"
                                    clearable
                                    dense
                                    outlined
                                    label="Nom"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                >
                                    <v-text-field
                                    v-model="formValues.path"
                                    clearable
                                    dense
                                    outlined
                                    label="Lien du projet"
                                    required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Fermer
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                        Enregistrer
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <LoadingDialog :loading='loading' message='Chargement des projets' />
    </v-container>
</template>

<script>
    import ProjectCard from '../components/Project-card.vue';
    import LoadingDialog from '../components/Loader.vue';
    import server from '../config/address';
    import axios from 'axios';
    export default {
        name: 'Project',
        data(){
            return {
                color: '',
                dialog: false,
                file: null,
                loading: false,
                formValues: {
                    name: '',
                    path: ''
                },
                projects: []
            }
        },
        components: { ProjectCard, LoadingDialog },
        mounted(){
            this.loading = true;
            axios.get(`${server.address}/project`).then(response =>{
                this.projects = response.data;
                this.loading = false;
            }).catch(error =>{
                console.log(error);
            })
        },
        methods: {
            save(){
                this.loading = true;
                axios.post(`${server.address}/project`, {data: this.formValues}).then(response =>{
                    this.projects.push(response.data);
                    this.dialog = false;
                    this.loading = false;
                }).catch(error =>{
                    console.log(error);
                });
            }
        }
    }
</script>