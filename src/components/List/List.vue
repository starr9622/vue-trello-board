<template>
  <div class="board-wrap">
    <board
      v-for="(item, index) in list"
      :key="item.id"
      :listItem="list[index]"
      :cardList="cardList(item.id)"
    ></board>
    <add-button
      :message="list.length | message('list')"
      @addEvent="pushList"
    ></add-button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    board: () => import("./Board"),
    addButton: () => import("../Button/Add"),
  },
  computed: {
    ...mapState({
      card: (state) => state.card.all,
      list: (state) => state.list.all,
    }),
    ...mapGetters({
      cardList: "card/listCardFilter",
    }),
  },
  methods: mapActions("list", ["pushList"]),
};
</script>

<style lang="scss" scoped>
.board-wrap {
  display: grid;
  column-gap: 1rem;
  align-items: flex-start;
  grid-auto-flow: column;
  grid-auto-columns: 18rem;
  grid-template-columns: repeat(5, 18rem);
  height: 100%;
}
</style>