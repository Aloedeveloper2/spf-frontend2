<template>
  <v-data-table
    :headers="headers"
    :items="posts"
    :search="search"
    :loading="loading"
    loading-text="Chargement... Veuillez patienter"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Postes</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Rechercher"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
<!-- user form start -->
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nouveau
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Nouveau poste</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Poste"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Annuler
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- user form end -->

<!-- dialog delete start -->
        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Veuillez-confirmer votre opération</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmer</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
<!-- dialog delete end -->

      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <!-- <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-2"
            @click="deleteItem(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Supprimer</span>
      </v-tooltip> -->
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="goToDetails(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-cog
          </v-icon>
        </template>
        <span>Options</span>
      </v-tooltip>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Actualiser
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import config from '../config/address';
  import axios from 'axios';
  export default {
    data: () => ({
      dialog: false,
      // dialogDelete: false,
      loading: true,
      search: '',
      headers: [
        {
          text: 'Poste',
          value: 'name'
        },
        { text: 'Nom', value: 'account.name' },
        { text: 'Prénom', value: 'account.surname' },
        { text: 'Téléphone', value: 'account.phone' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      posts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }),

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios.get(`${config.server}/post`).then(response =>{
          this.posts = response.data;
          this.loading = false;
        }).catch(error =>{
          console.log(error);
        })
      },

      goToDetails (item) {
        this.$router.push(`/postes/${item.id}`);
      },

      /* deleteItem (item) {
        this.editedIndex = this.posts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      }, */

      /* deleteItemConfirm () {
        axios.delete(`${config.server}/post/${this.editedItem.id}`).then(()=>{
          this.lists.splice(this.editedIndex, 1)
          this.closeDelete()
        }).catch(error =>{
          console.log(error);
          this.closeDelete();
        })
      }, */

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      /* closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }, */

      save () {
        axios.post(`${config.server}/post`, {data: this.editedItem}).then((response) =>{
            this.editedItem = response.data;
            this.posts.push(this.editedItem);
            this.close();
          }).catch(error =>{
            console.log(error);
          })
      },
    },
  }
</script>
