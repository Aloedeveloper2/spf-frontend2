<template>
    <section>
        <v-dialog
            max-width="600"
            v-model="dialog"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                @click="getTotalSheet()"
                depressed
                color="red"
                v-on="on"
                v-bind="attrs"
                >
                <v-icon>mdi-file-table</v-icon>
                </v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar
                        color="teal accent-4"
                        dark
                    >Fiche totale</v-toolbar>
                    <v-card-text class="text-body-1">
                        <v-row no-gutters>
                            <v-col cols="auto" sm="3">Argumentaires: </v-col>
                            <v-col cols="auto" sm="9">
                                <span v-if="!loading">{{sheet.argument}}</span>
                                <v-progress-circular v-if="loading" :width="3" :size="20" indeterminate color="gray"></v-progress-circular>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="auto" sm="3">Commandes: </v-col>
                            <v-col cols="auto" sm="9">
                                <span v-if="!loading">{{sheet.order}}</span>
                                <v-progress-circular v-if="loading" :width="3" :size="20" indeterminate color="gray"></v-progress-circular>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="auto" sm="3">Rendez-vous: </v-col>
                            <v-col cols="auto" sm="9">
                                <span v-if="!loading">{{sheet.rdv}}</span>
                                <v-progress-circular v-if="loading" :width="3" :size="20" indeterminate color="gray"></v-progress-circular>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="auto" sm="3">Occupés: </v-col>
                            <v-col cols="auto" sm="9">
                                <span v-if="!loading">{{sheet.busy_call}}</span>
                                <v-progress-circular v-if="loading" :width="3" :size="20" indeterminate color="gray"></v-progress-circular>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="auto" sm="3">Injoignables: </v-col>
                            <v-col cols="auto" sm="9">
                                <span v-if="!loading">{{sheet.unreachable}}</span>
                                <v-progress-circular v-if="loading" :width="3" :size="20" indeterminate color="gray"></v-progress-circular>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="auto" sm="3">Indisponibles: </v-col>
                            <v-col cols="auto" sm="9">
                                <span v-if="!loading">{{sheet.unavailable}}</span>
                                <v-progress-circular v-if="loading" :width="3" :size="20" indeterminate color="gray"></v-progress-circular>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="auto" sm="3">Ne plus appeler: </v-col>
                            <v-col cols="auto" sm="9">
                                <span v-if="!loading">{{sheet.doNotCall}}</span>
                                <v-progress-circular v-if="loading" :width="3" :size="20" indeterminate color="gray"></v-progress-circular>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="dialog.value = false"
                        >Fermer</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </section>
</template>

<script>
    import axios from 'axios'
    import server from '../config/address';
    export default {
        name: "Total-sheet",
        data(){
            return {
                loading: false,
                sheet: {},
                dialog: false
            }
        },
        methods: {
            getTotalSheet(){
                this.loading = true;
                axios.get(`${server.address}/sheet/total/today`).then(response =>{
                    this.sheet = response.data;
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