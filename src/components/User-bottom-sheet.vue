<template>
    <div class="text-center">
        <v-bottom-sheet v-model="sheet" scrollable>
            <template v-slot:activator="{ on, attrs }">
                <v-banner two-line>
                    <v-alert
                        type="info"
                        prominent
                        border="left"
                        text
                    >
                        Le menu <b>REATTRIBUTION</b> permet d'attribuer un utilisateur à un poste. Pour cela vous devez
                    cliquer sur le bouton <b>AFFICHER</b>, puis vous choisissez l'utilisateur qui sera attribué à ce poste.
                    </v-alert>
                    <template>
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon
                            outlined
                                icon="mdi-account-multiple"
                                color="white"
                            >
                                mdi-account-multiple
                            </v-icon>
                            Afficher
                        </v-btn>
                    </template>
                </v-banner>
            </template>
            <v-list id="list">
                <v-subheader>Choisissez un utilisateur</v-subheader>
                <v-list-item
                    v-for="tile in tiles"
                    :key="tile.title"
                    @click="sheet = false"
                >
                    <v-list-item-avatar>
                        <v-avatar
                            size="32px"
                            tile
                        >
                            <v-icon
                                outlined
                                icon="mdi-account-multiple"
                            >
                                mdi-account
                            </v-icon>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-title>{{ tile.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-bottom-sheet>
    </div>
</template>

<script>
    export default {
        name:'Users',
        data(){
            return{
                sheet: false,
                tiles: [
                    { title: 'Utilisateur 1' },
                    { title: 'Utilisateur 2' },
                    { title: 'Utilisateur 3' },
                    { title: 'Utilisateur 4' },
                    { title: 'Utilisateur 5' },
                    { title: 'Utilisateur 6' },
                    { title: 'Utilisateur 7' },
                    { title: 'Utilisateur 8' },
                    { title: 'Utilisateur 9' },
                    { title: 'Utilisateur 10' },
                    { title: 'Utilisateur 11' },
                    { title: 'Utilisateur 12' },
                    { title: 'Utilisateur 13' },
                    { title: 'Utilisateur 14' },
                    { title: 'Utilisateur 15' }
                ],
            }
        }
    }
</script>

<style>
    #list{
        overflow-y: scroll;
    }
</style>