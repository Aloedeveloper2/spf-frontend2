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
                        <ImportContacts @sendContacts="getUploadedContacts" :groupId="id" />
                        <calendar-dialog></calendar-dialog>
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
                                                    outlined
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
                                                    outlined
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
                                                    outlined
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
                                                    outlined
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
                                                        outlined
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
                <post-contacts-table :contacts="contacts" :groupId="id" @update-contacts-list="updateContactsList"/>
            </v-card>
        </v-dialog>
        <LoadingDialog :loading="loading" :message="loadingMessage" />
    </v-row>
</template>

<script>
    import PostContactsTable from './Post-contacts-table.vue';
    import server from '../config/address';
    import axios from 'axios';
    import CalendarDialog from './Calendar-dialog.vue';
    import LoadingDialog from './Loader.vue';
    import ImportContacts from './Import-contacts.vue';
    export default {
        props: ['id'],
        data () {
            return {
                loading: false,
                loadingMessage: "",
                menu: false,
                dialogContact: false,
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
                userType: this.$store.getters.getUserData.type,
                contact:{
                    name:'',
                    surname: '',
                    phone: '',
                    town: '',
                    birthdate: '',
                },
                contacts: [],
                defaultItem: {
                    name:'',
                    surname: '',
                    phone: '',
                    town: '',
                    birthdate: '',
                },
            }
        },
        components: { PostContactsTable, CalendarDialog, LoadingDialog, ImportContacts },
        methods: {
            close(){
                this.dialogContact = false;
                this.contact = Object.assign({}, this.defaultItem)
            },
            addContact(){
                axios.post(`${server.address}/contacts`, {data: this.contact, id: this.id}).then(() =>{
                    this.contacts.unshift(this.contact);
                    this.close();
                }).catch(error=>{
                    console.log(error);
                });
            },
            updateContactsList(contacts){
                this.contacts = contacts;
            },
            getUploadedContacts(contacts){
                this.contacts = contacts;
                console.log(contacts);
                axios.post(`${server.address}/contacts/upload`, {contacts: this.contacts}).then(response=>{
                    console.log(response);
                }).catch(error =>{
                    console.log(error);
                })
            }
        },
        mounted(){
            this.loadingMessage = "Chargement des contacts"
            this.loading = true;
            axios.get(`${server.address}/contacts/${this.id}`).then(response =>{
                this.contacts = response.data;
                this.loading = false;
            }).catch(error =>{
                console.log(error);
            })
        }
    }
</script>

<style>

</style>