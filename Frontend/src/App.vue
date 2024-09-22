<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-header>
          <v-row>
            <v-col cols="6">
              <h1>Car License</h1>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col cols=12>
                  <v-text-field
                    label="First Name"
                    placeholder="Input First Name"
                    v-model="first_name"
                  ></v-text-field>
                </v-col>
                <v-col cols=12>
                  <v-text-field
                    label="Last Name"
                    placeholder="Input Last Name"
                    v-model="last_name"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols=2>
              <v-btn @click="createUser()">Submit</v-btn>
            </v-col>
          </v-row>
        </v-card-header>
        <v-card-body>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.action`]="{ item }">
              <v-btn
                elevation="0"
                color="primary"
                v-on:click="editUser(item)"
              >
                edit
              </v-btn>
              <v-btn
                elevation="0"
                color="danger"
                v-on:click="deleteUser(item)"
              >delete</v-btn>
            </template>
          </v-data-table>
        </v-card-body>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  mounted() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/user/",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        this.desserts = [...response.data.data];
      })
      .catch((error) => {
        console.log(error);
      });

    this.editUser("test");
  },

  method: {
    createUser() {
      let data = JSON.stringify({
        first_name: this.first_name,
        last_name: this.last_name,
      });
      console.log(data);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v1/user/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editUser(item) {
      let data = JSON.stringify({
        ...item,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v1/user/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser(item) {
      let data = [item.user_id]

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v1/user/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  data: () => ({
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "first_name",
      },
      { text: "last_name", value: "last_name" },
      { text: "license_status", value: "license_status" },
      { text: "created_at", value: "created_at" },
      { text: "action", value: "action" },
    ],
    desserts: [],
    first_name: "",
    last_name: "",
  }),
};
</script>
