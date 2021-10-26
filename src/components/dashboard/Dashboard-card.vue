<template>
    <v-card :class=color max-width="344">
        <v-list-item three-line>
            <v-list-item-content class=" white--text">
                <div class="overline mb-4">
                    {{text}}
                </div>
                <v-list-item-title class="headline mb-1">
                    {{calls}}
                    <v-btn class="float-right " outlined rounded text @click="updateDashboardData()">
                    Voir <v-icon right dark>mdi-chart-bar</v-icon>
                    </v-btn>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        props: ['color', 'text','calls', 'dashboardData'],
        methods:{
            updateDashboardData(){
                this.$emit('send-dashboard-data', this.dashboardData);
            }
        }
    }
</script>

<style>

</style>