<template>
    <div>
        <!--        make sure the form is center of page-->
        <v-layout align-center justify-center style="min-height: 80vh">
            <v-card style='max-width:500px'
                    color="transparent"
                    dark
                    :width="$vuetify.breakpoint.sm ? '60%' : '80%'">
                <v-overlay :value="isLoading">
                    <v-progress-circular
                            color="primary"
                            indeterminate
                            size="64"
                    ></v-progress-circular>
                </v-overlay>
                <v-card-text>
                    <div class="text-center text-uppercase text-h5 font-weight-bold mb-4">Partner Up</div>
                    <p class="text-center">Please type your partners email to start searching together!</p>
                    <v-form ref="form" v-model="form" class="text-center">
                        <!-- To adjust button poistion beside beside text box. -->
                        <!-- Sets up text field for email using rules Initialized below -->
                        <v-text-field
                                v-model="email"
                                :rules="[rules.email]"
                                outlined dense
                                label="Email"
                                type="email"
                        ></v-text-field>
                        <!-- Sets up button to execute methods intialized below -->
                        <v-btn
                                @click="partnersEmail"
                                :disabled="!form"
                                color="primary"
                        >Find
                        </v-btn>
                    </v-form>
                    <!-- Set up for the event of a successful email match -->
                    <v-row v-if="foundUser">
                        <v-col cols="12" class="my-4">
                            <v-card color="transparent">
                                <v-card-text>
                                    <!-- Displays users name in accordance with email typed in through database check gives another prompt to continue if correct-->
                                    <div class="subtitle-1">
                                        <span class="orange--text">Email:</span>
                                        {{ foundUser.email }}
                                    </div>
                                    <p class="subtitle-1">
                                        <span class="orange--text">Name:</span>
                                        {{ foundUser.name }}
                                    </p>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                            color="orange"
                                            @click="addPartner(foundUser.id)"
                                    >Partner Up
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                    <!-- Message prompt in the event of failure to locate users name/email -->
                    <v-row v-if="message">
                        <v-col cols="12" class="my-4">
                            <v-card color="transparent">
                                <v-card-text>
                                    <h3>{{ message }}</h3>
                                </v-card-text>

                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>

            </v-card>
        </v-layout>
        <!-- intialize and display a temporary closable notification for the user-->
        <v-snackbar
                :timeout="3000"
                :value="showToast"
                absolute
                top
                right
                :color="toastColor"
        >{{toastMessage}}
        </v-snackbar>
    </div>
</template>

<script>
    import {db} from "../main";

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
                if (!snapshot.empty) {
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
                    const authenticationID = this.$store.state.user.id;
                    await db.collection('users').doc(authenticationID).update({partnerId: id});

                    // Stores partner ID within the user data on firestore
                    this.$store.dispatch('user/setPartnerId', id);
                    // temporrary message to notify of sucessfull partnering
                    this.toastColor = 'success';
                    this.toastMessage = 'Partner Added Successfully';
                    this.showToast = true;
                    // temporrary message to notify of unsucessfull partnering
                } catch (error) {
                    this.toastColor = 'red';
                    this.toastMessage = 'An unexpected error has occurred. Please try again.';
                    this.showToast = true;
                }
            },
        },
    };
</script>