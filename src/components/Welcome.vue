<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 md8>
                <h1 class="title">Hello {{ currentUser }}, welcome!</h1>
            </v-flex>
            <v-flex xs12 md4 class="text-md-right">
                <v-btn color="secondary" @click="logout">Logout</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

//import { mapGetters } from 'vuex'

export default {
    name: 'Welcome',
    data: () => ({
        currentUser: ''
    }),
    // computed: {
    //     ...mapGetters(['userEmail'])
    // },
    mounted() {
        let fromLocalStorage = window.localStorage.getItem('saveEmail');
        this.currentUser = fromLocalStorage
    },
    methods: {
        logout() {
            window.localStorage.clear()
            this.$router.replace('login');
            this.$store.dispatch('logout', {isAutenticated: false})
        }
    }
}
</script>
