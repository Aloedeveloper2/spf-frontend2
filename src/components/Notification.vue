<template>
    <div class="text-center">
        <v-snackbar
        color="primary"
        v-model="activeNotification"
        :timeout="timeout"
        >
            <v-icon left>mdi-check-circle</v-icon>
        {{ message }}
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        props: ["notification", "message"],
        data: () => ({
            timeout: 4000,
        }),
        computed: {
            activeNotification(){
                if (this.notification == true) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>