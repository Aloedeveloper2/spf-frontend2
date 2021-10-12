<template>
    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                text
                v-bind="attrs"
                v-on="on"
            >        
                <v-icon>mdi-calendar-clock</v-icon>
            </v-btn>
        </template>
        <template>
            <v-card>
                <v-card-text>
                    <Calendar />
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
    /* import axios from 'axios';
    import server from '../config/address'; */
    import Calendar from './Calendar.vue';
    export default {
        props: ['id'],
        data () {
            return {
                dialog: false
            }
        },
        components: {
            Calendar
        },
        methods: {
            
        },
        mounted(){
            
        }
    }
</script>

<style>

</style>