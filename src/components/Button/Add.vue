<template>
  <div class="button-wrap" @click="addlist">
    <span class="plus">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    addlist() {
      this.$emit("addEvent");
    },
  },
};
</script>

<style lang="scss" scoped>
.plus {
  &::before {
    content: "+";
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: 0.5rem;
  }
}
.button-wrap {
  border-radius: 0.25rem;
  background-color: #ececec;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  padding: 1rem;
  &:hover {
    opacity: 0.5;
    mix-blend-mode: hard-light;
  }
}
</style>