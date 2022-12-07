<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-btn to="/" text>Vintage Electronics</v-btn>
      <v-divider
          class="ml-1 mr-1"
          vertical
      ></v-divider>
      <v-btn :to="{ name: 'About'}" text>About Us</v-btn>
      <v-btn :to="{ name: 'Collection'}" text>Collection</v-btn>
      <v-btn v-if="isAuthenticated" :to="{ name: 'UserPage' }" text>Personal Collection</v-btn>
      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated">
        <v-btn :to="{ name: 'Login' }" text>Login</v-btn>
        <v-btn :to="{ name: 'Register' }" text>Register</v-btn>
      </div>

      <div v-else>
<!--        <v-btn :to="{ name: 'Dashboard' }">Dashboard</v-btn>-->
        <v-btn @click="logout" text>Logout</v-btn>
      </div>
    </v-app-bar>
    <v-main>
        <v-container>
          <router-view/>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',

  data: () => ({
    //
  }),

  computed: {
    ...mapState(['isAuthenticated'])
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
};
</script>
