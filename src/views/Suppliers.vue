<template>
  <v-app id="inspire">
    <SideBar :drawer="drawer" />
    <AppBar @drawerEvent="drawer = !drawer" />
    <v-main>
      <div class="dashboard">
        <v-subheader class="d-flex justify-space-between align-center">
          <h3 style="font-weight: bold; font-size: 35px">Suppliers</h3>
          <v-btn color="black" class="rounded-lg" :to="{ name: 'Products' }">
            Go Back
          </v-btn>
        </v-subheader>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex justify-center align-center">
            <v-card elevation="4" class="rounded-lg" style="width: 80%;">
              <v-card-title
                style="font-weight: bold; font-size: 30px; color: #2f4f4f"
                >Supply</v-card-title
              >
              <form @submit.prevent="saveProduct">
                <v-select
                  v-model="product.productType"
                  :items="products_list"
                  label="Product Type"
                ></v-select>

                <v-select
                  v-model="product.supplier"
                  :items="suppliers_list"
                  label="Supplier"
                ></v-select>

                <v-text-field
                  v-model="product.productName"
                  :counter="10"
                  label="Product Name"
                ></v-text-field>

                <v-text-field
                  v-model="product.quantity"
                  :counter="3"
                  label="Quantity"
                ></v-text-field>

                <v-text-field
                  v-model="product.price"
                  :counter="3"
                  label="Price"
                ></v-text-field>

                <input type="file" @change="handleFileChange" />
                 <img v-if="product.file" :src="getImageUrl(product.file)" alt="Product Image" />
                <br>
                <v-btn class="me-4" type="submit"> submit </v-btn>

                <v-btn @click="handleReset"> clear </v-btn>
              </form>
            </v-card>
          </v-col>
          <!-- <v-col lg="6" cols="10" class="py-4">
            <v-card elevation="4" class="rounded-lg">
              <v-card-title
                style="font-weight: bold; font-size: 30px; color: #2f4f4f"
                >PRODUCTS</v-card-title
              >
              <div style="width: 300px" class="chart-container">
                <canvas id="acquisitions"></canvas>
              </div>
            </v-card>
          </v-col> -->
        </v-row>
        <br />
        <v-row class="mt-n6">
          <v-col cols="12" sm="12">
            <v-card elevation="4" class="rounded-lg">
              <v-data-table class="grey lighten-3 py-4 py-4">
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <th :style="{ 'font-weight': 'bold' }">Product Name</th>
                      <th :style="{ 'font-weight': 'bold' }">Supplier</th>
                      <th :style="{ 'font-weight': 'bold' }">Quantity</th>
                      <th :style="{ 'font-weight': 'bold' }">Product Type</th>
                    </tr>
                    <tr v-for="item in result" :key="item._id">
                      <td :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ item.productName }}
                      </td>
                      <td :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ item.supplier }}
                      </td>
                      <td
                       :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ item.quantity }}
                      </td>
                      <td
                       :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ item.productType }}
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
import { ref, onMounted } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as validate from 'vee-validate';
import axios from "axios";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    supplier: (value) => {
      if (value) return true;
      return "Select a Supplier.";
    },
    product: (value) => {
      if (value) return true;
      return "Select a Product Type.";
    },
  },
});

// Define and initialize form fields
const quantity = useField("quantity");
const product_name = useField("product_name");
const file = ref(null);
const product = ref({
  productType: "",
  supplier: "",
  productName: "",
  quantity: "",
  price: "",
  image: null, 
  file: null
});

const products_list = ref(["Physical Goods", "Digital Goods"]);
const suppliers_list = ref([
  "Ali Express",
  "Printify",
  "AliBaba",
  "eBay",
  "Zazzle",
]);

// Submission handler
const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});

// Save product function
const saveProduct = () => {
  console.log('Saving product with file:', product.value.file);
  const formData = new FormData();
  formData.append("productType", product.value.productType);
  formData.append("supplier", product.value.supplier);
  formData.append("productName", product.value.productName);
  formData.append("quantity", product.value.quantity);
  formData.append("price", product.value.price);
  formData.append('image', product.value.file, 'filename.jpg', { contentType: 'image/jpeg' });


  axios.post("http://localhost:8000/api/products", formData).then(({ data }) => {
    alert("SAVED");
      console.log({data})
      this.ProductLoad();
  });

};

 const update = async (productId, newQuantity) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/updateQuantity/${productId.value}`, { newQuantity });

    const updatedProduct = response.data;
    console.log('Product updated:', updatedProduct);
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    file.value = selectedFile;
    // Assign the file to the product object
    product.value.file = file.value;
  } else {
    // Handle the case when the user cancels file selection
    file.value = null;
    product.value.file = null;
  }
};

const getImageUrl = (file) => {
  return file ? URL.createObjectURL(file) : null;
};
</script>


<script>
import SideBar from "@/components/SideBar.vue";
import AppBar from "@/components/AppBar.vue";

import Chart from "chart.js/auto";
import axios from "axios";

export default {
  components: { Chart, SideBar, AppBar },
  data() {
    return {
      product: {
        _id: "",
        productName: "",
        quantity: "",
        price: "",
        productType: "",
        supplier: "",
      },
      result: [],
    };
  },
  created() {
    this.ProductLoad();
  },
  methods: {
     async ProductLoad() {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        console.log(this.result);
        this.result = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("mounted() called.......");
    const chart = new Chart(document.getElementById("acquisitions"), {
      type: "pie",
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
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>