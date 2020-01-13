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

export default {
    name: 'Welcome',
    data: () => ({
        currentUser: ''
    }),
    mounted() {
        let fromLocalStorage = window.localStorage.getItem('saveEmail');
        this.currentUser = fromLocalStorage;
    },
    methods: {
        logout() {
            this.$store.dispatch('logout', {isAutenticated: false});
            this.$router.replace('login');
        }
    }
}
</script>
