<template>
  <span class="menu-settings">
    <WIcon iconName="settings" :cursor="true" />
  </span>
  <div class="menu">
    <section class="preferred-location">
      <WIcon iconName="star" :cursor="false" />
      <span class="menu-title__span">Bevorzugter Standort</span>
      <WIcon iconName="info" :cursor="true" />
    </section>

    <Divider type="dotted" />

    <section class="menu__links">
      <div>
        <WIcon iconName="campaign" :cursor="true" />Falschen Standort melden
      </div>
      <div><WIcon iconName="headset" :cursor="true" />Kontaktieren Sie uns</div>
      <div><WIcon iconName="help" :cursor="true" />Anleitung</div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Divider from "primevue/divider";
import WIcon from "@/components/weather-elements/WIcon.vue";

export default defineComponent({
  name: "MenuOverview",
  components: { Divider, WIcon },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
div.menu {
  height: 100%;
}
</style>
