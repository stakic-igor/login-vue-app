
<template>
    <div>
        <h1>Hello {{ email }}, welcome! </h1>
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
        // myFnc() {
        //     alert(this.email)
        // }
    }
}
</script>
