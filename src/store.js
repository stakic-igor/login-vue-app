import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store =  new Vuex.Store({
    state: {

        isAutenticated: false,
        userData: {
            email: '',
            password: ''
        }
    },
    mutations: {
        // reminder: always syncronous
        SET_EMAIL(state, event) {
            state.userData.email = event.email;
        },
        IS_AUTH(state, event) {
            state.isAutenticated = event.isAutenticated;
        },
        LOGOUT(state, event) {
            state.isAutenticated = event.isAutenticated;
        }
    },
    actions: {
        // reminder: syncronous or asyncronous
        setEmail({ commit }, event) {
            window.localStorage.setItem('saveEmail', event.email);
            commit('SET_EMAIL', event);
        },
        authUser({commit}, event) {
            window.localStorage.setItem('authUser', true);
            commit('IS_AUTH', event);
        },
        logout({commit}, event) {
            window.localStorage.clear();
            commit('LOGOUT', event);
        }
    },
})
