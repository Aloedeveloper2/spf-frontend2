<template>
  <v-data-table
    :headers="headers"
    :items="listenings"
    sort-by="name"
    :search="search"
    :loading="loading"
    loading-text="Chargement... Veuillez patienter"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Ecoutes</v-toolbar-title>
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
              <span class="text-h5">Nouvelle écoute</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field dense outlined v-model="editedItem.post" label="Poste"></v-text-field>
                  </v-col>
                </v-row>
                Prise de contact
                <v-row>
                  <v-col cols="auto" sm="4" md="4">
                    <v-text-field dense outlined v-model="editedItem.note1" label="Note"></v-text-field>
                  </v-col>
                  <v-col
                    cols="auto"
                    sm="8"
                    md="8"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="editedItem.comment1"
                      label="Commentaire"
                    ></v-text-field>
                  </v-col>
                </v-row>
                Présentation de l'objet
                <v-row>
                  <v-col cols="auto" sm="4" md="4">
                    <v-text-field dense outlined v-model="editedItem.note2" label="Note"></v-text-field>
                  </v-col>
                  <v-col
                    cols="auto"
                    sm="8"
                    md="8"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="editedItem.comment2"
                      label="Commentaire"
                    ></v-text-field>
                  </v-col>
                </v-row>
                Traitement des objections
                <v-row>
                  <v-col cols="auto" sm="4" md="4">
                    <v-text-field dense outlined v-model="editedItem.note3" label="Note"></v-text-field>
                  </v-col>
                  <v-col
                    cols="auto"
                    sm="8"
                    md="8"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="editedItem.comment3"
                      label="Commentaire"
                    ></v-text-field>
                  </v-col>
                </v-row>
                Prise de congé
                <v-row>
                  <v-col cols="auto" sm="4" md="4">
                    <v-text-field dense outlined v-model="editedItem.note4" label="Note"></v-text-field>
                  </v-col>
                  <v-col
                    cols="auto"
                    sm="8"
                    md="8"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="editedItem.comment4"
                      label="Commentaire"
                    ></v-text-field>
                  </v-col>
                </v-row>
                Attitude générale
                <v-row>
                  <v-col cols="auto" sm="4" md="4">
                    <v-text-field dense outlined v-model="editedItem.note5" label="Note"></v-text-field>
                  </v-col>
                  <v-col
                    cols="auto"
                    sm="8"
                    md="8"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="editedItem.comment5"
                      label="Commentaire"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="auto" sm="4" md="4">
                    <v-text-field dense outlined v-model="editedItem.finalNote" label="Note finale"></v-text-field>
                  </v-col>
                  <v-col
                    cols="auto"
                    sm="8"
                    md="8"
                  >
                    <v-textarea
                      v-model="editedItem.observation"
                      outlined
                      rows="1"
                      name="input-7-4"
                      label="Observation"
                    ></v-textarea>
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
            <v-card-title class="text-h5">Veuillez-confirmer votre opération?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmer</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- dialog delete end -->

      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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
  import config from '../config/address';
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      loading: false,
      search: '',
      headers: [
        { text: 'Postes', value: 'post' },
        { text: 'PC/Note', value: 'note1'},
        { text: 'PC/Comment', value: 'comment1'},
        { text: 'PO/Note', value: 'note2'},
        { text: 'PO/Comment', value: 'comment2'},
        { text: 'TO/Note', value: 'note3'},
        { text: 'TO/Comment', value: 'comment3'},
        { text: 'Congé/Note', value: 'note4'},
        { text: 'Congé/Comment', value: 'comment4'},
        { text: 'AG/Note', value: 'note5'},
        { text: 'AG/Comment', value: 'comment5'},
        { text: 'Note finale', value: 'finalNote'},
        { text: 'Observations', value: 'observation' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      listenings: [],
      editedIndex: -1,
      editedItem: {
        post: '',
        note1: '',
        comment1: '',
        note2: '',
        comment2: '',
        note3: '',
        comment3: '',
        note4: '',
        comment4: '',
        note5: '',
        comment5: '',
        finalNote: '',
        observation: '',
      },
      defaultItem: {
        post: '',
        note1: '',
        comment1: '',
        note2: '',
        comment2: '',
        note3: '',
        comment3: '',
        note4: '',
        comment4: '',
        note5: '',
        comment5: '',
        finalNote: '',
        observation: '',
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
        axios.get(`${config.server}/listening`).then(response =>{
          this.listenings = response.data;
        }).catch(error =>{
          console.log(error);
        })
      },

      deleteItem (item) {
        this.editedIndex = this.listenings.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.listenings.splice(this.editedIndex, 1)
        this.closeDelete()
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
        axios.post(`${config.server}/listening`, {data: this.editedItem}).then(() =>{
          this.listenings.push(this.editedItem);
          this.close();
        }).catch(error =>{
          console.log(error);
        })
      },
    },
  }
</script>
