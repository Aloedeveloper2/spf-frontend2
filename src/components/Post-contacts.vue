<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                >
                    <v-icon>mdi-contacts</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar
                dark
                color="red darken-3"
                >
                    <v-btn
                        icon
                        dark
                        @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Contacts</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-dialog
                        v-model="dialogContact"
                        max-width="500px"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                dark
                                text
                                v-bind="attrs"
                                v-on="on"
                            >
                            <v-icon large>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Nouveau contact</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            sm="12"
                                            md="6"
                                        >
                                            <v-text-field
                                            v-model="contact.name"
                                            label="Nom"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="12"
                                            md="6"
                                        >
                                            <v-text-field
                                            v-model="contact.surname"
                                            label="Prénom"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="12"
                                            md="6"
                                        >
                                            <v-text-field
                                            v-model="contact.phone"
                                            label="Téléphone"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="12"
                                            md="6"
                                        >
                                            <v-text-field
                                            v-model="contact.town"
                                            label="Ville"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12">
                                            <v-menu
                                                v-model="menu"
                                                :nudge-right="40"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="contact.birthdate"
                                                    label="Date de naissance"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="contact.birthdate"
                                                    @input="menu = false"
                                                >
                                                </v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialogContact = false"
                                >
                                    Annuler
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="addContact()"
                                >
                                    Enregistrer
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-toolbar-items>
                </v-toolbar>
                <post-contacts-table :contacts="contacts" />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import PostContactsTable from './Post-contacts-table.vue';
    export default {
        data () {
            return {
                menu: false,
                dialogContact: false,
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
                contact:{
                    name: "",
                    surname: "",
                    phone: "",
                    town: "",
                    birthdate: "",
                },
                contacts: [
                    {
                        id: "000",
                        name: 'Ateba',
                        surname: "Julien",
                        phone: "693925454",
                        town: "Odza",
                        birthdate: "12/01/2003",
                    },
                    {
                        id: "000",
                        name: 'Kamga',
                        surname: "Joseph",
                        phone: "693925454",
                        town: "Odza",
                        birthdate: "12/01/2003",
                    },
                    {
                        id: "000",
                        name: 'Zambo',
                        surname: "Julien",
                        phone: "693925454",
                        town: "Odza",
                        birthdate: "12/01/2003",
                    },
                    {
                        id: "000",
                        name: 'Ngo',
                        surname: "Julienne",
                        phone: "693925454",
                        town: "Odza",
                        birthdate: "12/01/2003",
                    },
                    {
                        id: "000",
                        name: 'Samba',
                        surname: "Paul",
                        phone: "693925454",
                        town: "Odza",
                        birthdate: "12/01/2003",
                    },
                    {
                        id: "000",
                        name: 'Isidor',
                        surname: "Alain",
                        phone: "693925454",
                        town: "Odza",
                        birthdate: "12/01/2003",
                    },
                    {
                        id: "000",
                        name: 'Nebra',
                        surname: "Matthieu",
                        phone: "693925454",
                        town: "Odza",
                        birthdate: "12/01/2003",
                    },
                    
                ]
            }
        },
        components: { PostContactsTable },
        methods: {
            addContact(){
                this.dialogContact = false;
                return this.contacts.unshift(this.contact);
            }
        }
    }
</script>

<style>

</style>