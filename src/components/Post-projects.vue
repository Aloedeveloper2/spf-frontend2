<template>
    <v-row id="post-project-row">
        <v-col cols="auto" v-for="(project, i) in projects" :key="i">
            <v-card color="teal accent-4" dark width="150">
                <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title>{{project.projectId.name}}</v-card-title>
                        <v-card-actions>
                            <v-btn
                                icon
                                @click="getProject(project)" class="mr-3"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <PostContacts :id="project.id"/>
                        </v-card-actions>
                    </div>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import PostContacts from '@/components/Post-contacts.vue';
    export default{
        name: "Post-project",
        props: ['projects'],
        components: { PostContacts },
        methods: {
            getProject(project){
                this.$emit('delete', project);
            }
        }
    }
</script>

<style scoped>
    #post-project-row{
        margin: 2% 0% 0% 0%;
    }
</style>