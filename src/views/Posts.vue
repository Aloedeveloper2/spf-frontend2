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
        class="mr-2"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      <v-icon
        @click="goToDetails(item)"
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
          value: 'post'
        },
        { text: 'Télévendeur', value: 'account.name' },
        { text: 'Téléphone', value: 'account.phone' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      posts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        surname: '',
        phone: '',
      },
      defaultItem: {
        name: '',
        surname: '',
        phone: '',
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
            id: "000",
            post: 'Poste1',
            account: {
              name: "Andréa",
              phone: "677790023"
            },
          },
          {
            id: "001",
            post: 'Poste2',
            account: {
              name: "Patrick",
              phone: "693324545"
            },
          },
          {
            id: "002",
            post: 'Poste3',
            account: {
              name: "Boris",
              phone: "680002365"
            },
          },
          {
            id: "003",
            post: 'Poste4',
            account: {
              name: "Emmanuel",
              phone: "674253469"
            }
          },
          {
            id: "004",
            post: 'Poste5',
            account: {
              name: "Nicolas",
              phone: "693946792"
            }
          },
          {
            id: "005",
            post: 'Poste6',
            account: {
              name: "Liliane",
              phone: "690653512"
            }
          }
        ]
      },

      goToDetails (item) {
        this.$router.push(`/postes/${item.id}`);
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
