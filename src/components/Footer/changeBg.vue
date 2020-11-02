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
      this.$store.commit("setBgColor", $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  text-align: center;
  label {
    margin-right: 1rem;
    color: #666;
  }
}

input {
  border: 0;
  background: transparent;
  resize: none;
  &:hover {
    border: 0;
  }
  &:focus {
    outline: none;
  }
}
</style>