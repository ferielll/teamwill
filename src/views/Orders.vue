<template>
  <v-app id="inspire">
    <SideBar :drawer="drawer" />
    <AppBar @drawerEvent="drawer = !drawer" />
    <v-main>
      <div class="dashboard">
        <v-subheader class="d-flex justify-space-between align-center">
          <h3 style="font-weight: bold; font-size: 35px">Orders</h3>
          <v-btn color="black" class="rounded-lg" :to="{ name: 'Dashboard' }">
            Go Back
          </v-btn>
        </v-subheader>
        <v-col cols="6" sm="12">
          <v-card elevation="4" class="rounded-lg">
            <v-card-title
              style="font-weight: bold; font-size: 30px; color: #2f4f4f"
              >Analytics</v-card-title
            >
            <div style="width: 100%">
              <canvas id="acquisitions" style="width: 100%"></canvas>
            </div>
          </v-card>
        </v-col>
        <br />
        <v-row class="mt-n6">
          <v-col cols="6" sm="12">
            <v-card elevation="4" class="rounded-lg">
              <v-data-table class="grey lighten-3 py-4">
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <th :style="{ 'font-weight': 'bold' }">Num Order</th>
                      <th :style="{ 'font-weight': 'bold' }">Customer ID</th>
                      <th></th>
                    </tr>
                    <tr v-for="order in result" :key="order._id">
                      <td :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ order.order }}
                      </td>
                      <td :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ order.customerID }}
                      </td>
                      <td>
                        <v-row justify="space-around">
                          <v-col cols="12" lg="12">
                            <v-dialog
                              transition="dialog-bottom-transition"
                              width="40%"
                              rounded
                            >
                              <template v-slot:activator="{ props }">
                                <v-btn
                                  color="rgb(75, 192, 192)"
                                  class="rounded-lg"
                                  v-bind="props"
                                >
                                  View Details
                                </v-btn>
                              </template>
                              <template v-slot:default="">
                                <v-card>
                                  <v-toolbar color="rgb(75, 192, 192)">
                                    <v-toolbar-title style="font-weight: bold"
                                      >Orders Details</v-toolbar-title
                                    >
                                  </v-toolbar>
                                  <v-list lines="two" subheader>
                                    <v-list-item
                                      title="Num Order"
                                      :subtitle="order.order"
                                    ></v-list-item>
                                    <v-list-item
                                      title="Customer ID"
                                      :subtitle="order.customerID"
                                    ></v-list-item>
                                    <v-list-item @click="showDialog = true">
                                      <div style="text-align: center">
                                        <img
                                          :src="`http://localhost:8000/static/`+order.product.image"
                                          alt="Image"
                                          style="
                                            width: 200px;
                                            height: auto;
                                            display: block;
                                            margin: 0 auto;
                                          "
                                        />
                                      </div>
                                    </v-list-item>
                                    <!-- product dialog -->
                                    <v-dialog
                                      v-model="showDialog"
                                      max-width="500px"
                                    >
                                      <v-card>
                                        <v-card-title
                                          >Product Detail</v-card-title
                                        >
                                        <v-card-text>
                                          <div style="text-align: center">
                                            <img
                                              :src="`http://localhost:8000/static/`+order.product.image"
                                              alt="Image"
                                              style="
                                                width: 200px;
                                                height: auto;
                                                display: block;
                                                margin: 0 auto;
                                              "
                                            />
                                          </div>
                                        </v-card-text>
                                        <v-list lines="two" subheader>
                                          <v-list-item
                                            title="Product ID"
                                            :subtitle="order.product.id"
                                          ></v-list-item>
                                          <v-list-item
                                            title="Quantity"
                                            :subtitle="order.product.quantity"
                                          ></v-list-item>
                                        </v-list>
                                        <v-card-actions>
                                          <v-btn
                                            color="black"
                                            @click="showDialog = false"
                                            >Close</v-btn
                                          >
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                  </v-list>
                                  <v-card-actions>
                                    <v-btn
                                    color="danger"
                                    class="rounded-lg"
                                    @click="remove(order)"
                                  >
                                    Reject Order
                                  </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </template>
                            </v-dialog>
                          </v-col>
                        </v-row>
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

<script>
import SideBar from "@/components/SideBar.vue";
import AppBar from "@/components/AppBar.vue";
import Chart from "chart.js/auto";
import { VDataTable } from "vuetify/labs/VDataTable";
import axios from "axios";

export default {
  components: { VDataTable, Chart, SideBar, AppBar },
  data() {
    return {
      dialogm1: "",
      dialog: false,
      showDialog: false,
      rowStatus: {},
      result: [],
      order: {
        _id: "",
        order: "",
        customerID: "",
        product: ""
      },
    };
  },
  created() {
    this.OrderLoad();
  },
  mounted() {
    console.log("mounted() called.......");
  },
  methods: {
    async OrderLoad() {
      try {
        const response = await axios.get("http://localhost:8000/api/orders");
        console.log(this.result);
        this.result = response.data;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    remove(order) {
      var url = `http://localhost:8000/api/order/${order._id}`;
      axios.delete(url);
      alert("ORDER REJECTED");
      this.OrderLoad();
    },
  },
  mounted() {
    console.log("mounted() called.......");
    const chart = new Chart(document.getElementById("acquisitions"), {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Orders Evolution",
            data: [65, 59, 80, 81, 56, 55, 40, 44, 60, 20, 33, 80],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
    });
  },
};
</script>

<style scoped>
.rounded-dialog .v-dialog {
  border-radius: 10px;
}
.green-row {
  background-color: green;
  color: white;
}

.red-row {
  background-color: red;
  color: white;
}
</style>
