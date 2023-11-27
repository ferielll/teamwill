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
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                            <v-text-field
                              label="Name"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              class="mt-4"
                              v-model="data.name"
                            />
                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="data.email"
                        />
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          v-model="data.password"
                        />
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
                        <v-btn color="blue" dark block tile @click="submit()">Sign up</v-btn>
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

<script lang="ts">
import {reactive} from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "Register",
  setup() {
    const data = reactive({
      name: '',
      email: '',
      password: ''
    });
const router = useRouter();
    const submit = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Process the response as needed
  } catch (error) {
    console.error('Fetch error:', error);
  }
  await router.push('/')
};


    return {
      data,
      submit
    }
    
  },
}
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