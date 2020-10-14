<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://w7.pngwing.com/pngs/24/440/png-transparent-cannabis-sativa-marijuana-joint-cannabis-leaf-maple-leaf-symmetry.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      <v-card-text>
        <span class="mr-2">LOGS - TICS</span>
      </v-card-text>
    </v-app-bar>
    <v-main>
      <br />
      <Table />
    </v-main>
  </v-app>
</template>

<script>
import Table from "./components/Table";
export default {
  name: "App",
  components: {
    Table,
  },
  data: () => ({}),
};
</script>
