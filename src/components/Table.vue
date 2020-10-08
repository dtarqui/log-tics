<template>
  <v-data-table
    :headers="headers"
    :items="logsData"
    :search="search"
    sort-by="dateInit"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div>
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.dateInit"
                      label="Date"
                    ></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.observations"
                      label="Observations"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.responsable"
                      label="Responsable"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
// new Date().toISOString().substr(0, 10)
// import Rows from "./Rows";
// import Dialog from "./Dialog";
export default {
  data: () => ({
    search: "",
    dialog: false,
    resource: {},
    dialogDelete: false,
    headers: [
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Date (MM/DD/YYYY, HH:MM:SS)", value: "dateInit" },
      { text: "Description", value: "description" },
      { text: "Observations", value: "observations" },
      { text: "Responsable", value: "responsable" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    logsData: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      dateInit: "",
      description: "",
      observations: "",
      responsable: "",
    },
    defaultItem: {
      title: "",
      dateInit: "",
      description: "",
      observations: "",
      responsable: "",
    },
  }),
  components: {
    // Rows,
    // Dialog,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    initialize() {
      this.logsData = [
        {
          title: "Frozen Yogurt",
          dateInit: "10/6/2020, 9:51:10 PM",
          description: "Fulano's description",
          observations: "Nothing",
          responsable: "Fulano",
        },
      ];

      this.resource
        .getData({ node: "logs" })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.logsData = resultArray;
        });
    },
    editItem(item) {
      item.dateInit = new Date().toLocaleString();
      this.editedIndex = this.logsData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.logsData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.logsData.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.logsData[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.dateInit = new Date().toLocaleString();
        this.resource.saveAlt(this.editedItem);
        // .replace(/-/g,' - ');
        this.logsData.push(this.editedItem);
      }
      this.close();
    },
  },
  created() {
    const customAction = {
      saveAlt: { method: "POST", url: "logs.json" },
      getData: { method: "GET" },
    };
    // this.resource = this.$resource(this.url);
    // this.resource = this.$resource(this.url, {}, customAction);
    this.resource = this.$resource("{node}.json", {}, customAction);
    this.initialize();
  },
};
</script>