<template>
  <v-app>
    <SideBar :drawer="drawer" />
    <AppBar @drawerEvent="drawer = !drawer" />
    <v-main>
      <div class="dashboard">
        <v-subheader class="d-flex justify-space-between align-center">
          <h3 style="font-weight: bold; font-size: 35px">Customers</h3>
          <v-btn color="black" class="rounded-lg" :to="{ name: 'Dashboard' }">
            Go Back
          </v-btn>
        </v-subheader>
        <br />
        <v-row class="mt-n6">
          <v-col cols="12" sm="12" class="d-flex justify-center align-center mt-12">
            <v-card elevation="20" class="rounded-lg" style="width: 80%;">
                <v-data-table class="grey lighten-3 py-4 py-4 ">
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <th :style="{ 'font-weight': 'bold' }">Customer</th>
                        <th :style="{ 'font-weight': 'bold' }">Num Order</th>
                      </tr>
                      <tr v-for="item in customers" :key="item.customerID">
                        <td
                          :style="{ 'font-weight': 'bold', color: '#2F4F4F' }"
                        >
                          {{ item.customerID }}
                        </td>
                        <td
                          :style="{ 'font-weight': 'bold', color: '#2F4F4F' }"
                        >
                          {{ item.num_order }}
                        </td>
                        <td>
                          <div class="text-center">
                            <v-btn
                              color="teal-lighten-3"
                              class="rounded-lg"
                              @click="dialog = true"
                            >
                              Tracking Order
                            </v-btn>

                            <v-dialog v-model="dialog" width="auto">
                              <v-card>
                                <v-timeline
                                  direction="horizontal"
                                  line-inset="12"
                                >
                                  <v-timeline-item
                                    dot-color="pink"
                                    size="small"
                                  >
                                    <div class="d-flex">
                                      <strong class="me-4">5pm</strong>
                                      <div>
                                        <strong>Bought</strong>
                                        <div class="text-caption">
                                          Monday 11/09/2023
                                        </div>
                                      </div>
                                    </div>
                                  </v-timeline-item>

                                  <v-timeline-item
                                    dot-color="teal-lighten-3"
                                    size="small"
                                  >
                                    <div class="d-flex">
                                      <strong class="me-4">4pm</strong>
                                      <div>
                                        <strong>Being Prepared</strong>
                                        <div class="text-caption mb-2">
                                          Monday 11/09/2023
                                        </div>
                                      </div>
                                    </div>
                                  </v-timeline-item>

                                  <v-timeline-item
                                    dot-color="pink"
                                    size="small"
                                  >
                                    <div class="d-flex">
                                      <div>
                                        <strong>Sent</strong>
                                      </div>
                                    </div>
                                  </v-timeline-item>

                                  <v-timeline-item
                                    dot-color="teal-lighten-3"
                                    size="small"
                                  >
                                    <div class="d-flex">
                                      <strong class="me-4">11am</strong>
                                      <div>
                                        <strong
                                          >Delivered By The Customer</strong
                                        >
                                        <div class="text-caption">
                                          Wednsday 13/09/2023
                                        </div>
                                      </div>
                                    </div>
                                  </v-timeline-item>
                                </v-timeline>
                                <v-card-actions>
                                  <v-btn
                                    color="pink"
                                    block
                                    @click="dialog = false"
                                    >Close
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>


<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
</script>

<script>
import SideBar from "@/components/SideBar.vue";
import AppBar from "@/components/AppBar.vue";
export default {
  components: { SideBar, AppBar },
  data() {
    return {
      dialog: false,
      customers: [
        {
          customerID: "AZERT 546",
          num_order: "#2999-87",
          tracking_order: "",
        },
        {
          customerID: "ERTTF 741",
          num_order: "#7854 98",
          tracking_order: "",
        },
        {
          customerID: "RTYU 79",
          num_order: "#7545 96",
          tracking_order: "",
        },
        {
          customerID: "ERTVD 98",
          num_order: "#5489 21",
          tracking_order: "",
        },
        {
          customerID: "VBNNH 21",
          num_order: "#2134 98",
          tracking_order: "",
        },
        {
          customerID: "AZER 25",
          num_order: "#2134 98",
          tracking_order: "",
        },
        {
          customerID: "UOP 00",
          num_order: "#2134 98",
          tracking_order: "",
        },
        {
          customerID: "IUYT 21",
          num_order: "#2134 98",
          tracking_order: "",
        },
        {
          customerID: "BNJH 45",
          num_order: "#2134 98",
          tracking_order: "",
        },
        {
          customerID: "XCVF 11",
          num_order: "#2134 98",
          tracking_order: "",
        },
      ],

    };
  },
};
</script>

<style scoped>
.custom-center {
  margin-left: auto;
  margin-right: auto;
}
</style>