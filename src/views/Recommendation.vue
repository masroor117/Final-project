<template>
  <v-container>
    <v-row>
      <v-col md="6" v-for="match in Recommendation" :key="match.id">
        <v-card class="mx-auto">
          <v-container>
            <v-row>
              <v-col md="8">
                <v-list-item-title class="headline mb-1">
                  {{ match.title }}
                </v-list-item-title>
                <p>
                  {{ match.overview }}
                </p>
              </v-col>
              <v-col md="4">
                <v-img :src="posterImage(match.poster_path)"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  //Intialzie functions to be called above
  methods: {
    //Collects poster image of whatever content
    posterImage(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : "";
    },
  },
  computed: {
    //Displays reommendations based on matching selections of partners from database
    Recommendation() {
      return this.$store.state.user.Recommendation;
    },
  },
};
</script>