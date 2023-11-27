<template>
  <v-app>
    <SideBar :drawer="drawer" />
    <AppBar @drawerEvent="drawer = !drawer" />
    <v-main>
      <div class="dashboard">
        <v-subheader class="d-flex justify-space-between align-center">
          <h3 style="font-weight: bold; font-size: 35px">Products</h3>
          <v-btn color="black" class="rounded-lg" :to="{ name: 'Suppliers' }">
            Supply
          </v-btn>
        </v-subheader>
        <v-item-group>
          <v-container>
            <v-row>
              <v-col
                v-for="product in result"
                :key="product._id"
                cols="12"
                md="4"
              >
                <v-item>
                  <v-card
                    :style="{
                      'border-radius': '50%',
                      overflow: 'hidden',
                      'background-color': 'lightgrey',
                    }"
                    class="d-flex align-center"
                    height="400"
                  >
                    <div
                      class="text-h5 flex-grow-1 text-center"
                      :class="{ 'out-of-stock': product.quantity == '0' }"
                    >
                      <div
                        :style="{
                          'font-weight': 'bold',
                          color: '#2F4F4F',
                          marginBottom: '-40px',
                        }"
                      >
                        {{ product.productName }}
                      </div>
                      <img
                         :src="`http://localhost:8000/static/`+ product.image"
                        style="
                          width: 200px;
                          height: auto;
                          display: block;
                          margin: 0 auto;
                        "
                      />
                      <div :style="{ 'font-weight': 'bold', color: '#2F4F4F' }">
                        {{ product.price }} $
                      </div>
                      <p
                        :class="{
                          'out-of-stock-text': product.quantity == '0',
                        }"
                      >
                        {{ product.quantity }}
                      </p>
                      <v-icon color="red" @click="remove(product)"
                        >mdi-delete-circle</v-icon
                      >
                      <br />

                      <v-dialog v-model="dialog" persistent width="1024">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            v-if="product.quantity == '0'"
                            color="green"
                            dark
                            tile
                            @click="supply(product._id)"
                            v-bind="props"
                          >
                            Supply
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">Increase Quantity</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="" md="4">
                                  <!-- Use a different variable for quantity in the dialog -->
                                  <v-text-field
                                    label="Enter Quantity"
                                    v-model="dialogQuantity"
                                    required
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue-darken-1"
                              variant="text"
                              @click="dialog = false"
                            >
                              Close
                            </v-btn>
                            <v-btn
                              color="blue-darken-1"
                              variant="text"
                              @click="
                                updateQuantity(productId, dialogQuantity),
                                dialog = false
                              "
                            >
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "@/components/SideBar.vue";
import AppBar from "@/components/AppBar.vue";
import axios from "axios";
export default {
  components: { SideBar, AppBar },
  data() {
    return {
      result: [],
      dialog: false,
      dialogQuantity: 0,
      productId : this.$route.query.productId,
      product: {
        _id: "",
        productName: "",
        quantity: 0,
        price: 0,
        productType: "",
        supplier: "",
        image: "",
      },
    };
  },
  created() {
    this.ProductLoad();
  },
  mounted() {
    console.log("mounted() called.......");
  },
  methods: {
    handleRestock(product) {
      product.quantity += 1;
    },
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
    async remove(product) {
      var url = `http://localhost:8000/api/products/${product._id}`;
      axios.delete(url);
      alert("PRODUCTED DELETED");
      this.ProductLoad();
    },
    supply(productId) {
      this.$router.push({ query: { productId } });
      console.log("productId", productId);
    },
    async updateQuantity(productId, newQuantity) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/updateQuantity/${productId}`,
          { newQuantity }
        );

        const updatedProduct = response.data;
        console.log("Product updated:", updatedProduct);
        this.ProductLoad();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    },
  },
};
</script>
<style scoped>
.page-wrap {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.out-of-stock {
  background-color: #eb9b9b;
  padding: 20px;
  margin: 0px;
  border-radius: 50%;
}

.out-of-stock-text {
  color: red;
}

.delete-icon-wrapper {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>