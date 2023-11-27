<template>
  <v-app id="inspire">
    <SideBar :drawer="drawer" />
    <AppBar @drawerEvent="drawer = !drawer" />
    <v-main>
      <div class="dashboard">
        <v-subheader class="d-flex justify-space-between align-center">
          <h3 style="font-weight: bold; font-size: 35px">Shipments</h3>
          <v-btn color="black" class="rounded-lg" :to="{ name: 'Dashboard' }">
            Go Back
          </v-btn>
        </v-subheader>
        <v-row>
          <v-col cols="12" sm="4">
            <v-card elevation="4" class="rounded-lg">
              <v-card-title
                style="font-weight: bold; font-size: 30px; color: #2f4f4f"
                >Analytics</v-card-title
              >
              <div style="width: 500px">
                <canvas id="acquisitions"></canvas>
              </div>
            </v-card>
          </v-col>
          <v-col lg="8" cols="10" class="py-4">
            <v-card elevation="4" class="rounded-lg">
              <v-card-title
                style="font-weight: bold; font-size: 30px; color: #2f4f4f"
                >Shippers</v-card-title
              >
              <div  style="width: 100%">
                <canvas id="acquisition"></canvas>
              </div>
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
                  :to="{ name: 'Customers' }"
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
export default {
  components: { Chart, SideBar, AppBar },
  data() {
    return {
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
          product: "#7854-25",
          shipper: "Amazon",
          status: "Pending",
          customer: "Aria",
          customer_id: "ZERFT 7845",
          color: "grey",
        },
        {
          product: "#74123-96",
          shipper: "RedX",
          status: "Approved",
          customer: "John",
          customer_id: "TREC 5412",
          color: "#66CDAA",
        },
        {
          product: "#1111-87",
          shipper: "DHL",
          status: "Rejected",
          customer: "Nina",
          customer_id: "AZFGY 0000",
          color: "#66CDAA",
        },
        {
          product: "#5461-65",
          shipper: "Amazon",
          status: "Approved",
          customer: "Debra",
          customer_id: "AZFGY 9875",
          color: "#66CDAA",
        },
        {
          product: "#5461-65",
          shipper: "Amazon",
          status: "Approved",
          customer: "Debra",
          customer_id: "AZFGY 9875",
          color: "#66CDAA",
        },
        {
          product: "#5461-65",
          shipper: "Amazon",
          status: "Approved",
          customer: "Debra",
          customer_id: "AZFGY 9875",
          color: "#66CDAA",
        },
        {
          product: "#5461-65",
          shipper: "Amazon",
          status: "Approved",
          customer: "Debra",
          customer_id: "AZFGY 9875",
          color: "#66CDAA",
        },
      ],
    };
  },
  mounted() {
    const chart = new Chart(document.getElementById("acquisitions"), {
      type: "doughnut",
      data: {
        labels: ["Approved", "Rejected", "Pending"],
        datasets: [
          {
            label: "Shipments Overview",
            data: [300, 100, 50],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 1,
          },
        ],
      },
    });
    const chart2 = new Chart(document.getElementById("acquisition"), {
       type: "bar",
      data: {
        labels: ["JNE", "DHL", "RedX", "Amazon"],
        datasets: [
          {
            label: "Shipper Productivty",
            data: [10, 40, 60, 90],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  },
};
</script>

<style scoped>
</style>