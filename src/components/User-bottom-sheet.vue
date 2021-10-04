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
                    v-for="user in users"
                    :key="user.id"
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
                    <v-list-item-title>{{ user.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-bottom-sheet>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name:'Users',
        data(){
            return{
                sheet: false,
                users: [],
            }
        },
        mounted(){
            axios.get(`http://localhost:5000/user/telemarketer`).then(response =>{
                this.users = response.data;
            }).catch(error =>{
                console.log(error);
            })
        }
    }
</script>

<style>
    #list{
        overflow-y: scroll;
    }
</style>