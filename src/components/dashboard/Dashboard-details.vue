<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <Card color="blue darken-1 mx-auto" text="Aujourd'hui" calls="0" :path="todayPath"/>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <Card color="purple lighten-1" text="Hier" calls="0" :path="yesterdayPath"/>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <Card color="green" text="Il y a 7 jours" calls="0" :path="sevenDaysPath"/>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <Card color="red darken-1 mx-auto" text="Il y a 30 jours" calls="0" :path="thirtyDaysPath"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Card from './Dashboard-card.vue'
    import server from '../../config/address';
    export default {
        name: "Details",
        data(){
            return {
                todayPath: server.address+'/dashboard/today',
                yesterdayPath: server.address+'/dashboard/yesterday',
                sevenDaysPath: server.address+'/dashboard/seven-days',
                thirtyDaysPath: server.address+'/dashboard/thirty-days'
            }
        },  
        components: { Card }
    }
</script>

<style>

</style>