<template>
    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        max-width="600"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                text
                v-bind="attrs"
                v-on="on"
            >        
                <v-icon>mdi-calendar-plus</v-icon>
            </v-btn>
        </template>
        <template>
            <v-card>
                <v-toolbar
                    class="title"
                    color="red"
                    dark
                >Nouveau rendez-vous</v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                                            <v-col
                                                cols="12"
                                                sm="12"
                                            >
                                                <v-text-field
                                                    prepend-inner-icon="mdi-pencil"
                                                    outlined
                                                    v-model="event.name"
                                                    label="Intitulé"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12">
                                                <v-menu
                                                    v-model="menuDate"
                                                    :nudge-right="40"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="auto"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        prepend-inner-icon="mdi-calendar"
                                                        outlined
                                                        v-model="event.date"
                                                        label="Date"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="event.date"
                                                        @input="menu = false"
                                                    >
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" sm="12">
                                                <v-menu
                                                    v-model="menuHour"
                                                    :nudge-right="40"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="auto"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        prepend-inner-icon="mdi-clock"
                                                        outlined
                                                        v-model="event.hour"
                                                        label="Heure"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        format="24hr"
                                                        v-model="event.hour"
                                                        @input="menu = false"
                                                    >
                                                    </v-time-picker>
                                                </v-menu>
                                            </v-col>
                        </v-row>
                        <v-btn block color="primary" @click="save">
                            Enregistrer
                        </v-btn>
                    </v-container>
                </v-card-text>
            </v-card>
        </template>
        <LoadingDialog :loading='loading' message="Envoi du rendez-vous" />
    </v-dialog>
</template>

<script>
    import axios from 'axios';
    import config from '../config/address';
    import LoadingDialog from './Loader.vue';
    export default {
        data () {
            return {
                loading: false,
                menuDate: false,
                menuHour: false,
                dialog: false,
                event:{
                    name: "",
                    date: "",
                    hour: "",
                },
            }
        },
        components: { LoadingDialog },
        methods: {
            save(){
                this.loading = true;
                axios.post(`${config.address}/events`, {
                    name: this.event.name,
                    start: this.event.date+" "+this.event.hour,
                    post: this.$route.params.id
                }).then(() =>{
                    this.loading = false;
                    window.location.reload();
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    }
</script>

<style>

</style>