<template>
    <v-container>
        <v-row>
            <v-col v-for="(item, i) in items" :key="i">
                <ProjectCard :item="item" />
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
                        @click="dialog = false"
                    >
                        Enregistrer
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    import '../style/style.css';
    import ProjectCard from '../components/Project-card.vue';
    export default {
        name: 'Project',
        data(){
            return {
                color: '',
                dialog: false,
                file: null,
                items: [
                    {
                        title: 'CUB (Bertoua)',
                        path: "https://go.ikwen.com/bertoua"
                    },
                    {
                        title: 'Tchopetyamo',
                        path: "https://www.tchopetyamo.com"
                    },
                    {
                        title: 'Femme fatale',
                        path: "http://www.femmefataleshopping.com"
                    },
                ]
            }
        },
        components: { ProjectCard }
    }
</script>

<style>

</style>