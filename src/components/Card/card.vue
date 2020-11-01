<template>
  <div class="card pointer p-relative d-flex">
    <textarea
      ref="textArea"
      :style="{ height: textareaHeight, width: '90%', 'max-height': '10rem' }"
      v-model="message"
      @input="cardinput"
      placeholder="Write a to do!"
    ></textarea>
    <div class="close pointer" @click="remove">❌</div>
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
      if (this.$refs.textArea.scrollHeight > this.$refs.textArea.clientHeight) {
        this.$nextTick(() => {
          this.textareaHeight = this.$refs.textArea.scrollHeight + "px";
        });
      }
      this.$emit("change-card", this.message);
    },
  },
};
</script>
