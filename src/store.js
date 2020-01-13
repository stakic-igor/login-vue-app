import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store =  new Vuex.Store({
    state: {
        email: ''
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.email = event.email;
          },
    },
    actions: {
        setEmail({ commit }, event) {
            commit('ADD_EVENT', event);
          },
    },
    getters: {

    }
})