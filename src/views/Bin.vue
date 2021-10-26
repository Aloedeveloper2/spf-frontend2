<template>
    <v-data-table
    :headers="headers"
    :items="contacts"
    sort-by="name"
    :search="search"
    :loading="loading"
    loading-text="Chargement... Veuillez patienter"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Contacts</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Rechercher"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="amber"
          dark
          @click="empty"
        >
          <v-icon left>mdi-delete-empty</v-icon>
          Vider
        </v-btn>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
    import axios from 'axios';
    import server from '../config/address';
  export default {
    data () {
        return {
            search: '',
            loading: true,
            headers: [
                { text: 'Noms', align: 'start', value: 'name' },
                { text: 'Prénoms', value: 'surname' },
                { text: 'Villes', value: 'town' },
                { text: 'Téléphones', value: 'phone' },
                { text: 'Date de naissance', value: 'birthdate' }
            ],
            contacts: [],
        }
    },
    methods: {
      empty(){
        axios.put(`${server.address}/contacts`).then(() =>{
          this.contacts = [];
        }).catch(error=>{
          console.log(error);
        })
      }
    },
    mounted(){
      axios.get(`${server.address}/contacts/status/inactive`).then(response =>{
        this.contacts = response.data;
        this.loading = false;
      }).catch(error =>{
        console.log(error);
      });
    }
  }
</script>

<style>

</style>