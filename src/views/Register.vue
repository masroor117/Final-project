<template>
    <div>
         <!--        make sure the form is center of page-->
        <v-layout align-center justify-center style="min-height: 80vh">
            <v-card style='max-width:500px' color="transparent" dark elevation="0"
                    :width="$vuetify.breakpoint.sm ? '60%' : '80%'">
                <v-overlay :value="isLoading">
                    <v-progress-circular
                            color="primary"
                            indeterminate
                            size="64"
                    ></v-progress-circular>
                </v-overlay>
                <div class="text-center text-uppercase text-h5">Sign Up</div>
                <!-- Text inputs for each required field on signing in page using the rule for only required filling(can not be blank) -->
                <v-form ref="form" v-model="form" class="pa-4 mt-6">
                    <label>Name</label>
                    <v-text-field
                            v-model="name"
                            :rules="[rules.required]"
                            outlined dense
                    ></v-text-field>
                    <label>Email</label>
                    <v-text-field
                            v-model="email"
                            :rules="[rules.email]"
                            outlined dense
                            type="email"
                    ></v-text-field>
                    <label>Password</label>
                    <v-text-field
                            v-model="password"
                            :rules="[rules.password, rules.length(8)]"
                            outlined dense
                            counter="8"
                            type="password"
                    ></v-text-field>
                </v-form>
                <!-- Error message promt in the event of any errors with firebase -->
                <v-alert v-if="errorMsg" border="top" color="red" class="ml-5 mr-5" dismissible dense>
                    {{ errorMsg }}
                </v-alert>
                <v-divider></v-divider>
                <v-card-actions>
                    <!-- Buttons to register and log in at bottom of form -->
                    <v-btn outlined @click="$refs.form.reset()">Clear</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            :disabled="!form"
                            dark
                            color="primary darken-4"
                            :loading="isLoading"
                            @click="emailAndPasswordRegister"
                    >Sign Up
                    </v-btn
                    >
                </v-card-actions>
                <div class="text-center subtitle-2 my-5">Have an account?
                    <router-link :to="{name:'Login'}" class="ml-2">Login</router-link>
                </div>
            </v-card>


        </v-layout>

    </div>
</template>

<script>
    import firebase from "firebase";
    import {db} from "../main";

    export default {
        data: () => ({
            name: "",
            email: "",
            password: "",
            errorMsg: "",
            form: false,
            isLoading: false,
            // Initializes a set of rules used in each entry field for text boxes
            rules: {
                // Email checks rule for validity using atleast an @ sign in the entry
                email: (v) =>
                    !!(v || "").match(/@/) || "Email is invalid, Please try again",
                // Password size checks rule for minimum length
                length: (len) => (v) =>
                    (v || "").length >= len ||
                    "Enter a password of atleast ${len} length, Please try again",
                //Pasword complexity checks rule for using a common regex for passwords
                password: (v) =>
                    !!(v || "").match(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
                    ) ||
                    "Password requires a lowercase, uppercase, number and special character, Please try again",
                // Required field check rule for any fields that can not be left blank.
                required: (v) => !!v || "This field is required",
            },
        }),
        methods: {
            // async is due to authentication being set on await
            async emailAndPasswordRegister() {
                this.isLoading = true;
                try {
                    // lowercase to prevent any inconvenience with case sensitivity
                    let authentication = await firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            this.email.toLowerCase(),
                            this.password
                        );
                    // Seperate user collection to store additional data for modfications outside of firebase collection
                    await db
                        .collection("users")
                        .doc(authentication.user.uid)
                        .set({name: this.name, email: this.email.toLowerCase()});
                    // Picks data to store in document users above, excluding password for security concerns
                    this.$store.dispatch("user/setuData", {
                        id: authentication.user.uid,
                        name: this.name,
                        email: this.email.toLowerCase(),
                        // No partner ID at register page.
                        partnerId: "",
                    });
                    // Redirects the user to the Movies page after a sucessful registration
                    this.$router.replace({name: "Movies"});
                } catch (error) {
                    // Error message assigned in the event of unexpected issue with firebase authentication .
                    this.errorMsg = "Oops! Something went wrong please try again";
                    if (error.message) {
                        this.errorMsg = error.message;
                    }
                }
                this.isLoading = false;
            },
        },
    };
</script>
