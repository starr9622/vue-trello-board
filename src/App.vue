<template>
  <div id="app">
    <trello />
  </div>
</template>

<script>
export default {
  components: {
    trello: () => import("./components/Trello"),
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
