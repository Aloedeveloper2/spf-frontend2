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
                                <v-col
                                    cols="12"
                                >
                                    <v-file-input
                                        dense
                                        v-model="file"
                                        placeholder="Envoyez votre image"
                                        label="Image du projet"
                                        prepend-icon="mdi-image"
                                        outlined
                                    >
                                        <template v-slot:selection="{ text }">
                                        <v-chip
                                            small
                                            label
                                            color="primary"
                                        >
                                            {{ text }}
                                        </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                <v-col
                                    cols="12"
                                >
                                    <v-color-picker elevation="2" canvas-height="50" mode="hexa" v-model="color"></v-color-picker>
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
                        color: '#1F7087',
                        src: 'https://static.ikwen.com/council/img/cameroon-council-logo-180x180.png',
                        title: 'CUB (Bertoua)',
                        createdAt: '23/04/2012',
                        path: "https://go.ikwen.com/bertoua"
                    },
                    {
                        color: '#FF8A80',
                        src: 'https://assets.ikwen.com/ikwen/configs/logos/logo_tchopetyamo_512x512.png',
                        title: 'Tchopetyamo',
                        createdAt: '12/03/2011',
                        path: "https://www.tchopetyamo.com"
                    },
                    {
                        color: '#BDBDBD',
                        src: '../../logo-femme-fatale.png',
                        title: 'Femme fatale',
                        createdAt: '09/02/2021',
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