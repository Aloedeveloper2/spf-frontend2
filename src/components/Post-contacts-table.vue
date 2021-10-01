<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
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
                        value="call"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-phone-check</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="argument"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-text-to-speech</v-icon></div>
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
                        value="Option 2"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-text-to-speech</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="Option 2"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-text-to-speech</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="Option 2"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-text-to-speech</v-icon></div>
                        </template>
                    </v-radio>
                    <v-radio
                        value="Option 2"
                    >
                        <template v-slot:label>
                            <div><v-icon>mdi-text-to-speech</v-icon></div>
                        </template>
                    </v-radio>
                    
                </v-radio-group>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        data () {
        return {
            row: null,
            expanded: [],
            singleExpand: false,
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' },
            ],
            desserts: [
                {
                    id: "000",
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    id: "001",
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    id: "000",
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    id: "000",
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    id: "000",
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    id: "000",
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    id: "000",
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    id: "000",
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    id: "000",
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    id: "000",
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
            ],
        }
        },
    }
</script>

<style>

</style>