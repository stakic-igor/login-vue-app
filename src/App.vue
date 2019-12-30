<template>
  <v-app>
    <v-content>
      <!-- <HelloWorld/> -->
      <Login />
      <Welcome />
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Login from './components/Login';
import Welcome from './components/Welcome';

export default {
  name: 'App',

  components: {
    //HelloWorld,
    Login,
    Welcome
  },

  data: () => ({
    //
  }),
};
</script>
