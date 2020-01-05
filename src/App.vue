<template>
    <v-app>
        <router-view></router-view>
        <v-content>
        </v-content>
    </v-app>
</template>

<script>

export default {

    name: 'App',

methods: {
      submit(value) {
          alert(value) // someValue
      }
  }
};
</script>
