<template>
  <RouterView />
  <nav class="nav-bar">
    <router-link to="/today">
      <span class="nav-bar__item"
        ><WIcon iconName="home" iconColor="#0f172a" :cursor="true" />
        <span class="nav-bar__title home">Home</span>
      </span>
    </router-link>

    <router-link to="/menu">
      <span class="nav-bar__item"
        ><WIcon iconName="menu" iconColor="#0f172a" :cursor="true" />
        <span class="nav-bar__title menu">Menu</span>
      </span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useOneCallWeather } from "./store";
import WIcon from "./components/weather-elements/WIcon.vue";

export default defineComponent({
  name: "App",
  components: { WIcon },
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
  // background: url("./assets/images/bg-1.jpg") bottom left no-repeat fixed;
  width: 530px;
  margin: 0 auto;
}

.nav-bar {
  height: fit-content;
  color: $color-primary;
  font-weight: 600;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.3rem 0.6rem;
  background: $color-terciary;

  &__item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }
}
</style>
