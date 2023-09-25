<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window>
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Login in to your account</h4>
                    <h6 class="text-center grey--text">
                      Log in to your account so you can continue
                    </h6>
                    <v-alert class="alert alert-danger" v-if="error">{{ error }}</v-alert>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-6"
                          v-model.trim="email"
                        ></v-text-field>
                        <div class="error" v-if="errors.email">{{ errors.email }}</div>
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          v-model.trim="password"
                        ></v-text-field>
                        <div class="error" v-if="errors.password">{{ errors.password }}</div>
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="Remeber Me"
                              class="mt-n1"
                              color="blue"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text"
                              >Forget password</span
                            >
                          </v-col>
                        </v-row>
                        <v-btn color="blue" dark block tile @click="onLogin()">Login</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="blue rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Don't Have an Account Yet?</h3>
                      <h6 class="text-center">
                        Let's get you all set up so you can start creating your
                        your first<br />
                        onboarding experience
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark :to="{name: 'Signup'}">SIGN UP</v-btn>
                    </div>
                  </div>
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
  LOGIN_ACTION,
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
    };
  },
  methods: {
    ...mapActions("auth", {
      login: LOGIN_ACTION,
    }),

    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),

    async onLogin() {
      let validations = new SignupValidations(this.email, this.password);

      this.errors = validations.checkValidations();
      if (
        this.errors &&
        ("email" in this.errors || "password" in this.errors)
      ) {
        return false;
      }
      this.error = "";
      this.showLoading(true);
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/dashboard');
      } catch (e) {
        this.error = e;
        this.showLoading(false);
      }
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
.rounded-bl-xl {
  border-bottom-left-radius: 10rem;
}
</style>