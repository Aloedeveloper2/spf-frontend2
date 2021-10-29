<template>
  <div>
    <LoadingDialog :loading='loading' message="Envoi des informations" />
    <v-data-table
      :headers="headers"
      :items="contacts"
      sort-by="name"
      :search="search"
      :loading="loadingTable"
      loading-text="Chargement... Veuillez patienter"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Contacts appelés</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <!-- <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Rechercher"
              single-line
              hide-details
          ></v-text-field> -->
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
  </div>
</template>

<script>
    import axios from 'axios';
    import server from '../config/address';
    import LoadingDialog from '../components/Loader.vue';
  export default {
    data () {
        return {
            search: '',
            loadingTable: true,
            loading: false,
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
    components: { LoadingDialog },
    methods: {
      empty(){
        this.loading = true;
        axios.put(`${server.address}/contacts`).then(() =>{
          this.contacts = [];
          this.loading = false;
        }).catch(error=>{
          console.log(error);
        })
      }
    },
    mounted(){
      axios.get(`${server.address}/contacts/status/inactive`).then(response =>{
        this.contacts = response.data;
        this.loadingTable = false;
      }).catch(error =>{
        console.log(error);
      });
    }
  }
</script>

<style>

</style>