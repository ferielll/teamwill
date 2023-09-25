<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="blue rounded-br-xl">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Alredy Signed up?</h3>
                      <h6 class="text-center">
                        Log in to your account so you can continue
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark :to="{name: 'Login'}">Log in</v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Sign Up for an Account</h4>
                    <h6 class="text-center grey--text">
                      Let's get you all set up so you can start creating your
                      <br />
                      first onboarding experience
                    </h6>
                    <v-alert class="alert alert-danger" v-if="error">{{ error }}</v-alert>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="First Name"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              class="mt-4"
                              required
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="Last Name"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              class="mt-4"
                              required
                            />
                          </v-col>
                        </v-row>
                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="email"
                        />
                        <div class="error" v-if="errors.email">{{ errors.email }}</div>
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          v-model="password"
                        />
                        <div class="error" v-if="errors.password">{{ errors.password }}</div>
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="I Accept AAE"
                              class="mt-n1"
                              color="blue"
                            required >
                            </v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text ml-n4"
                              >Terms & Conditions</span
                            >
                          </v-col>
                        </v-row>
                        <v-btn color="blue" dark block tile @click="onSignup()">Sign up</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  LOADING_SPINNER_SHOW_MUTATION,
  SIGNUP_ACTION,
} from "@/store/storeconstants";
import { mapActions, mapMutations } from "vuex";
import SignupValidations from "../services/SignupValidations";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      error: "",
      firstName: "",
      lastName:"",
    };
  },
  methods: {
    ...mapActions("auth", {
      signup: SIGNUP_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onSignup() {
      let validations = new SignupValidations(this.email, this.password);

      this.errors = validations.checkValidations();
      if (
        this.errors &&
        ("email" in this.errors || "password" in this.errors)
      ) {
        return false;
      }
      this.error = "";
      //make spinner true
      this.showLoading(true);
      try {
        const userCredential = await this.signup({ email: this.email, password: this.password });
        console.log("user credentials: ", userCredential)
          if (userCredential) {
      const user = userCredential.user;
      const userInfo = {
        firstName: this.firstName,
        lastName: this.lastName,
      };

      await addDoc(collection(db, 'users'), {
        userId: user.uid,
        ...userInfo,
      });

      this.$router.push('/dashboard');
    } else {
      console.error('User registration failed.');
    }
      } catch (e) {
        this.error = e;
        this.showLoading(false);
      }
      //make spinner false
      this.showLoading(false);
    },
  },
};
</script>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
.blue {
  background-color: #187dc0;
}
.rounded-br-xl {
  border-bottom-left-radius: 10rem;
}
</style>