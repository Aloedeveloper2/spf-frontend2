<template>
    <div>
      <Details />
      <column-chart 
        download="appels"
        :legend="true" 
        ytitle="Appels" 
        label="Appels" 
        :data="dashboardData" 
        @updatedashboard="updateDashboard(data)">
      </column-chart>
    </div>
</template>

<script>
  import axios from 'axios';
  import server from '../config/address';
  import Details from '../components/dashboard/Dashboard-details';
  export default {
    name: 'Reporting',
    data: () => ({
      dashboardData: [],
    }),
    components: { Details },
    methods: {
      updateDashboard(data){
        this.dashboardData = data;
      }
    },
    mounted(){
      axios.get(`${server.address}/dashboard`).then(response =>{
        this.dashboardData = response.data;
      }).catch(error =>{
        console.log(error);
      })
    }
  }
</script>

<style>

</style>
