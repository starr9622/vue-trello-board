<template>
  <footer>
    <label>change background Color</label>
    <input type="color" :value="color" @input="changeColor" />
  </footer>
</template>

<script>
export default {
  props: ["color"],

  methods: {
    changeColor($event) {
      this.$emit("changeColor", $event.target.value);
    },
  },
};
</script>

<style scoped>
footer label {
  margin-right: 1rem;
  color: #666;
}
footer {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
}
</style>