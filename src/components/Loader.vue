<template>
    <v-dialog v-model="loadingStatus" hide-overlay persistent width="300">
        <v-card color="primary" dark>
            <v-card-text>
                {{message}}...
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "Loader",
        props: ["loading", "message"],
        computed: {
            loadingStatus(){
                if (this.loading == true) {
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    }
</script>