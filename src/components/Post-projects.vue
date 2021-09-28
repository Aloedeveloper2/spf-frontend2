<template>
    <v-row id="post-project-row">
        <v-col cols="12" v-for="(item, i) in projects" :key="i" sm="12" md="">
            <v-card color="teal accent-4" dark>
                <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title>{{item}}</v-card-title>
                        <v-card-actions>
                            <v-btn
                                icon
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-btn
                                icon
                            >
                                <v-icon>mdi-contacts</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </div>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default{
        name: "Post-project",
        data(){
            return{
                projects: [
                    "Tchopetyamo",
                    "CUB(Bertoua)",
                    "Femme Fatale",
                    "CUK(Kribi)"
                ]
            }
        }
    }
</script>

<style scoped>
    #post-project-row{
        margin: 2% 0% 0% 0%;
    }
</style>