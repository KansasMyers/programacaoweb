  
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app absolute>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/user">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuário</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">{{ $app.name }}</v-toolbar-title>
    </v-app-bar>

    <v-main id="main">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({ drawer: true, group: null }),
}
</script>

<style>
  #main {
    margin: 35px;
  }
</style>