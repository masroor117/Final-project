<template>
    <div>
        <!--app bar with no shadow and transparent with good padding in lg media-->
        <v-app-bar app dark color="transparent" elevation="0" class="px-lg-12" height="56px">
            <!--menu icon for the sidebar-->
            <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                    class="d-md-none"
                    v-if="userId"
            ></v-app-bar-nav-icon>
            <!--Nav title-->
            <div class="d-flex align-center">
                <div class="text-md-h4 text-h5">Entertainment Chief</div>
                <div class="mx-2">
                    <img src="../assets/3d-glasses.png" :height="$vuetify.breakpoint.xs?'30px':'40px'"/>
                </div>
            </div>
            <v-spacer></v-spacer>
            <!--nav link by make loop from data-->
            <div class="d-md-block d-none" v-if="userId">
                <v-btn :to="{name:link.name}" v-for="link in links" :key="link.name" text small
                       active-class="black --text">
                    {{link.label}}
                </v-btn>
            </div>
            <!--            the logout button-->
            <v-btn v-if="userId" @click="logoutUser" icon title="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>

            <!--            login and register button if user not logged-->
            <v-btn v-if="!userId" :to="{name:'Login'}" text small active-class="white--text">
                login
            </v-btn>
            <v-btn v-if="!userId" :to="{name:'Register'}" text small active-class="white--text">
                register
            </v-btn>
        </v-app-bar>

        <!--        this is the sidebar-->
        <v-navigation-drawer v-model="drawer" fixed>
            <v-list nav dense>
                <v-list-item-group active-class="primary white--text">
                    <v-list-item :to="{name:link.name}" v-for="link in links" :key="link.name">
                        <v-list-item-title>{{link.label}}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        //assign labels for each tabs in presentable format.
        data: () => ({
            drawer: false,
            links: [
                {label: 'Home', name: 'home'},
                {label: 'Movies', name: 'Movies'},
                {label: 'TV shows', name: 'TVShows'},
                {label: 'Recommendation', name: 'Recommendation'},
                {label: 'Partner Up', name: 'PartnerUp'},
                {label: 'FAQ', name: 'FAQ'},
            ]
        }),
        // Log out function to be attached to a button
        methods: {
            async logoutUser() {
                await firebase.auth().signOut();
                this.$store.dispatch("user/clearuData");
                this.$router.replace("/login");
            },
        },
        computed: {
            userId() {
                return this.$store.state.user.id;
            },
        },
    };
</script>