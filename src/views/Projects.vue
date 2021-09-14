<template>
    <v-container>
        <v-row>
            <v-col v-for="(item, i) in items" :key="i">
                <ProjectCard :item="item" />
            </v-col>
        </v-row>
        <v-btn
            id="floating-btn"
            color="teal accent-4"
            dark
            fixed
            bottom
            right
            fab
            large
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
    import '../style/style.css';
    import ProjectCard from '../components/Project-card.vue';
    export default {
        name: 'Project',
        data(){
            return {
                items: [
                    {
                        color: '#1F7087',
                        src: 'https://static.ikwen.com/council/img/cameroon-council-logo-180x180.png',
                        title: 'CUB (Bertoua)',
                        createdAt: '23/04/2012',
                        path: "https://go.ikwen.com/bertoua"
                    },
                    {
                        color: '#FF8A80',
                        src: 'https://assets.ikwen.com/ikwen/configs/logos/logo_tchopetyamo_512x512.png',
                        title: 'Tchopetyamo',
                        createdAt: '12/03/2011',
                        path: "https://www.tchopetyamo.com"
                    },
                    {
                        color: '#BDBDBD',
                        src: '../../logo-femme-fatale.png',
                        title: 'Femme fatale',
                        createdAt: '09/02/2021',
                        path: "http://www.femmefataleshopping.com"
                    },
                ]
            }
        },
        components: { ProjectCard }
    }
</script>

<style>

</style>