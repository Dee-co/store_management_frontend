<template>
  <div class="home">
    <div class="form-container">
      <p class="text-center">Login</p>
      <v-form @submit.prevent="handleSubmit" class="ma-2">
        <v-text-field
          variant="outlined"
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          variant="outlined"
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-form>
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(['setAuthToken']),
   
    handleSubmit() {
      const obj = {
        email: this.username,
        password: this.password,
      };

      axios
        .post(`http://127.0.0.1:8000/api/login`, obj)
        .then((response) => {
          console.log("Response:", response);
          
          if(response.data.token !== null && response.data.token !== undefined){
            localStorage.setItem("Token", response.data.token);
            this.$store.commit('setAuthToken', response.data.token);
            this.$router.push('/about');
            alert("Login Successfull");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          alert(error);
        });
    },
}
};
</script>
<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: aliceblue;
}

.form-container {
  background-color: aqua;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-sizing: border-box;
}

.login-form {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
