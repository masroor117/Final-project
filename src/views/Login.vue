<template>
    <div>
        <!--        make sure the form is center of page-->
        <v-layout align-center justify-center style="min-height: 80vh">

            <!--            dynamic width of v-card. if sm and up device then 60% else 80% -->
            <v-card style='max-width:500px' color="transparent" dark elevation="0"
                    :width="$vuetify.breakpoint.sm ? '60%' : '80%'">
                <v-overlay :value="isLoading">
                    <v-progress-circular
                            color="primary"
                            indeterminate
                            size="64"
                    ></v-progress-circular>
                </v-overlay>
                <div class="text-center text-uppercase text-h5">Login</div>
                <!-- Text inputs for each required field on signing in page using the rule for only required filling(can not be blank) -->
                <v-form ref="form" v-model="form" class="pa-4 mt-6">
                    <label>Email</label>
                    <v-text-field
                            v-model="email"
                            :rules="[rules.required]"
                            type="email"
                            outlined
                            dense
                    ></v-text-field>
                    <label>Password</label>
                    <v-text-field
                            v-model="password"
                            :rules="[rules.required]"
                            counter="8"
                            outlined
                            type="password"
                            dense
                    ></v-text-field>
                </v-form>
                <!-- Error message promt in the event of any errors with firebase -->
                <v-alert v-if="errorMsg" border="top" color="red" class="ml-5 mr-5" dismissible dense>
                    {{ errorMsg }}
                </v-alert>
                <v-divider></v-divider>
                <v-card-actions>
                    <!-- Buttons to register and log in at bottom of form -->
                    <v-btn outlined @click="GoRegister">Register</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            :disabled="!form"
                            dark
                            color="primary darken-4"
                            :loading="isLoading"
                            @click="emailAndPasswordLogIn"
                    >Log In
                    </v-btn
                    >
                </v-card-actions>
            </v-card>

        </v-layout>

    </div>

</template>

<script>
    import firebase from 'firebase';
    import {db} from '../main'

    export default {
        data: () =>
            ({
                email: '',
                password: '',
                errorMsg: '',
                form: false,
                isLoading: false,
                // Initializes a set of rules used in each entry field for text boxes
                rules:
                    {
                        required: v => !!v || 'This field is required'
                    }
            }),
        methods:
            {
                // async is due to authentication being set on await
                async emailAndPasswordLogIn() {
                    try {
                        this.isLoading = true;
                        this.errorMsg = '';
                        // Signing in and awaiting the fields email and password
                        const authentication = await firebase.auth().signInWithEmailAndPassword(this.email.toLowerCase(), this.password);
                        // Getting user date from data collection
                        const userCollect = await db.collection('users').doc(authentication.user.uid).get();
                        const uData = userCollect.data();
                        this.$store.dispatch('user/setuData',
                            {
                                //Stores data in vuex store for use on functionality
                                id: userCollect.id,
                                name: uData.name,
                                email: uData.email,
                                partnerId: uData.partnerId || '',
                                movieApiPage: uData.movieApiPage || 1
                            });
                        // Redirects the user to the Movies page after a sucessful registration
                        this.$router.replace({name: "home"});
                    } catch (error) {
                        // Error catch with a message assigned in the event of unexpected issue with firebase authentication .
                        this.errorMsg = 'Oops! Something went wrong please try again';
                        if (error.message) {
                            this.errorMsg = error.message
                        }
                    }
                    this.isLoading = false;
                },
                //Method route to register page and ensuring no logged in data.
                async GoRegister() {
                    await firebase.auth().signOut();
                    this.$router.replace("/register");
                },
            },
    };
</script>
