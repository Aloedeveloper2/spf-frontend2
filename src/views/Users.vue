<template>
  <v-data-table
    :headers="headers"
    :items="lists"
    sort-by="name"
    :search="search"
    :loading="loading"
    loading-text="Chargement... Veuillez patienter"
  >
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
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.surname"
                      label="Prénom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Téléphone"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.type"
                      label="Type"
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
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
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
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      loading: false,
      search: '',
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
      editedItem: {
        name: '',
        surname: '',
        phone: '',
        type: ''
      },
      defaultItem: {
        name: '',
        surname: '',
        phone: '',
        type: ''
      },
    }),

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
        this.lists = [
          {
            name: 'Frozen Yogurt',
            surname: 159,
            phone: 6.0,
            type: 24
          },
          {
            name: 'Ice cream sandwich',
            surname: 237,
            phone: 9.0,
            type: 37
          },
          {
            name: 'Eclair',
            surname: 262,
            phone: 16.0,
            type: 23
          },
          {
            name: 'Cupcake',
            surname: 305,
            phone: 3.7,
            type: 67
          },
          {
            name: 'Gingerbread',
            surname: 356,
            phone: 16.0,
            type: 49
          },
          {
            name: 'Jelly bean',
            surname: 375,
            phone: 0.0,
            type: 94
          },
          {
            name: 'Lollipop',
            surname: 392,
            phone: 0.2,
            type: 98
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.lists.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.lists.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.lists.splice(this.editedIndex, 1)
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
          Object.assign(this.lists[this.editedIndex], this.editedItem)
        } else {
          this.lists.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>