<template>
  <v-navigation-drawer :value="drawerOpen" @input="emitUpdateDrawerOpen">
    <!-- Drawer content here -->
    <v-list>
      <v-list-item v-for="item in items" :key="item.id">{{ item.label }}</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const emitUpdateDrawerOpen = () => {
  // Emit the custom event to update the prop value
  emit('update:drawerOpen', drawerOpen.value)
}
</script>

<script>
import { defineEmits } from 'vue'

export default {
  props: {
    drawerOpen: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  setup() {
    defineEmits(['update:drawerOpen'])

    return {
      drawerOpen,
      emitUpdateDrawerOpen
    }
  }
};
</script>

<style scoped>
/* Add styles as per your requirement */
</style>
