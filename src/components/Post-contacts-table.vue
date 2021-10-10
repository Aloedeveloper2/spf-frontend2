<template>
    <v-data-table
        :headers="headers"
        :items="contacts"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
    >
        <template v-slot:expanded-item="{headers}">
            <td :colspan="headers.length">
                <v-radio-group
                    v-model="qualification"
                    row
                >
                    <v-radio
                        value="s1"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-text-to-speech</v-icon></div>
                            <!-- argumentaire -->
                        </template>
                    </v-radio>
                    <v-radio
                        value="s2"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-calendar-clock</v-icon></div>
                            <!-- RDV -->
                        </template>
                    </v-radio>
                    <v-radio
                        value="s3"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-cart-check</v-icon></div>
                            <!-- Commande -->
                        </template>
                    </v-radio>
                    <v-radio
                        value="s4"
                    >
                    <!-- Occupé -->
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-missed</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="s5"
                    >
                    <!-- Indisponible -->
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-remove</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="s6"
                    >
                    <!-- Injoignable -->
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-cancel</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="s7"
                    >
                    <!-- Ne plus appeler -->
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-off</v-icon></div>
                        </template>
                    </v-radio>
                    {{qualification}}
                </v-radio-group>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    import axios from 'axios';
    import server from '../config/address';
    export default {
        props: ['contacts'],
        data () {
            return {
                expanded: [],
                singleExpand: true,
                headers: [
                    {
                        text: 'Noms',
                        align: 'start',
                        value: 'name',
                    },
                    { text: 'Prénoms', value: 'surname' },
                    { text: 'Villes', value: 'town' },
                    { text: 'Téléphones', value: 'phone' },
                    { text: 'Date de naissance', value: 'birthdate' }
                ],
                qualification: null,
                observation: null
            }
        },
        watch: {
            qualification: function(contact){
                axios.post(`${server.address}/sheet`, {post: this.$route.params.id, data: contact}).then(response =>{
                    console.log(response);
                    this.qualification = null;
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    }
</script>

<style>

</style>