<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="userId"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <h2>Entertainment Chief</h2>
      </div>
      <v-spacer></v-spacer>
      <v-btn v-if="userId" @click="logoutUser" text>Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group active-class="primary">
          <v-list-item to="/Movies">
            <v-list-item-title>Movies</v-list-item-title>
          </v-list-item>
          <v-list-item to="/TVShows">
            <v-list-item-title>TV shows</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Recommendation">
            <v-list-item-title>Recommendation</v-list-item-title>
          </v-list-item>
          <v-list-item to="/partnerup">
            <v-list-item-title>Partner Up</v-list-item-title>
          </v-list-item>
          <v-list-item to="/FAQ">
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    async logoutUser() {
      await firebase.auth().signOut();
      this.$store.dispatch("user/clearuData");
      this.$router.replace("/");
    },
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },
};
</script>