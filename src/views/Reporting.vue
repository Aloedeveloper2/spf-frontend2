<template>
    <div>
      <Details />
      <column-chart :legend="true" ytitle="Commandes" label="Commandes" :data=" [['Poste 1', 32], ['Poste 2', 46], ['Poste 3', 50], ['Poste 4', 28], ['Poste 5', 12]]">
      </column-chart>
    </div>
</template>

<script>
import Details from '../components/dashboard/Dashboard-details';
export default {
  name: 'Reporting',
  components: { Details }
}
</script>

<style>

</style>
