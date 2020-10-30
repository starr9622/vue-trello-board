<template>
  <div class="board" :class="bgColor">
    <header>
      <input type="text" v-model="title" />
    </header>
    <main class="overflow-auto p-5 height-100">
      <List />
    </main>
    <Footer :init="bgColor" @color="changeBackground" />
  </div>
</template>

<script>
import List from "./List/List.vue";
import Footer from "./Footer/changeBg.vue";

export default {
  name: "Trello",
  components: {
    List,
    Footer,
  },
  props: {
    msg: String,
  },
  watch: {
    title: function () {
      localStorage.setItem("title", this.title);
    },
  },
  data() {
    return {
      bgColor: "salmon",
      title: "💫 To-Do List 💫",
    };
  },
  mounted() {
    this.title = localStorage.getItem("title")
      ? localStorage.getItem("title")
      : "💫 To-Do List 💫";
  },
  methods: {
    changeBackground(val) {
      this.bgColor = val;
    },
  },
};
</script>

<style>
.p-5 {
  padding: 0.5rem;
}
.overflow-auto {
  overflow: auto;
}
.wheat {
  background-color: wheat;
}
.salmon {
  background-color: salmon;
}
.board {
  /* min-height: 100vh; */
  position: relative;
  min-height: 100%;
}
header {
  text-align: center;
  padding: 0.5rem;
  background: rgba(255, 252, 252, 0.1);
}
header > input {
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
}
input,
textarea {
  border: 0;
  background: transparent;
  resize: none;
}
input:hover,
textarea:hover {
  border: 0;
}
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
.height-100 {
  height: calc(100vh - 4rem);
}
</style>
