<template>
    <div>
      <Details />
      <column-chart :legend="true" ytitle="Commandes" label="Commandes" :data="dashboardData">
      </column-chart>
      <!-- <div class="text-center ma-2">
        <v-btn
          dark
          @click="snackbar = true"
        >
          Nombre d'appels
        </v-btn>
        <v-snackbar
          transition="slide-x-transition"
          color="red"
          style="margin: 10%"
          rounded="pill"
          left
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ text }}

        </v-snackbar>
      </div> -->
    </div>
</template>

<script>
import axios from 'axios';
import server from '../config/address';
import Details from '../components/dashboard/Dashboard-details';
export default {
  name: 'Reporting',
  data: () => ({
    snackbar: false,
    text: `Aujourd'hui: 18 appels émis`,
    timeout: 5000,
    dashboardData: []
  }),
  components: { Details },
  mounted(){
    axios.get(`${server.address}/sheet/test/test`).then(response =>{
      this.dashboardData = response.data;
    }).catch(error =>{
      console.log(error);
    })
  }
}
</script>

<style>

</style>
