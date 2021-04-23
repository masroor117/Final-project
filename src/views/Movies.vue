<template>
  <div class="Movies">
    <v-card :loading="isLoading" class="mx-auto my-12" max-width="600">
      <template slot="progress">
        <v-progress-linear
          color="primary"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-row>
        <!-- Layout set up to display movies info and images -->
        <v-col md="6"><v-img :src="movieImage"></v-img></v-col>
        <v-col md="6" class="mt-5">
          <v-card-title>{{ currentMovie.title }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div>{{ currentMovie.overview }}</div>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="d-flex justify-space-around">
              <v-btn color="green" @click="thumbsUp">
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn color="red" @click="thumbsDown">
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col class="text-center"
        >Powered by <a href="https://www.themoviedb.org/">The Movie Database</a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from "../main";
import axios from "axios";
export default {
  name: "Movies",
  //intialize a set of data properties
  data: () => ({
    isLoading: false,
    //Holders for movies captured from the database and current displayed one.
    movies: [],
    currentMovie: {},
    //Used to track which movie application is on
    currentIndex: 0,
  }),
  //Calls Api when the page loads
  created()
  {
    this.$store.dispatch("user/bindRecommendationRef")
    this.fetchMovies(this.userMovieApiPage);
  },
  methods:
  {
    //intializes method to arruire movie from database
    async fetchMovies(page)
    {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=6800472317f51741b9b808a5af9ee6a1&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`
      );

      if (res.data && res.data.results.length > 0)
      {
        this.movies = res.data.results;
        this.currentMovie = this.movies[0];
      }
    },
    //method to check if last movie on the page and change pages if completed
    async incrementCurrentIndex() 
    {
      if (this.currentIndex === this.movieResultsLength - 1)
      {
        const newPage = this.userMovieApiPage + 1;
        await db
          .collection("users")
          .doc(this.authUserId)
          .update({ movieApiPage: newPage });

        //Retrieves new movies from database in accordance with page number changes
        this.$store.dispatch("user/setMovieApiPage", newPage);
        this.fetchMovies(newPage);
        //set to display first movie on the new page
        this.currentIndex = 0;
        //For not the last movie on the page, it goes to next movie on the page
      } else 
      {
        this.currentIndex++;
        this.currentMovie = this.movies[this.currentIndex];
      }
    },
    async thumbsUp()
    {
      //calls collections to store new obtained data from liking the movie
      let userRef = db.collection("users").doc(this.authUserId);
      await userRef.collection("likedMovies").add({ ...this.currentMovie });

      //Check to see if user has a partner
      if (this.partnerId)
      {
        //Checks if same movie has been liked by partner
        let partnerRef = db.collection("users").doc(this.partnerId);
        const partnerLikedSnapshot = await partnerRef.collection("likedMovies")
          .where("id", "==", this.currentMovie.id)
          .get();

        //Stores the movie selection in match collection if both have liked it.
        if (!partnerLikedSnapshot.empty)
        {
          await userRef.collection("Recommendation").add({ ...this.currentMovie });
          await partnerRef.collection("Recommendation").add({ ...this.currentMovie });
        }
      }
      //Goes to next movie after all IDs from liking have been stored.
      this.incrementCurrentIndex();
    },
    //Dislike results in next movie using function intialized above.
    async thumbsDown() {
      await this.incrementCurrentIndex();
    },
  },
  //Intializes fields with important information such as IDs, images length etc. to prevent long calls from collection/API repeatedly.
  computed: {
    movieResultsLength()
    {
      return this.movies.length;
    },
    userMovieApiPage()
    {
      return this.$store.state.user.movieApiPage;
    },
    authUserId()
    {
      return this.$store.state.user.id;
    },
    partnerId()
    {
      return this.$store.state.user.partnerId;
    },
    movieImage()
    {
      return this.currentMovie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${this.currentMovie.poster_path}`
        : "";
    },
  },
};
</script>