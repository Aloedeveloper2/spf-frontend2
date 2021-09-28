<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
    >
        <v-toolbar-title>Gestion du poste</v-toolbar-title>
    </v-toolbar>
    <v-tabs centered>
        <v-tab>
            <v-icon left>
                mdi-folder
            </v-icon>
            Projets
        </v-tab>
        <v-tab>
            <v-icon left>
                mdi-account
            </v-icon>
            Reattribution
        </v-tab>

        <v-tab-item>
            <PostProjects />
        </v-tab-item>
        <v-tab-item>
            <Users />
        </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
    import Users from '@/components/User-bottom-sheet.vue';
    import PostProjects from '@/components/Post-projects.vue';
    export default {
        name: "Post-details",
        components: {
            Users, PostProjects
        },
        mounted(){
            console.log(this.$route.params.id);
        }
    }
</script>

<style>

</style>