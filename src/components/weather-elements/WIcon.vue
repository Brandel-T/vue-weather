<template>
  <div
    class="w-icon"
    :class="[{ 'w-icon--small': small }, { cursor: cursor }]"
    :title="title"
  >
    <template v-if="fileName">
      <img
        v-if="!iconColor"
        :alt="title"
        :src="`../../assets/icons/${fileName}`"
        class="w-icon__img"
      />
      <div
        v-else
        class="w-icon__img w-icon__img--masked"
        :style="{
          'background-color': iconColor,
          '--mask-image': `url(../../assets/icons/${fileName})`,
        }"
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
// import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "WIcon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
    iconColor: {
      type: [String, Object],
      default: null,
    },
    small: {
      type: Boolean,
      default: false,
      required: false,
    },
    cursor: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    /**
     * check for available files to prevent render error
     */
    const fileName = computed(() => {
      const availableFiles: string[] = [
        "add",
        "add_location",
        "info",
        "campaign",
        "menu",
        "settings",
        "help",
        "star",
        "headset",
        "home",
      ];

      if (availableFiles.includes(props.iconName))
        return `${props.iconName}.svg`;
      return undefined;
    });

    return { fileName };
  },
});
</script>

<style lang="scss">
.w-icon {
  width: 40px;
  height: 40px;
  display: inline-flex;
  justify-content: center;

  align-items: center;

  &__img {
    height: 25px;
    width: auto;

    &--masked {
      width: 25px;
      -webkit-mask-image: var(--mask-image);
      -webkit-mask-position: center;
      -webkit-mask-size: 100%;
      -webkit-mask-repeat: no-repeat;
      mask-image: var(--mask-image);
      mask-position: center;
      mask-repeat: no-repeat;
      mask-size: 100%;
    }
  }

  &--small {
    .w-icon__img {
      height: 20px;
    }
  }
}

.cursor {
  cursor: pointer;
}
</style>
