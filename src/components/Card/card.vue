<template>
  <div class="card-wrap">
    <textarea
      ref="textArea"
      v-model="message"
      @input="cardinput"
      placeholder="Write a to do!"
    ></textarea>
    <div class="close" @click="remove">❌</div>
  </div>
</template>

<script>
export default {
  props: ["todoMessage"],
  data() {
    return {
      textareaHeight: "1rem",
      message: this.todoMessage,
    };
  },
  methods: {
    remove() {
      return this.$emit("remove-card", this);
    },
    cardinput() {
      this.$emit("change-card", this.message);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrap {
  display: grid;
  grid-template-columns: 1fr 3rem;
  width: 100%;
  justify-items: baseline;
  align-items: center;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 0.2rem;
  margin-bottom: 0.5rem;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: auto;
}

.close {
  align-self: center;
  justify-self: flex-end;
  opacity: 0.3;
  padding: 1rem;
  margin: auto;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}

textarea {
  width: 100%;
  border: 0;
  background: transparent;
  resize: none;
  font-size: 1rem;
  min-height: 100%;
  max-height: 10rem;
  &:hover {
    border: 0;
  }
  &:focus {
    outline: none;
  }
}
</style>