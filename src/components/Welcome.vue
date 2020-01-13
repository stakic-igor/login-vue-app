
<template>
    <div>
        <h1>Hello {{ email }}, welcome! </h1>
    <div>
        <span @click="logout">Logout </span>
    </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Welcome',

    computed: {
        ...mapState(['email']),
    },
    mounted: {
        myFnc() {
            alert(this.email)
        }
    },
    methods: {
        logout() {
            alert('logout')
        }
        // myFnc() {
        //     alert(this.email)
        // }
    }
}
</script>
