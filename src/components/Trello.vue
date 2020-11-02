<template>
  <div class="main-wrap" :style="{ 'background-color': color }">
    <main-title :title="title"></main-title>
    <main-area></main-area>
    <change-background :color="color"></change-background>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "trello",
  components: {
    "main-area": () => import("./Main/Boards"),
    "change-background": () => import("./Footer/changeBg"),
    "main-title": () => import("./Header/Title"),
  },
  computed: mapState({
    title: (state) => state.setting.title,
    color: (state) => state.setting.color,
  }),
};
</script>

<style lang="scss" scoped>
.main-wrap {
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-rows: 3rem auto 3rem;
}
</style>
