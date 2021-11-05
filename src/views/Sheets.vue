<template>
  <v-container fluid>
    <v-data-iterator
      :items="sheets"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
    
      <!-- Header -->
      <template v-slot:header>
        <v-toolbar
          dark
          color="red darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort-variant"
              label="Trier par"
            ></v-select>
            <v-spacer></v-spacer>            
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                depressed
                color="red"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                depressed
                color="red"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-spacer></v-spacer>
            <!-- Show the total of sheets -->
            <v-btn
              @click="getTotalSheet()"
              depressed
              color="red"
            >
              <v-icon>mdi-file-table</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  depressed
                  color="red"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-folder-multiple</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in projects"
                  :key="index"
                >
                  <v-list-item-title id="project-list" @click="getProjectSheets(item.id)">{{ item.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-toolbar>
      </template>

      <!-- calls qualification -->
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.group.postId.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.group.postId.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                    {{ key.text }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.value] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <!-- Footer -->
      <template v-slot:footer>
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
          <span class="grey--text">Fiches par page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="red"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} sur {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="red darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="red darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
    <LoadingDialog :loading='loading' :message="loadingMessage" />
  </v-container>
</template>

<script>
  import axios from 'axios'
  import server from '../config/address';
  import LoadingDialog from '../components/Loader.vue';
    export default {
        data () {
            return {
            loadingMessage: "",
            itemsPerPageArray: [4, 8, 12],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 4,
            sortBy: 'poste',
            loading: false,
            keys: [
              { text: 'Poste', value: 'post'},
              { text: 'Argumentaires', value: 'argument'},
              { text: 'Commandes', value: 'order' },
              { text: "RDV", value: 'rdv' },
              { text: 'Occupés', value: 'busy_call' },
              { text: 'Indisponibles', value: 'unavailable' },
              { text: 'Injoignables', value: 'unreachable' },
              { text: 'Ne plus appeler', value: 'doNotCall' }
            ],
            projects: [],
            sheets: [],
          }
        },
        components: { LoadingDialog },
        mounted(){
          this.loadingMessage = "Chargement des projets"
          this.loading = true;
          axios.get(`${server.address}/project`).then(response =>{
            this.projects = response.data;
            this.loading = false;
          }).catch(error =>{
            console.log(error);
          })
        },
        computed: {
            numberOfPages () {
                return Math.ceil(this.sheets.length / this.itemsPerPage)
            },
            filteredKeys () {
                return this.keys.filter(key => key.text !== 'Poste')
            },
        },
        methods: {
            nextPage () {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage () {
                if (this.page - 1 >= 1) this.page -= 1
            },
            updateItemsPerPage (number) {
                this.itemsPerPage = number
            },
            getProjectSheets(projectId){
              this.loadingMessage = "Chargement des fiches";
              this.loading = true;
              axios.get(`${server.address}/sheet/${projectId}`).then(response =>{
                this.sheets = response.data;
                this.loading = false;
              }).catch(error =>{
                console.log(error);
              })
            },
            getTotalSheet(){
              this.loadingMessage = "Chargement de la fiche totale";
              this.loading = true;
              axios.get(`${server.address}/sheet/total/today`).then(response =>{
                this.sheets = response.data;
                this.loading = false;
              }).catch(error =>{
                console.log(error);
              })
            }
        },
    }
</script>

<style scoped>
  #project-list{
    cursor: pointer;
  }
</style>