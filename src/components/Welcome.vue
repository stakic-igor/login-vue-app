
<template>
    <div>
        <h1>Hello {{ userEmail }}, welcome!</h1>
    <div>
        <span @click="logout">Logout </span>
    </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'Welcome',

    computed: {
        ...mapGetters(['userEmail'])
    },
    methods: {
        logout() {
            window.localStorage.clear()
            this.$router.replace('login');
            this.$tore.dispatch('logout', {isAutenticated: false})
        }
    }
}
</script>
