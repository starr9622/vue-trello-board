<template>
  <header>
    <input
      type="text"
      :value="title"
      @input="(e) => changeTitle(e.target.value)"
    />
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: mapState("setting", ["title"]),
  methods: mapActions("setting", ["changeTitle"]),
};
</script>

<style lang="scss" scoped>
header {
  text-align: center;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  input {
    font-weight: 200;
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