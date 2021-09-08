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
                    Regy Joyce
                  </v-list-item-title>
                  <v-list-item-subtitle>Data Architect</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <v-list
        dense
        rounded
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
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
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-chart-line' },
      { title: 'Utilisateurs', icon: 'mdi-account-multiple' },
      { title: 'Projets', icon: 'mdi-folder-multiple' },
      { title: 'Postes', icon: 'mdi-headset' },
      { title: 'Fiches', icon: 'mdi-table' },
      { title: 'Ecoutes', icon: 'mdi-ear-hearing' }
    ]
  })
}
</script>
