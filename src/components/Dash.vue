<template>
    <SideBar :drawer="drawer" /> 
    <AppBar @drawerEvent="drawer = !drawer" /> 
    <v-main>
      <v-container class="py-8 px-6" fluid>
      </v-container>
    </v-main>
</template>

<script setup>


const cards = ["Today", "Yesterday"];
</script>

<script>
export default {
  data: () => ({
    cards: ["Today", "Yesterday"],
  }),
};
</script>


