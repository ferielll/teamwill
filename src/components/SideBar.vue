<template>
  <v-navigation-drawer v-model="drawer">
    <v-img src="src/assets/teamwill.png" class="pa-4"> </v-img>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, route] in links" :key="icon" link>
        <template v-slot:prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>
          <span class="custom-link"  @click="navigateToRoute(route)">{{ text }}</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
const drawer = ref(true);
</script>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-home-outline", "Dashboard","/dashboard"],
        ["mdi-cube-outline", "Products","/products"],
        ["mdi-database", "Orders","/orders"],
        ["mdi-arrow-top-right", "Shipments","/shipments"],
        ["mdi-account", "Suppliers","/suppliers"],
        ["mdi-account-switch", "Customers","/customers"],
      ],
    };
  },
  methods: {
    navigateToRoute(route) {
      this.$router.push(route);
    },
  },
};
</script>

 <style scoped>
.title {
  color: #2b4777;
}
</style>
