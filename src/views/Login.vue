<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-col cols="auto" sm="12" md="8" class="ml-15">
          <v-img src="../assets/logo aloe-01.png"></v-img>
        </v-col>
        <!-- <v-card-title class="text-h5">
          Authentification
        </v-card-title> -->
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    outlined
                    v-model="phone"
                    label="Numéro de téléphone"
                    required
                  ></v-text-field>

                  <v-text-field
                    outlined
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    label="Mot de passe"
                    @click:append="show = !show"
                  ></v-text-field>
                  <v-btn
                    block
                    large
                    :loading="loading"
                    :disabled="loading"
                    color="primary"
                    @click="submit()"
                  >
                    Connexion
                  </v-btn>
                </v-form>
                <v-alert
                  class="mt-2"
                  v-if="error"
                  dense
                  transition="scale-transition"
                  text
                  type="error"
                  >{{errorMessage}}</v-alert
                >
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-row>
</template>

<script>
import axios from "axios";
import server from "../config/address";
export default {
  name: "Login",
  data() {
    return {
      error: false,
      dialog: false,
      loading: false,
      valid: "",
      phone: "",
      password: "",
      errorMessage: '',
      /* errorBadRequest: false,
      errorBadServer: false, */
      show: false,
      passwordField: "Password",
      rules: {
        required: (value) => !!value || "Entrez le mot de passe",
        min: (v) => v.length >= 5 || "Entrez 5 caractères minimum",
      },
    };
  },
  mounted(){
    this.dialog = true;
  },
  methods: {
    async submit() {
      this.loading = true;
      /* this.errorBadRequest = false;
      this.errorBadServer = false; */

      axios
        .post(
          `${server.address}/user/login`,
          {
            phone: this.phone,
            password: this.password,
          }
        )
        .then((response) => {
          /* this.errorBadRequest = false;
          this.errorBadServer = false; */
          // localStorage.setItem("token", response.data.authToken);
          this.loading = false;
          this.dialog = false;
          if(response.data.account){
            this.$router.push(`/postes/${response.data.id}`)
          }
          else{
            this.$store.commit("setUserData", response.data);
            this.dialog = false;
          }          
          
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.errorMessage = error.response.data;
          /* if (error.response) {
            this.errorBadRequest = true;
            this.errorBadServer = false;
          } else if (error.request) {
            // The request was made but no response was received
            this.errorBadServer = true;
            this.errorBadRequest = false;
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            this.errorBadServer = true;
            this.errorBadRequest = false;
          } */
          this.loading = false;
        });
    },
  },
};
</script>

<style>
a {
  color: #0d6efd;
  text-decoration: none;
  background-color: transparent;
}

label {
  font-weight: 700;
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>
