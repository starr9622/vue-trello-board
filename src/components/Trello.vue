<template>
  <div class="main-wrap" :style="{ 'background-color': bgColor }">
    <header>
      <input type="text" v-model="title" />
    </header>
    <main>
      <div class="trello-wrap">
        <list />
      </div>
    </main>
    <change-background
      :color="bgColor"
      @changeColor="(val) => (bgColor = val)"
    ></change-background>
  </div>
</template>

<script>
import List from "./List/List";
import ChangeBackground from "./Footer/changeBg";

export default {
  name: "trello",
  components: {
    List,
    ChangeBackground,
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
      bgColor: "#3775a4",
      title: "💫 To-Do List 💫",
    };
  },
  mounted() {
    this.title = localStorage.getItem("title")
      ? localStorage.getItem("title")
      : "💫 To-Do List 💫";
  },
};
</script>

<style lang="scss">
.trello-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  margin: 1rem;
  &::-webkit-scrollbar {
    background-color: transparent;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
}
main {
  position: relative;
}

.p-5 {
  padding: 0.5rem;
}
.main-wrap {
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-rows: 3rem auto 3rem;
}
header {
  text-align: center;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
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
  height: 100%;
}
</style>
