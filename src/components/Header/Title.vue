<template>
  <header>
    <input type="text" :value="title" @input="changeTitle" />
  </header>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    changeTitle($event) {
      this.$store.commit("setTitle", $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  text-align: center;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  input {
    font-size: 1.5rem;
    text-align: center;
    color: #fff;
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