<template>
  <v-data-table
    :headers="headers"
    :items="posts"
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
                      v-model="editedItem.post"
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
      <v-icon
        small
        @click="editItem(item)"
      >
        mdi-cog
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
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      loading: false,
      search: '',
      headers: [
        {
          text: 'Poste',
          value: 'post.name'
        },
        { text: 'Heure', value: 'hour' },
        { text: 'Durée', value: 'duration' },
        { text: 'Note', value: 'note' },
        { text: 'Observation', value: 'observation' },
        { text: 'Action', value: 'action' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      posts: [],
      editedIndex: -1,
      editedItem: {
        post: '',
        hour: '',
        note: '',
        observation: '',
        action: '',
      },
      defaultItem: {
        name: '',
        hour: '',
        note: '',
        observation: '',
        action: '',
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
        this.posts = [
          {
            post: {
              name: "Poste1"
            },
            hour: '09H38',
            duration: '1 m 23 s',
            note: '3,5/5',
            observation: 'bon appel du bon sav pour s\'assurer que le client a étè bien livré.',
            action: 'Aucune action à effectuer',
          },
          {
            post: {
              name: "Poste2"
            },
            hour: '10h23',
            duration: '5 m 28 s',
            note: '3,75/5',
            observation: 'appel moyen on a un souci avec le langage un peu trop familier',
            action: 'emettre des strategies qui permettront au télèvendeur de rester professionnel quelqu\'en soit celui dont on a au bout du fil .',
          },
          {
            post: {
              name: "Poste3"
            },
            hour: '11 hrs 25',
            duration: '2 m 22 s',
            note: '2,5/5',
            observation: 'appel moyen on a un souci avec le langage un peu trop familier ',
            action: 'Aucune action à effectuer',
          },
          {
            post: {
              name: "Poste4"
            },
            hour: '15h29',
            duration: '3 minutes 41',
            note: '4/5',
            observation: 'très bon appel best sav auprés d\'un client qui a eu un souci avec la plateforme .',
            action: 'Aucune action à effectuer',
          },
          {
            post: {
              name: "Poste5"
            },
            hour: '16h19',
            duration: '3 minutes',
            note: '3,75/5',
            observation: 'bon sav une très bonne fidelisation de la clientèle suivi du porte feuille client.',
            action: 'Aucune action à effectuer',
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.posts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.posts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.posts.splice(this.editedIndex, 1)
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
        if (this.editedIndex > -1) {
          Object.assign(this.posts[this.editedIndex], this.editedItem)
        } else {
          this.posts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
