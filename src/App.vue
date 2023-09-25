<template>
<the-loader v-if="showLoading"></the-loader>
    <v-container class="py-8 px-6 " fluid>
                <div>
                    <router-view></router-view>
                </div>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TheLoader from './components/TheLoader.vue'
export default {
  name: 'App',
  computed: {
    ...mapState({
      showLoading: state => state.showLoading
    })
  },
  components: {TheLoader}
}
</script>