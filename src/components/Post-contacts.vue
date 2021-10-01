<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                >
                    <v-icon>mdi-contacts</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar
                dark
                color="red darken-3"
                >
                    <v-btn
                        icon
                        dark
                        @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Contacts</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                        dark
                        text
                        @click="dialog = false"
                        >
                        Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <PostContactsTable />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import PostContactsTable from "@/components/Post-contacts-table.vue";
    export default {
        data () {
            return {
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
            }
        },
        components: { PostContactsTable }
    }
</script>

<style>

</style>