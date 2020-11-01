<template>
  <main>
    <div class="trello-wrap">
      <list />
    </div>
  </main>
</template>

<script>
export default {
  components: {
    list: () => import("../List/List"),
  },
};
</script>

<style lang="scss" scoped>
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
</style>