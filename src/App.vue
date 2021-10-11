<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-card
        class="mx-auto"
        max-width="434"
        tile
      >
        <v-img
          height="100%"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-row
            align="end"
            class="fill-height"
          >
            <v-col class="py-0">
              <v-list-item
                color="rgba(0, 0, 0, .4)"
                dark
              >
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{name}} {{surname}}
                  </v-list-item-title>
                  <v-list-item-subtitle>Administrateur</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <v-list
        dense
        shaped
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>BIGGY</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-img 
          max-height="150"
          max-width="51" 
          src="./assets/logo aloe-01.png"
        >
        </v-img>
      </div>
    </v-app-bar>

    <v-main id="reporting-style">
      <router-view/>
    </v-main>
    <login></login>
    <v-footer padless color="blue lighten-2">
      <v-col
        class="text-center"
        cols="12"
      >
        <i>Copyright © {{ new Date().getFullYear() }} — Aloe Sytems</i>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  import Login from './views/Login.vue';
  export default {
    name: 'App',

    data () {
      return {
        drawer: null,
        items: [
          { title: 'Dashboard', icon: 'mdi-chart-line', path:"/"},
          { title: 'Utilisateurs', icon: 'mdi-account-multiple', path:"/utilisateurs" },
          { title: 'Projets', icon: 'mdi-folder-multiple', path:"/projets" },
          { title: 'Postes', icon: 'mdi-headset', path:"/postes" },
          { title: 'Fiches', icon: 'mdi-table', path:"/fiches" },
          { title: 'Ecoutes', icon: 'mdi-ear-hearing', path:"/ecoutes" }
        ],
        name: this.$store.getters.getUserData.name,
        surname: this.$store.getters.getUserData.surname,
      }
    },
    components: { Login },
    mounted(){
      this.dialog = true;
    }
  }
</script>

<style>
  #reporting-style::before{
    background-position: 50% 50%;
    content: "";
    background-image: url('./assets/logo aloe-01.png');
    background-size: contain;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.1;
  }
</style>
