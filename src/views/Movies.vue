<template>
    <v-container>
        <!-- Basic formatting of the page -->
        <v-card :loading="isLoading"
                class="mx-auto my-12"
                max-width="800"
                tile
                :height="$vuetify.breakpoint.xs?'600px':'400px'">
            <template slot="progress">
                <v-progress-linear
                        color="primary"
                        height="10"
                        indeterminate
                ></v-progress-linear>
            </template>
            <v-card-text class="pa-3">
                <v-row>
                    <!-- Layout set up to display movies info and images -->
                    <v-col sm="5" class="pa-0 black">
                        <!--avatar provide box layout of image, contain means image background size is contain-->
                        <v-avatar tile :height="$vuetify.breakpoint.xs?'250px':'400px'" width="100%">
                            <v-img :src="mediaPoster" height="100%" width="100%" contain></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col sm="7" class="pa-sm-5 d-flex flex-column title-card">
                        <div>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-toolbar-title class="purple--text"
                                                     :v-bind="attrs"
                                                     v-on="on">
                                        {{currentMovie.title }}
                                    </v-toolbar-title>
                                </template>
                                <span>{{currentMovie.title }}</span>

                            </v-tooltip>
                            <v-card-text class="mx-card custom-scroll subtitle-2 black--text">
                                {{ currentMovie.overview }}
                            </v-card-text>
                        </div>
                        <v-spacer></v-spacer>
                        <v-divider class="my-2"></v-divider>
                        <!--Like and dislike buttons on panel and linking to functions-->
                        <v-card-actions>
                            <v-row class="d-flex justify-space-between">
                                <v-btn color="red" @click="dislikeChoice" class="ma-1" small>
                                    <v-icon>mdi-close-circle-multiple</v-icon>
                                </v-btn>
                                <v-btn color="green" @click="likeChoice" class="ma-1" small>
                                    <v-icon>mdi-heart-multiple</v-icon>
                                </v-btn>
                            </v-row>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-card-text>

        </v-card>
        <v-row>
            <!-- Credits the database used for the entertainment being shown -->
            <v-col class="text-center white--text"
            >Data from <a href="https://www.themoviedb.org/">The Movie Database</a>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {db} from "../main";
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
        created() {
            this.$store.dispatch("user/bindRecommendationRef")
            this.requestEntertainment(this.userApiPage);
        },
        methods:
            {
                //intializes method to acquire movie from database
                async requestEntertainment(page) {
                    const res = await axios.get(
                        `https://api.themoviedb.org/3/discover/movie?api_key=6800472317f51741b9b808a5af9ee6a1&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`
                    );

                    if (res.data && res.data.results.length > 0) {
                        this.movies = res.data.results;
                        this.currentMovie = this.movies[0];
                    }
                },
                //method to check if last movie on the page and change pages if completed
                async adjustChoices() {
                    if (this.currentIndex === this.duration - 1) {
                        const newPage = this.userApiPage + 1;
                        await db
                            .collection("users")
                            .doc(this.authenticationID)
                            .update({movieApiPage: newPage});

                        //Retrieves new movies from database in accordance with page number changes
                        this.$store.dispatch("user/setMovieApiPage", newPage);
                        this.requestEntertainment(newPage);
                        //set to display first movie on the new page
                        this.currentIndex = 0;
                        //For not the last movie on the page, it goes to next movie on the page
                    } else {
                        this.currentIndex++;
                        this.currentMovie = this.movies[this.currentIndex];
                    }
                },
                async likeChoice() {
                    //calls collections to store new obtained data from liking the movie
                    let userRef = db.collection("users").doc(this.authenticationID);
                    await userRef.collection("likedMovies").add({...this.currentMovie});

                    //Check to see if user has a partner
                    if (this.partnerId) {
                        //Checks if same movie has been liked by partner
                        let partnerRef = db.collection("users").doc(this.partnerId);
                        const partnerLikeddataSnippet = await partnerRef.collection("likedMovies")
                            .where("id", "==", this.currentMovie.id)
                            .get();

                        //Stores the movie selection in match collection if both have liked it.
                        if (!partnerLikeddataSnippet.empty) {
                            await userRef.collection("Recommendation").add({...this.currentMovie});
                            await partnerRef.collection("Recommendation").add({...this.currentMovie});
                        }
                    }
                    //Goes to next movie after all IDs from liking have been stored.
                    this.adjustChoices();
                },
                //Dislike results in next movie using function intialized above.
                async dislikeChoice() {
                    await this.adjustChoices();
                },
            },
        //Intializes fields with important information such as IDs, images length etc. to prevent long calls from collection/API repeatedly.
        computed: {
            duration() {
                return this.movies.length;
            },
            userApiPage() {
                return this.$store.state.user.movieApiPage;
            },
            authenticationID() {
                return this.$store.state.user.id;
            },
            partnerId() {
                return this.$store.state.user.partnerId;
            },
            mediaPoster() {
                return this.currentMovie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${this.currentMovie.poster_path}`
                    : "";
            },
        },
    };
</script>