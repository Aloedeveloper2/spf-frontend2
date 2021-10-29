<template>
    <div>
        <Notification :notification="alert" />
        <v-data-table
            :search="search"
            :headers="headers"
            :items="contacts"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="id"
            show-expand
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Rechercher"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-toolbar>
            </template>
            <template v-slot:expanded-item="{headers, item}">
                <td :colspan="headers.length">
                    <v-radio-group
                        v-model="qualification"
                        row
                    >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-radio
                                    :value="{val: 's1', id: item.id}"
                                >
                                    <template v-slot:label>
                                        <div><v-icon v-bind="attrs" v-on="on">mdi-text-to-speech</v-icon></div>
                                        <!-- argumentaire -->
                                    </template>
                                </v-radio>
                            </template>
                            <span>Argumentaire</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-radio
                                    :value="{val: 's2', id: item.id}"
                                >
                                    <template v-slot:label>
                                        <div><v-icon v-bind="attrs" v-on="on">mdi-calendar-clock</v-icon></div>
                                        <!-- RDV -->
                                    </template>
                                </v-radio>
                            </template>
                            <span>Rendez-vous</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-radio
                                    :value="{val: 's3', id: item.id}"
                                >
                                    <template v-slot:label>
                                        <div><v-icon v-bind="attrs" v-on="on">mdi-cart-check</v-icon></div>
                                        <!-- Commande -->
                                    </template>
                                </v-radio>
                            </template>
                            <span>Commande</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-radio
                                    :value="{val: 's4', id: item.id}"
                                >
                                <!-- Occupé -->
                                    <template v-slot:label>
                                        <div><v-icon v-bind="attrs" v-on="on">mdi-phone-missed</v-icon></div>
                                    </template>
                                </v-radio>
                            </template>
                            <span>Occupé</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-radio
                                    :value="{val: 's5', id: item.id}"
                                >
                                <!-- Indisponible -->
                                    <template v-slot:label>
                                        <div><v-icon v-bind="attrs" v-on="on">mdi-phone-remove</v-icon></div>
                                    </template>
                                </v-radio>
                            </template>
                            <span>Indisponible</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-radio
                                    :value="{val: 's6', id: item.id}"
                                >
                                <!-- Injoignable -->
                                    <template v-slot:label>
                                        <div><v-icon v-bind="attrs" v-on="on">mdi-phone-cancel</v-icon></div>
                                    </template>
                                </v-radio>
                            </template>
                            <span>Injoignable</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-radio
                                    :value="{val: 's7', id: item.id}"
                                >
                                    <!-- Ne plus appeler -->
                                    <template v-slot:label>
                                        <div>
                                            <v-icon v-bind="attrs" v-on="on">mdi-phone-off</v-icon>
                                        </div>
                                    </template>
                                </v-radio>
                            </template>
                            <span>Ne plus appeler</span>
                        </v-tooltip>
                        <!-- <v-cols col="3" sm="3">
                        <v-text-field
                            dense
                            outlined
                            label="Observation"
                        ></v-text-field>
                    </v-cols> -->
                    </v-radio-group>
                </td>
            </template>
        </v-data-table>
        <LoadingDialog :loading='loading' :message=loadingMessage />
    </div>
</template>

<script>
    import Notification from '../components/Notification.vue';
    import LoadingDialog from './Loader.vue';
    import axios from 'axios';
    import server from '../config/address';
    export default {
        props: ['contacts', 'groupId'],
        components: {Notification, LoadingDialog},
        data () {
            return {
                loadingMessage: '',
                search: '',
                expanded: [],
                alert: false,
                singleExpand: true,
                headers: [
                    {
                        text: 'Noms',
                        align: 'start',
                        value: 'name'
                    },
                    { text: 'Prénoms', value: 'surname' },
                    { text: 'Villes', value: 'town' },
                    { text: 'Téléphones', value: 'phone' },
                    { text: 'Date de naissance', value: 'birthdate' }
                ],
                qualification: null,
                observation: null,
                loading: false
            }
        },
        watch: {
            qualification: function(contact){
                if (contact) {
                    this.loadingMessage = "Opération en cours";
                    this.loading = true;
                    axios.post(`${server.address}/sheet`, 
                        {
                            groupId: this.groupId, 
                            data: contact.val,
                            contactId: contact.id,
                            postId: this.$route.params.id
                        }).then(() =>{
                            this.loadingMessage = "Mise à jour de la liste";
                            this.alert = true;
                            axios.get(`${server.address}/contacts/${this.groupId}`).then(results =>{
                                this.$emit('update-contacts-list', results.data);
                                this.loading = false;
                                // this.qualification = null;
                            }).catch(error =>{
                                console.log(error);
                            })
                    }).catch(error =>{
                        console.log(error);
                    })
                }
            }
        }
    }
</script>