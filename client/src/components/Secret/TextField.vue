<template>
  <div>
    {{ text }}
  </div>
  <textarea></textarea>
  <ButtonUser @click="logii()" />
</template>

<script>
import ButtonUser from "@/components/Secret/ButtonUser.vue";
import axios from "axios";

export default {
  data() {
    return {
      text: null,
    };
  },
  components: {
    ButtonUser,
  },
  methods: {
    logii() {},
  },
  mounted() {
    axios
      .post(
        "http://localhost:5763/api/crypto/dhashcontent/d9c66270-8199-11ed-a11d-31682c26c964"
      )
      .then((response) => (this.text = response.data.text));
  },
};
</script>

<style>
body {
  background: #d6eaf8;
}
.gradient-button {
  text-decoration: none;
  display: inline-block;
  color: white;
  padding: 20px 30px;
  margin: 10px 20px;
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(
    to right,
    #9eefe1 0%,
    #4830f0 51%,
    #9eefe1 100%
  );
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
}
.gradient-button:hover {
  background-position: right center;
}
</style>
