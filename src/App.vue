<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useOneCallWeather } from "./store";

export default defineComponent({
  name: "App",
  components: { RouterView },
  setup() {
    onMounted(() => {
      console.log("APP MOUNTED");
      useOneCallWeather();
    });
    return {};
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background-color: $color-secondary;
  background: url("./assets/images/bg-1.jpg") bottom left no-repeat fixed;
  width: 530px;
  margin: 0 auto;
}
</style>
