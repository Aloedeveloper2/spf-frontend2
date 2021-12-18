<template>
    <v-dialog
                            v-model="importDialog"
                            max-width="500px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    dark
                                    text
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                <v-icon large>mdi-upload</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">Importer un fichier</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-col
                                            cols="12"
                                            sm="12"
                                            md="12"
                                        >
                                            <v-file-input label="Fichier excel" outlined dense @change="handleFileUpload($event)">
                                                <template v-slot:selection="{ text }">
                                                    <v-chip small label color="primary">
                                                        {{ text }}
                                                    </v-chip>
                                                </template>
                                            </v-file-input>
                                        </v-col>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="red darken-1"
                                        text
                                        @click="importDialog = false"
                                    >
                                        Annuler
                                    </v-btn>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="importFile()"
                                    >
                                        Importer
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
</template>

<script>
    /* import axios from 'axios';
    import server from '../config/address'; */
    import XLSX from 'xlsx'; 
    export default {
        props: ['groupId'],
        data(){
            return{
                importDialog: false,
                file: ""
            }
        },
        methods: {
            handleFileUpload(event){
                this.file = event;
            },
            importFile(){
                if (this.file) {
                    let parent = this;
                    let contacts = [];
                    let fileReader = new FileReader();
                    fileReader.onload = function(event){
                        let data = event.target.result;
                        let workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]])

                        for (let index = 1; index < rowObject.length; index++) {
                            contacts.push({
                                group: parent.groupId, 
                                name: rowObject[index].__EMPTY,
                                phone: rowObject[index].__EMPTY_2,
                                town: rowObject[index].__EMPTY_1
                            })
                        }
                        console.log(contacts);
                        parent.$emit('sendContacts', contacts);
                        /* workbook.SheetNames.forEach(sheet => {
                            let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                            
                        }); */
                    }
                    fileReader.readAsBinaryString(this.file);
                    /* axios.post(`${server.address}/contacts/upload`, {contacts: contacts}).then(response=>{
                        console.log(response);
                    }).catch(error =>{
                        console.log(error);
                    }) */
                }
            }
        }
    }
</script>

<style>
    
</style>