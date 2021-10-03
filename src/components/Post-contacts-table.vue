<template>
    <v-data-table
        :headers="headers"
        :items="contacts"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
    >
        <template v-slot:expanded-item="{ headers}">
            <td :colspan="headers.length">
                <v-radio-group
                    v-model="row"
                    row
                >
                    <v-radio
                        value="argument"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-text-to-speech</v-icon></div>
                            <!-- argumentaire -->
                        </template>
                    </v-radio>
                    <v-radio
                        value="rdv"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-calendar-clock</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="order"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-cart-check</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="indisponible"
                    >
                    <!-- Indisponible -->
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-remove</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="injoignable"
                    >
                    <!-- Injoignable -->
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-cancel</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="absence"
                    >
                    <!-- Appel en absence -->
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-missed</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="ne plus appeler"
                    >
                    <!-- Ne plus appeler -->
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-off</v-icon></div>
                        </template>
                    </v-radio>
                    
                </v-radio-group>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        props: ['contacts'],
        data () {
            return {
                row: null,
                expanded: [],
                singleExpand: false,
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
            }
        },
    }
</script>

<style>

</style>