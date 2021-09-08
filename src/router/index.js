import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Reporting.vue'
// import Account from '../views/Accounts.vue';
import Listening from '../views/Listenings.vue'
import Post from '../views/Posts.vue'
import Project from '../views/Projects.vue'
import Sheet from '../views/Sheets.vue'

Vue.use(VueRouter)

const routes = [
  /* {
    path: '/',
    name: 'Account',
    component: Account
  }, */
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/postes',
    name: 'Post',
    component: Post
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
  }/* ,
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  }, */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
