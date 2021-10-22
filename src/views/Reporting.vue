<template>
    <div>
      <Details />
      <column-chart :legend="true" ytitle="Appels" label="Appels" :data="dashboardData">
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
