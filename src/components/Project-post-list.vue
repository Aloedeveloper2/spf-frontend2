<template>
    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="dialog"
        scrollable
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="ml-2 mt-3"
                fab
                icon
                height="40px"
                right
                width="40px"
                v-bind="attrs"
                v-on="on"
            >
                            
                <v-icon>
                    mdi-headset
                </v-icon>
            </v-btn>
        </template>
        <template>
            <v-card>
                <v-toolbar
                    color="primary"
                    dark
                ><v-card-title><v-icon left>
                    mdi-headset
                </v-icon> Liste des postes</v-card-title></v-toolbar>
                <v-card-text>
                    <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="posts"
                        :single-select="singleSelect"
                        hide-default-header
                        item-key="name"
                        show-select
                        class="elevation-1"
                    >
                        
                    </v-data-table>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                        color="red"
                        text
                        @click="dialog = false"
                    >Fermer</v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="getPostIds"
                    >Valider</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
    import axios from 'axios';
    import server from '../config/address';
    export default {
        props: ['id'],
        data () {
            return {
                dialog: false,
                singleSelect: false,
                selected: [],
                idList: [],
                headers: [
                    {
                        text: 'Noms',
                        align: 'start',
                        value: 'name',
                    },
                ],
                posts: []
            }
        },
        methods: {
            getPostIds(){
                for (let index = 0; index < this.selected.length; index++) {
                    let id = this.selected[index].id;
                    this.idList.push(id);
                }
                this.sendIds(this.idList);
            },
            sendIds(ids){
                axios.post(`${server.address}/project/assign`, {postIds: ids, projectId: this.id}).then(response =>{
                    console.log(response);
                    this.dialog = false;
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
        mounted(){
            axios.get(`${server.address}/post`).then(response =>{
                this.posts = response.data;
            }).catch(error =>{
                console.log(error);
            })
        }
    }
</script>

<style>

</style>