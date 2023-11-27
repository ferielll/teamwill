<template>
  <v-app id="inspire">
    <SideBar :drawer="drawer" />
    <AppBar @drawerEvent="drawer = !drawer" />
    <v-main>
      <div class="dashboard">
        <v-subheader class="d-flex justify-space-between align-center">
          <h3 style="font-weight: bold; font-size: 35px">Dashboard</h3>
          <v-btn color="success" class="rounded-lg" :to="{ name: 'Orders' }">
            View orders
          </v-btn>
        </v-subheader>
        <v-row>
          <v-col cols="12" sm="7">
            <v-alert
              type="success"
              variant="outlined"
              style="border: 2px solid #006400"
            >
              <strong style="color: #006400; display: inline"
                >{{ message }}
              </strong>
              <div style="color: #006400; display: inline">Good Morning</div>
            </v-alert>
            <br />
            <v-card elevation="4" class="rounded-lg">
              <div class="d-flex justify-space-between align-center">
                <v-card-title
                  style="font-weight: bold; font-size: 30px; color: #2f4f4f"
                  >Shipments</v-card-title
                >
                <v-btn
                  color="success"
                  class="rounded-lg btn-small"
                  :to="{ name: 'Products' }"
                >
                  View products
                </v-btn>
              </div>
              <v-row
                class="py-4"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <v-col
                  lg="5"
                  cols="12"
                  v-for="(item, index) in activities"
                  :key="index"
                >
                  <v-card elevation="4" class="rounded-lg">
                    <v-card-text
                      class="d-flex justify-space-between align-center"
                    >
                      <div>
                        <strong>{{ item.title }}</strong>
                        <br />
                        <br />
                        <div
                          style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          "
                        >
                          <v-icon :color="item.arrowColor">{{
                            item.arrow
                          }}</v-icon>
                          <h6 :style="{ color: item.arrowColor }">
                            {{ item.update }}
                          </h6>
                        </div>
                      </div>
                      <v-progress-circular
                        :color="item.color"
                        size="60"
                        :width="5"
                        :indeterminate="false"
                        :model-value="item.amounts"
                      >
                        <span>{{ item.amounts }}</span>
                      </v-progress-circular>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <br />
            <v-card elevation="4" class="rounded-lg">
              <v-card-title
                style="font-weight: bold; font-size: 30px; color: #2f4f4f"
                >Analytics</v-card-title
              >
              <div style="width: 800px">
                <canvas id="acquisitions"></canvas>
              </div>
            </v-card>
          </v-col>
          <v-col lg="5" cols="10" class="py-4">
            <v-card elevation="4" class="rounded-lg">
              <v-card-title
                style="font-weight: bold; font-size: 30px; color: #2f4f4f"
                >Tracking</v-card-title
              >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <v-progress-circular
                  size="300"
                  :width="15"
                  model-value="80"
                  color="rgb(155, 139, 139)"
                >
                  <h6 style="text-align: center; color: black">
                    Delivery<br />
                    80%
                  </h6>
                </v-progress-circular>
              </div>
              <br />
              <br />
              <v-timeline density="compact" side="end" style="max-width: 600px">
                <v-timeline-item
                  fill-dot
                  class="mb-12"
                  dot-color="orange"
                  size="large"
                >
                  <template v-slot:icon>
                    <span>JL</span>
                  </template>
                  <v-text-field
                    v-model="input"
                    hide-details
                    label="Leave a comment..."
                    density="compact"
                    @keydown.enter="comment"
                  >
                    <template v-slot:append>
                      <v-btn class="mx-0" variant="text" @click="comment">
                        Post
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-timeline-item>

                <v-slide-x-transition group>
                  <v-timeline-item
                    v-for="event in timeline"
                    :key="event.id"
                    class="mb-4"
                    dot-color="pink"
                    size="small"
                  >
                    <div class="d-flex justify-space-between flex-grow-1">
                      <div>{{ event.text }}</div>
                      <div class="flex-shrink-0">{{ event.time }}</div>
                    </div>
                  </v-timeline-item>
                </v-slide-x-transition>

                <v-timeline-item class="mb-6" hide-dot>
                  <span>TODAY</span>
                </v-timeline-item>

                <v-timeline-item class="mb-4" dot-color="grey" size="small">
                  <div class="d-flex justify-space-between flex-grow-1">
                    <div>This order was archived.</div>
                    <div class="flex-shrink-0">15:26 EDT</div>
                  </div>
                </v-timeline-item>

                <v-timeline-item class="mb-4" dot-color="primary" size="small">
                  <div class="d-flex justify-space-between flex-grow-1">
                    <div>
                      <v-chip class="ms-0" color="purple" label size="small">
                        APP
                      </v-chip>
                      Digital Downloads fulfilled 1 item.
                    </div>
                    <div class="flex-shrink-0">15:25 EDT</div>
                  </div>
                </v-timeline-item>

                <v-timeline-item class="mb-4" dot-color="grey" size="small">
                  <div class="d-flex justify-space-between flex-grow-1">
                    <div>
                      Order confirmation email was sent to John Leider
                      (john@google.com).
                    </div>
                    <div class="flex-shrink-0">15:25 EDT</div>
                  </div>
                </v-timeline-item>

                <v-timeline-item class="mb-4" hide-dot>
                  <v-btn variant="outlined"> Resend Email </v-btn>
                </v-timeline-item>

                <v-timeline-item class="mb-4" dot-color="grey" size="small">
                  <div class="d-flex justify-space-between flex-grow-1">
                    <div>
                      A $15.00 USD payment was processed on PayPal Express
                      Checkout
                    </div>
                    <div class="flex-shrink-0">15:25 EDT</div>
                  </div>
                </v-timeline-item>

                <v-timeline-item dot-color="grey" size="small">
                  <div class="d-flex justify-space-between flex-grow-1">
                    <div>
                      John Leider placed this order on Online Store (checkout
                      #1937432132572).
                    </div>
                    <div class="flex-shrink-0">15:25 EDT</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <v-row class="mt-n6">
          <v-col cols="12" sm="12">
            <v-card elevation="4" class="rounded-lg">
              <v-toolbar flat class="mt-n2">
                <v-toolbar-title style="font-weight: bold; font-size: 20px"
                  >Recent Activity</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  class="rounded-lg"
                  style="font-weight: bold"
                  :to="{ name: 'Shipments' }"
                >
                  View All
                </v-btn>
              </v-toolbar>
              <v-data-table class="grey lighten-3 py-4">
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <th :style="{ 'font-weight': 'bold' }">Product</th>
                      <th :style="{ 'font-weight': 'bold' }">Shipper</th>
                      <th :style="{ 'font-weight': 'bold' }">Status</th>
                      <th :style="{ 'font-weight': 'bold' }">Customer</th>
                      <th :style="{ 'font-weight': 'bold' }">Customer ID</th>
                    </tr>
                    <tr v-for="item in orders" :key="item.name">
                      <td :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ item.product }}
                      </td>
                      <td :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ item.shipper }}
                      </td>
                      <td :style="{ color: item.color, 'font-weight': 'bold' }">
                        {{ item.status }}
                      </td>
                      <td :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ item.customer }}
                      </td>
                      <td :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ item.customer_id }}
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
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";
export default {
  name: "Dashboard",
  components: { Chart, SideBar, AppBar },
  setup() {
    const message = ref("You are not logged in!");

    onMounted(async () => {

      const response = await fetch("localhost:8000/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      //message.value = `Hi ${content.name}`;

     
    }); 

    return {
      message,
    };
  },
  data() {
    return {
      events: [],
      input: null,
      nonce: 0,
      activities: [
        {
          title: "Total Shipment",
          color: "red-lighten-1",
          amounts: "80%",
          arrow: "mdi-arrow-up-bold",
          update: "+1.2%",
          arrowColor: "green",
        },
        {
          title: "Pickup Package",
          color: "pink-lighten-1",
          amounts: "30%",
          arrow: "mdi-arrow-up-bold",
          update: "+2.2%",
          arrowColor: "green",
        },
        {
          title: "Pending Orders",
          color: "purple-lighten-1",
          amounts: "50%",
          arrow: "mdi-arrow-down-bold",
          update: "-0.5%",
          arrowColor: "red",
        },
        {
          title: "Delivery Shipments",
          color: "indigo-lighten-1",
          amounts: "60%",
          arrow: "mdi-arrow-up-bold",
          update: "+30%",
          arrowColor: "green",
        },
      ],
      progressValue: 50,
      orders: [
        {
          product: "#29965-98",
          shipper: "JNE",
          status: "Approved",
          customer: "Courtney",
          customer_id: "AZDGY 30258",
          color: "#66CDAA",
        },
        {
          product: "#8795-487",
          shipper: "DHL",
          status: "Rejected",
          customer: "Esther",
          customer_id: "LRMOE 9867",
          color: "#f08080",
        },
        {
          product: "#8975-321",
          shipper: "RedX",
          status: "Aprroved",
          customer: "Mitchell",
          customer_id: "WCVR 89521",
          color: "#66CDAA",
        },
        {
          product: "#5461-65",
          shipper: "Amazon",
          status: "Pending",
          customer: "Debra",
          customer_id: "AZFGY 9875",
          color: "grey",
        },
      ],
    };
  },
  mounted() {
    const chart = new Chart(document.getElementById("acquisitions"), {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Last Week Overview",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  },
  computed: {
    timeline() {
      return this.events.slice().reverse();
    },
  },
  methods: {
    comment() {
      const time = new Date().toTimeString();
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(
          /:\d{2}\sGMT-\d{4}\s\((.*)\)/,
          (match, contents, offset) => {
            return ` ${contents
              .split(" ")
              .map((v) => v.charAt(0))
              .join("")}`;
          }
        ),
      });

      this.input = null;
    },
  },
};
</script>

<style scoped>
.space {
  margin-left: -100px;
  margin-right: -100px;
}
</style>

