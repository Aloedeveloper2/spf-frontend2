<template>
    <div>
      <Details />
      <column-chart :legend="true" ytitle="Commandes" label="Commandes" :data=" [['Poste 1', 32], ['Poste 2', 46], ['Poste 3', 50], ['Poste 4', 28], ['Poste 5', 12]]">
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
import Details from '../components/dashboard/Dashboard-details';
export default {
  name: 'Reporting',
  data: () => ({
    snackbar: false,
    text: `Aujourd'hui: 18 appels émis`,
    timeout: 5000,
  }),
  components: { Details }
}
</script>

<style>

</style>
