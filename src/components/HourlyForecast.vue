<template>
  <div class="w-hourly w-forecast">
    <Card>
      <template #header>
        <span class="hour">hour</span>
      </template>
      <template #title>
        <img
          :src="'http://openweathermap.org/img/wn/' + icon + '@2x.png'"
          alt="hourly weather icon"
        />
      </template>
      <template #content>
        <span>{{ temperature }} °</span>
      </template>
      <template #footer>
        <span>{{ humidity }} %</span>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "primevue/card";

export default defineComponent({
  name: "HourlyForecast",
  components: {
    Card,
  },
  props: {
    icon: {
      type: String,
      required: false,
    },
    humidity: {
      type: Number,
      required: false,
    },
    temperature: {
      type: Number,
      required: false,
    },
    hour: {
      type: Number,
      required: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.w-hourly {
  height: 90px;

  :deep(.p-card) {
    height: 100%;
    width: 70px;
    color: black;
    background-color: #e3faff7e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.3rem 0%;
    font-size: 0.7rem;

    .p-card-header {
      padding: 0;
      margin: 0;
      @include flex-center;
    }

    & .p-card-body {
      @include flex-center;
      padding: 0;
      display: flex;
      flex-direction: column;

      & .p-card-title {
        margin: 0;
        padding-top: 0;
        font-size: 0;
        background: #00000017;
        border-radius: 50%;
        img {
          height: 2.2rem;
          width: 2.2rem;
        }
      }
      .p-card-content {
        padding: 0;
      }
      .p-card-footer {
        padding: 0.3rem 0 0 0;
      }
    }
  }
}
</style>
