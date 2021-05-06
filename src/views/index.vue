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
                        Our simple mission is to help people relax and enjoy when it comes to the place, they should be doing to 
                        do so. As time goes by and the amount of on demand entertainment increases it is only natural that deciding 
                        on one becomes harder specially with others. That is where we come in and help people find what they
                        like in their own times so when the time comes to relax and unwind together there is no time wasted picking and
                        deciding between each other instead only entertainment waiting for you to enjoy.
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
                                First step in your journey to entertainment guidance is registering and logging in,
                                this helps us make it simpler for you to find each other and what you want. Once you
                                have logged in a range of new tabs will be available for you to use and get the most
                                out of our services.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-card>
                            <v-card-title>Find your partner:</v-card-title>
                            <v-card-text>
                                Once you have logged in the first step is going to be finding your partner you want
                                to find entertainment matches with. Click on the newly visible partner up tab on the
                                navigation bar and find your partner using their log in email. You will be given a 
                                prompt to check if that is who you are looking for and once you find your partner the 
                                fun starts.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-card>
                            <v-card-title>Choices & Recommendation:</v-card-title>
                            <v-card-text>
                                With everything else done now both users have to simply go on Movies or TV Shows tabs
                                depending on what they want to find to watch. Whenever they are free, they can look
                                through to like and dislike any entertainment to their own tastes and opinions in 
                                their own times. Any matching options picked between the two will show up under the
                                Recommendations tab and get stored there ready for users to enjoy and relax to.
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