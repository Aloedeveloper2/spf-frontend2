<template>
    <v-card
        color="teal accent-4"
        dark
    >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title
                    class="text-h5"
                    v-text="item.title"
                ></v-card-title>
                
                <v-card-actions>
                    <a :href="item.path" target="_blank">
                        <v-btn
                            class="ml-2 mt-3"
                            fab
                            icon
                            height="40px"
                            right
                            width="40px"
                        >
                            <v-icon>
                                mdi-open-in-new
                            </v-icon>
                        </v-btn>
                    </a>
                    <v-btn
                            class="ml-2 mt-3"
                            fab
                            icon
                            height="40px"
                            right
                            width="40px"
                        >
                            
                            <v-icon>
                                mdi-headset
                            </v-icon>
                        </v-btn>
                </v-card-actions>
            </div>

            
        </div>
    </v-card>
</template>

<script>
    export default {
        name:'Project-card',
        props: ['item']
    }
</script>

<style>

</style>