<template>
  <div class="title">
    <input type="text" :value="boardTitle" @input="changeBoardTitle" />
    <div class="remove-btn" @click="removeList">🗑</div>
  </div>
</template>

<script>
export default {
  props: ["boardTitle"],
  methods: {
    changeBoardTitle($event) {
      this.$emit("change-board-title", $event.target.value);
    },
    removeList() {
      this.$emit("remove-list");
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #dfdfdf;
  font-weight: 800;
  display: grid;
  grid-template-columns: auto 3rem;
  justify-items: center;
  align-items: center;
}

input {
  border: 0;
  background: transparent;
  width: 100%;
  font-size: 1.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  &:hover {
    border: 0;
  }
  &:focus {
    outline: none;
  }
}

.remove-btn {
  opacity: 0.3;
  padding: 0.5rem;
  line-height: 2.5rem;
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
</style>