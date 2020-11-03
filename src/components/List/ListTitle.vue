<template>
  <div class="title">
    <input
      type="text"
      :value="board.title"
      @input="(e) => titleChange({ id: board.id, title: e.target.value })"
    />
    <div class="remove-btn" @click="removeList(board.id)">🗑</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["board"],
  methods: mapActions("list", ["titleChange", "removeList"]),
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