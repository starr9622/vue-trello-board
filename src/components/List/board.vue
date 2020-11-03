<template>
  <div class="board">
    <list-title :board="listItem"></list-title>
    <div
      class="cardDropZone"
      @drop="dropHandler({ order: -1, list: listItem.id })"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        class="itemHandler"
        v-for="(item, index) in cardList"
        :key="item.id"
        draggable="true"
        @dragstart="dragStartHandler(item)"
        @drop="dropHandler({ order: index, list: listItem.id })"
      >
        <card :card="cardList[index]"></card>
      </div>
    </div>
    <add-button
      :message="message(listItem.id)"
      @addEvent="pushCardToList(listItem.id)"
    ></add-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["listItem", "cardList"],
  components: {
    card: () => import("../Card/Card"),
    addButton: () => import("../Button/Add"),
    listTitle: () => import("./ListTitle"),
  },
  computed: mapGetters({
    message: "card/buttonMessage",
  }),
  methods: mapActions("card", [
    "pushCardToList",
    "dragStartHandler",
    "dropHandler",
  ]),
};
</script>

<style scoped>
.board {
  border-radius: 0.25rem;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: #ececec;
}

.cardDropZone {
  padding: 0.5rem;
}
.itemHandler {
  padding: 0.5rem;
}
</style>