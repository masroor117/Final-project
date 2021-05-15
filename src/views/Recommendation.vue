<template>
    <v-container>
        <v-row>
            <!-- Organizes the dimensions for content display  -->
            <v-col sm="6" v-for="match in Recommendation" :key="match.id">
                <v-card
                        class="mx-auto"
                        max-width="600"
                        tile
                        :height="$vuetify.breakpoint.xs?'550px':'320px'">
                    <template slot="progress">
                        <v-progress-linear
                                color="primary"
                                height="10"
                                indeterminate
                        ></v-progress-linear>
                    </template>
                    <v-card-text class="pa-3">
                        <v-row>
                            <!-- Layout set up to display movies info and images to fit perfevtly-->
                            <v-col sm="5" cols="12" class="black pa-0">
                                <v-avatar tile :height="$vuetify.breakpoint.xs?'250px':'320px'" width="100%">
                                    <v-img :src="posterImage(match.poster_path)" height="100%" width="100%"
                                           contain></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col sm="7" cols="12" class="pa-md-5 d-flex flex-column title-card-2">
                                <div>
                                    <!-- title will be in one line. so for full text show a tooltip-->
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-toolbar-title class="purple--text"
                                                             :v-bind="attrs"
                                                             v-on="on">
                                                 <!-- Both title and name as one is for movies the other for TV shows -->
                                                {{match.title}} {{match.name}}
                                            </v-toolbar-title>
                                        </template>
                                        <!-- in addition displays following on hover -->
                                        <span>{{match.name}} {{match.title}}</span>

                                    </v-tooltip>
                                    <!-- info-->
                                    <v-card-text class="mx-card-2 custom-scroll subtitle-2 black--text">
                                        {{ match.overview }}
                                    </v-card-text>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>

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
            //Function to call user data of recommendation to shorten code
            Recommendation() {
                return this.$store.state.user.Recommendation;
            },
        },
    };
</script>