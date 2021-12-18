<template>
    <div>
      <Details 
        :today="todayData" 
        :yesterday="yesterdayData" 
        :sevenDays="sevenDaysData" 
        :thirtyDays="thirtyDaysData" 
        @modifydashboard="updateDashboard"
      />
      <column-chart 
        download="appels"
        :legend="true" 
        ytitle="Appels" 
        label="Appels" 
        :data="dashboardData" 
      >
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
      todayData: [],
      yesterdayData: [],
      sevenDaysData: [],
      thirtyDaysData: []
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

      axios.get(`${server.address}/dashboard/today`).then(response =>{
        this.todayData = response.data;
      }).catch(error =>{
        console.log(error);
      })

      axios.get(`${server.address}/dashboard/yesterday`).then(response =>{
        this.yesterdayData = response.data;
      }).catch(error =>{
        console.log(error);
      })

      axios.get(`${server.address}/dashboard/seven-days`).then(response =>{
        this.sevenDaysData = response.data;
      }).catch(error =>{
        console.log(error);
      })

      axios.get(`${server.address}/dashboard/thirty-days`).then(response =>{
        this.thirtyDaysData = response.data;
      }).catch(error =>{
        console.log(error);
      })
    }
  }
</script>

<style>

</style>
