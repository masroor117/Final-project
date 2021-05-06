<template>
    <v-app>
        <!--        background image of all page-->
        <div class="background" :style="{backgroundImage:'url('+require('./assets/Cinema.jpg')+')'}">
        </div>
        <!--        nav bar with dynamic class appBarbg. if scroll down then change nav color-->
        <AppBar :class="appBarBg"/>
        <v-main id="main">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    import AppBar from "./components/NavTab";

    export default {
        name: "App",

        components: {
            AppBar,
        },

        data: () => ({
            appBarBg: ''
        }),
        mounted() {
            // on scroll do a method
            window.addEventListener('scroll', this.appScroll);
        },
        methods: {
            appScroll() {
                // if scrolling 10px down add c-bar class to nav bar
                if (window.scrollY > 10) {
                    this.appBarBg = 'c-bar'
                } else {
                    this.appBarBg = ''
                }
            },
        },
    };
</script>

