<template>
  <v-app-bar app color="white" elevate-on-scroll elevation="4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawerEvent"></v-app-bar-nav-icon>
    </template>
    <v-spacer />

    <div class="mt-2">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        @input="handleSearch"
        class="search-input"
      />
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <v-spacer />

    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <span v-bind="props" style="cursor: pointer" class="mx-5 mr-10">
          <v-badge color="red" content="5">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </span>
      </template>
      <v-list :items="items" item-props lines="three" width="250">
        <template v-slot:subtitle="{ subtitle }">
          <div v-html="subtitle"></div>
        </template>
      </v-list>

    </v-menu>
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <span v-bind="props" style="cursor: pointer" class="mx-5 mr-10">
          <v-chip link>
            <v-badge dot bottom color="green">
              <v-avatar>
                <img src="src/assets/avataaars.png" alt="">
              </v-avatar>
            </v-badge>
            <span class="ml-3">Feriel Hamrouni</span>
          </v-chip>
        </span>
      </template>

      <v-card
    width="300"
  >
    <v-list>
          <v-list-item two-line>
          <v-list-item-avatar>
            <img src="src/assets/avataaars.png" />
          </v-list-item-avatar>
          <v-list-item-content class="content-wrapper">
            <v-list-item-title class="custom-title">Feriel Hamrouni</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

      <v-list-item
        v-for="(item, i) in menus"
        :key="i"
        :value="item"
        color="primary"
        rounded="shaped"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title> 
          {{item.text}}
        </v-list-item-title>
      </v-list-item>
      <div class= "centered-container">
        <v-btn class="expanded-button" color="green" dark  tile @click="logout()" :to="{name: 'Login'}">logout</v-btn>
      </div>
    </v-list>
  </v-card>
    </v-menu>
  </v-app-bar>
</template>


<script>
export default {
  setup() {
    const logout = async() => {
      await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      })
    }
    return {
      logout
    }
  },
  data: () => ({
    menus: [
      {text: "Profile", icon: "mdi-account"},
      {text: "Change Password", icon: "mdi-key"},
      ],
    items: [
      { type: "subheader", title: "Today" },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Summer BBQ",
        subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
};
</script>

<style scoped>
.search-input {
  border: 2px solid #ccc;
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 16px;
  box-sizing: border-box;
  width: 100%;
  transition: border-color 0.3s;
}
.search-input:focus {
  outline: none;
  border-color: #2b4777;
}

@media (min-width: 768px) {
  /* Styles for screens with a minimum width of 768px */
  .search-input {
    width: 300px;
  }
}

.v-list-item {
  display: flex;
  align-items: center;
}

.content-wrapper {
  flex: 1; /* Allow the content to expand and take the available space */
}

.custom-title {
  font-size: 18px; 
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.expanded-button {
  width: 200px; 
  height: 40px;
  font-size: 15px; 
  padding: 10px 10px; 
}
</style>
