<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <Card 
                        color="blue darken-1 mx-auto" 
                        text="Aujourd'hui" 
                        :calls="todayNumberCalls" 
                        :dashboardData="today"
                        @send-dashboard-data="updateDashboard"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <Card 
                        color="purple lighten-1" 
                        text="Hier" 
                        :calls="yesterdayNumberCalls" 
                        :dashboardData="yesterday"
                        @send-dashboard-data="updateDashboard"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <Card 
                        color="green" 
                        text="Il y a 7 jours" 
                        :calls="sevenDaysNumberCalls" 
                        :dashboardData="sevenDays"
                        @send-dashboard-data="updateDashboard"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <Card 
                        color="red darken-1 mx-auto" 
                        text="Il y a 30 jours" 
                        :calls="thirtyDaysNumberCalls" 
                        :dashboardData="thirtyDays"
                        @send-dashboard-data="updateDashboard"
                    />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Card from './Dashboard-card.vue'
    import callsCount from '../../helpers/calls';
    export default {
        name: "Details",
        props: ["today", "yesterday", "sevenDays", "thirtyDays"],
        components: { Card },
        computed: {
            todayNumberCalls: function(){
                return callsCount(this.today)
            },
            yesterdayNumberCalls: function(){
                return callsCount(this.yesterday)
            },
            sevenDaysNumberCalls: function(){
                return callsCount(this.sevenDays)
            },
            thirtyDaysNumberCalls: function(){
                return callsCount(this.thirtyDays)
            },
        },
        methods: {
            updateDashboard(data){
                this.$emit('modifydashboard', data);
            }
        }
    }
</script>

<style>

</style>