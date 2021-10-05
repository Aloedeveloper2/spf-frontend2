<template>
    <v-card
        color="teal accent-4"
        dark
    >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title
                    class="text-h5"
                    v-text="project.name"
                ></v-card-title>
                
                <v-card-actions>
                    <a :href="project.path" target="_blank">
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
                    <project-post-list :id="project.id"/>
                </v-card-actions>
            </div>
        </div>
    </v-card>
</template>

<script>
    import ProjectPostList from './Project-post-list.vue';
    export default {
        name:'Project-card',
        props: ['project'],
        components: { ProjectPostList }
    }
</script>

<style>

</style>