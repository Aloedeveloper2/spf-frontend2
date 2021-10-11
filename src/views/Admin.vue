<template>
    <div>
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
        <v-main id="reporting-style">
            <router-view/>
        </v-main>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                drawer: null,
                items: [
                    { title: 'Dashboard', icon: 'mdi-chart-line', path:"/admin/dashboard"},
                    { title: 'Utilisateurs', icon: 'mdi-account-multiple', path:"/admin/utilisateurs" },
                    { title: 'Projets', icon: 'mdi-folder-multiple', path:"/admin/projets" },
                    { title: 'Postes', icon: 'mdi-headset', path:"/admin/postes" },
                    { title: 'Fiches', icon: 'mdi-table', path:"/admin/fiches" },
                    { title: 'Ecoutes', icon: 'mdi-ear-hearing', path:"/admin/ecoutes" }
                ]
            }
        }
    }
</script>

<style>

</style>