<template>
  <v-data-table
    :headers="headers"
    :items="lists"
    sort-by="name"
    :search="search"
    :loading="loadingTable"
    loading-text="Chargement... Veuillez patienter"
  >
    <template v-slot:[`item.type`]="{ item }">
      <v-chip
        :color="getColor(item.type)"
        dark
      >
        {{ item.type }}
      </v-chip>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Utilisateurs</v-toolbar-title>
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
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      outlined
                      v-model="editedItem.name"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      outlined
                      v-model="editedItem.surname"
                      label="Prénom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      outlined
                      v-model="editedItem.phone"
                      label="Téléphone"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      outlined
                      v-model="editedItem.password"
                      label="Mot de passe"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-select
                      outlined
                      v-model="editedItem.type"
                      :items="items"
                      label="Type"
                    ></v-select>
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Veuillez-confirmer votre opération</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmer</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- dialog delete end -->
        <LoadingDialog :loading='loading' message="Envoi des informations" />
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-2"
            @click="editItem(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-pencil
          </v-icon>
        </template>
        <span>Modifier</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="deleteItem(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Supprimer</span>
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
  import axios from 'axios';
  import server from '../config/address';
  import LoadingDialog from '../components/Loader.vue';
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      loadingTable: true,
      loading: false,
      search: '',
      items: ['Télévendeur', 'Administrateur'],
      headers: [
        {
          text: 'Noms',
          value: 'name'
        },
        { text: 'Prénoms', value: 'surname' },
        { text: 'Téléphone', value: 'phone' },
        { text: 'Type', value: 'type' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      lists: [],
      editedIndex: -1,
      show: false,
      editedItem: {
        name: '',
        surname: '',
        phone: '',
        type: '',
        password: ''
      },
      defaultItem: {
        name: '',
        surname: '',
        phone: '',
        type: ''
      },
    }),
    components: { LoadingDialog },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nouvel utilisateur' : 'Modifier un utilisateur';
      },
    },

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
        axios.get(`${server.address}/user`).then(response =>{
          this.lists = response.data;
          this.loadingTable = false;
        }).catch(error =>{
          console.log(error);
        })
      },

      editItem (item) {
        this.editedIndex = this.lists.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true;
      },

      deleteItem (item) {
        this.editedIndex = this.lists.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios.delete(`${server.address}/user/${this.editedItem.id}`).then(()=>{
          this.lists.splice(this.editedIndex, 1)
          this.closeDelete()
        }).catch(error =>{
          console.log(error);
        })
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.loading = true;
        if (this.editedIndex > -1) {
          axios.put(`${server.address}/user/${this.editedItem.id}`, {data: this.editedItem}).then(()=>{
            Object.assign(this.lists[this.editedIndex], this.editedItem)
            this.close();
            this.loading = false;
          }).catch(error=>{
            console.log(error);
          })
        } else {
          axios.post(`${server.address}/user/register`, {data: this.editedItem}).then(() =>{
            this.lists.push(this.editedItem);
            this.close();
            this.loading = false;
          }).catch(error =>{
            console.log(error);
          })
        }
      },
      getColor (type) {
        if (type == "Télévendeur") return 'orange'
        else return 'purple'
      }
    },
  }
</script>