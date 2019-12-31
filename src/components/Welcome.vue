<template>
    <div>
        <h1>Hello [add login email here], welcome! </h1>
        <p>X-Auth-Token: {{xAuthToken}}</p>
    </div>
</template>

<script>
export default {
    name: 'Welcome',
    xAuthToken: '',
    data: () => {

    },
    mounted: () => {
        alert(document.cookie)
    }


}
</script>
