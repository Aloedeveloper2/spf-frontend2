import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Reporting.vue';
import Users from '../views/Users.vue';
import Listening from '../views/Listenings.vue';
import Post from '../views/Posts.vue';
import PostDetails from '../views/Post-details.vue';
import Project from '../views/Projects.vue';
import Sheet from '../views/Sheets.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/utilisateurs',
    name: 'Users',
    component: Users
  },
  {
    path: '/postes',
    name: 'Post',
    component: Post
  },
  {
    path: '/postes/:id',
    name: 'Post-details',
    component: PostDetails
  },
  {
    path: '/ecoutes',
    name: 'Listening',
    component: Listening
  },
  {
    path: '/fiches',
    name: 'Sheet',
    component: Sheet
  },
  {
    path: '/projets',
    name: 'Project',
    component: Project
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
