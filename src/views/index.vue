<template>
    <!--home page-->
    <div>
        <!--Intro banner of home page-->
        <v-container style="height: 60vh" class="d-flex">
            <div class="ma-auto">
                <div class="text-md-h3 text-h4 text-center white--text">The Decisions Made For You</div>
                <!--social links-->
                <div class="text-center my-7">
                    <v-btn icon dark class="ma-1 orange" href="https://www.facebook.com/Entertainment-Chief-106364384947649?checkpoint_src=any">
                        <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn icon dark class="ma-1 orange" href="https://www.instagram.com/entertainment_chief/">
                        <v-icon >mdi-instagram</v-icon>
                    </v-btn>
                    <v-btn icon dark class="ma-1 orange" href="https://twitter.com/Enterta84568736">
                        <v-icon >mdi-twitter</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-container>

        <!--middle part of home page-->
        <div class="white">
            <v-container class="d-flex py-12">
                <div class="ma-auto">
                    <div class="text-md-h3 text-h4 text-center">Who are we?</div>
                    <div class="text-center my-7">
                        Our simple mission is to help people achieve an effortless and relaxing entertainment experience together with whomever they choose. 
                        As time goes by and the amount of on demand entertainment increases every month it is only natural that the decision process
                        becomes more time consuming with it. That is where we come in and help users find what they
                        like in their own time so when they want to relax and unwind together the moment is not wasted in the
                        decision process between one anothers prefrences. Instead of struggles, there is only the wide range of options for all to enjoy
                        at your disposal waiting in our 'Recommendation' page.
                    </div>
                </div>
            </v-container>
        </div>

        <!--Home bottom of page instruction boxes split into 3 cards and titles-->
        <v-container class="d-flex py-12">
            <div class="ma-auto">
                <div class="text-md-h3 text-h4 text-center white--text mb-7">How it works?</div>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-card>
                            <v-card-title>Register & Log In:</v-card-title>
                            <v-card-text>
                                First step in your journey to entertainment guidance is registering and logging in
                                this helps make it simpler for you to find each other and partner up on our application. Once you
                                have logged in a range of new tabs will be available for you to use and get the most
                                out of our services.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-card>
                            <v-card-title>Find your partner:</v-card-title>
                            <v-card-text>
                                Once you have logged in the next step is going to be finding the partner you want
                                to get entertainment matches along side. Click on the newly visible partner up tab on the
                                navigation bar and find your partner using their log in email. You will be given a 
                                prompt to check if that is who you are searching for and once you confirm the user that is 
                                when the fun starts.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-card>
                            <v-card-title>Choices & Recommendation:</v-card-title>
                            <v-card-text>
                                With everything else completed now both users have to simply go on 'Movies' or 'TV Shows' tabs
                                depending on what type of entertainment they want to watch. Users can look
                                through options to like and dislike any entertainment to their own prefrences in 
                                their own times. Any matching options picked between the two will show up under the
                                'Recommendation' tab and be displayed there ready for users to enjoy and relax to whenever they want.
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>