import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_data: {}
  },
  getters: {
    getUserData(state){
      return state.user_data;
    }
  },
  mutations: {
    setUserData(state, data){
      state.user_data = {
        name: data.name,
        surname: data.surname,
        type: data.type
      }
      /* state.user_data = {
          id: data.id,
          name: data.name,
          surname: data.prenom,
          group: data.groupe
      }; */
      localStorage.setItem('user_data', JSON.stringify(state.user_data));
    },
    initialiseStore(state){
      if (localStorage.getItem('user_data')) {
        state.user_data = JSON.parse(localStorage.getItem('user_data'));
      }
    }
  },
  mutations: {
    setUserData(state, data){
      state.user_data = {
        name: data.name,
        surname: data.surname
      }
      /* state.user_data = {
          id: data.id,
          name: data.name,
          surname: data.prenom,
          group: data.groupe
      }; */
      localStorage.setItem('user_data', JSON.stringify(state.user_data));
    },
    initialiseStore(state){
      if (localStorage.getItem('user_data')) {
        state.user_data = JSON.parse(localStorage.getItem('user_data'));
      }
    }
  },
  modules: {
  }
})
