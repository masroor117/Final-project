<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-overlay :value="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <!-- Text inputs for each required field on partner up page using rules for each defined at bottom and assign basic intializations(labels)-->
    <v-form ref="form" v-model="form" class="pa-4 mt-6">
      <v-text-field
        v-model="name"
        :rules="[rules.required]"
        filled
        label="Name"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        filled
        label="Email"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(8)]"
        filled
        counter="8"
        label="Password"
        type="password"
        style="min-height: 96px"
      ></v-text-field>
    </v-form>
    <!-- Error message promt in the event of any errors with firebase -->
    <v-alert v-if="errorMsg" border="top" color="red" class="ml-5 mr-5">
      {{ errorMsg }}
    </v-alert>
    <v-divider></v-divider>
    <v-card-actions>
      <!-- Buttons to sign up and also ease of access reset -->
      <v-btn text @click="$refs.form.reset()">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        color="primary"
        :loading="isLoading"
        depressed
        @click="emailAndPasswordRegister"
        >Sign Up</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
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
          .set({ name: this.name, email: this.email.toLowerCase() });
        // Picks data to store in document users above, excluding password for security concerns
        this.$store.dispatch("user/setuData", {
          id: authentication.user.uid,
          name: this.name,
          email: this.email.toLowerCase(),
          // No partner ID at register page.
          partnerId: "",
        });
        // Redirects the user to the Movies page after a sucessful registration
        this.$router.replace({ name: "Movies" });
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
