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
        SET_EMAIL(state, event) {
            state.userData.email = event.email;
        },
        IS_AUTH(state, event) {
            state.isAutenticated = event.isAutenticated
        },
        LOGIN(state, event) {
            state.userData.email = event.email;
            //state.userData.password = event.password;
        },
        LOGOUT(state, event) {
            state.isAutenticated = event.isAutenticated
        }
    },
    actions: {
        setEmail({ commit }, event) {
            commit('SET_EMAIL', event);
        },
        authUser({commit}, event) {
            commit('IS_AUTH', event)
        },
        login({commit}, event) {

            commit('LOGIN', event)
        },
        logout({commit}, event) {

            commit('LOGOUT', event)
        }
    },
    getters: {
        userEmail(state) {
            return state.userData.email
        },
        authUser(state) {
            return state.isAutenticated
        }
    }
})
