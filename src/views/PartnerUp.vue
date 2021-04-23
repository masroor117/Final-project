<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-container>
      <v-card>
        <v-container>
          <h2>Partner Up</h2>
          <p>Please type your partners email to start searching together!</p>
          <v-row>
            <v-form ref="form" v-model="form">
              <!-- To adjust button poistion beside beside text box. -->
              <v-col class="d-inline-flex">
                <!-- Sets up text field for email using rules Initialized below -->
                <v-text-field
                  v-model="email"
                  :rules="[rules.email]"
                  filled
                  label="Email"
                  type="email"
                ></v-text-field>
                <!-- Sets up button to execute methods intialized below -->
                <v-btn
                  @click="partnersEmail"
                  :disabled="!form"
                  large
                  color="Primary"
                  class="ml-2 mt-2"
                >Find</v-btn>
              </v-col>
            </v-form>
          </v-row>
          <!-- Set up for the event of a successful email match -->
          <v-row v-if="foundUser">
            <v-col class="d-inline-flex">
              <v-card>
                <v-card-text>
                  <!-- Displays users name in accordance with email typed in through database check gives another prompt to continue if correct-->
                  <div>{{ foundUser.email }}</div>
                  <p class="display-1 text-primary">
                    {{ foundUser.name }}
                  </p>
                  <div class="text-primary">
                    If the name displayed is correct please Partner Up.
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    @click="addPartner(foundUser.id)"
                  >Partner Up</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- Message prompt in the event of failure to locate users name/email -->
          <v-row v-if="message">
            <v-col>
              <h3>{{ message }}</h3>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <!-- intialize and display a temporary closable notification for the user-->
      <v-snackbar
        :timeout="3000"
        :value="showToast"
        absolute
        bottom
        right
        :color="toastColor"
      >{{toastMessage}}</v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { db } from "../main";
export default {
  data: () => ({
    form: false,
    isLoading: false,
    showToast: false,
    toastColor: "",
    toastMessage: "",
    email: "",
    foundUser: null,
    message: "",
    rules: {
      // Email checks rule for validity using atleast an @ sign in the entry
      email: (v) => !!(v || "").match(/@/) || "Please enter a valid email.",
    },
  }),
  methods: {
    async partnersEmail() {
      // resets the field and empties it for each refreshed usage
      this.isLoading = true;
      this.message = "";
      this.foundUser = null;

      const snapshot = await db
        // refrences the user collection for data entries
        .collection("users")
        // searches for matching emails without case sensitivity
        .where("email", "==", this.email.toLowerCase())
        // open ended retrieval to be specified per request where it is being used
        .get();
        // in the event of a successful email match
        if(!snapshot.empty) {
            const userId = snapshot.docs[0].id;
            const uData = snapshot.docs[0].data();

            //spread operator to pass all relevant data
            this.foundUser = {
                id: userId,
                ...uData
            }
        // error message for unsucessful match
        } else {
            this.message = 'No user with that email found.'
        }
        this.isLoading = false;
    },
    async addPartner(id) {
      try {
          // retrieves the ID of the user currently logged in
          const authUserId = this.$store.state.user.id;
          await db.collection('users').doc(authUserId).update({partnerId: id});

          // Stores partner ID within the user data on firestore
          this.$store.dispatch('user/setPartnerId', id);
          // temporrary message to notify of sucessfull partnering
          this.toastColor= 'success';
          this.toastMessage = 'Partner Added Successfully';
          this.showToast = true;
        // temporrary message to notify of unsucessfull partnering
      } catch (error) {
          this.toastColor= 'red';
          this.toastMessage = 'An unexpected error has occurred. Please try again.';
          this.showToast = true;
      }
    },
  },
};
</script>