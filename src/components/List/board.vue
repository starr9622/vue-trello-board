<template>
  <div class="board">
    <list-title
      :boardTitle="listItem.boardTitle"
      @change-board-title="(v) => changeBoardTitle(v)"
      @remove-list="removeList"
    ></list-title>
    <div
      @drop="dropHandler(-1, $event)"
      @dragover.prevent
      @dragenter.prevent
      class="cardDropZone"
    >
      <div
        class="itemHandler"
        v-for="(item, index) in carditem"
        :key="item.id"
        draggable="true"
        @dragstart="dragStartHandler($event, item)"
        @drop="dropHandler(index, $event)"
      >
        <card
          @remove-card="removeCard(item)"
          :todo-message="carditem[index].message"
          @change-card="(v) => changeCard(v, index)"
        ></card>
      </div>
    </div>
    <add-button
      :message="carditem | plusMessageFilter"
      @addEvent="addCard"
    ></add-button>
  </div>
</template>

<script>
export default {
  props: ["listItem", "cardList"],
  components: {
    card: () => import("../Card/Card"),
    addButton: () => import("../Button/Add"),
    listTitle: () => import("./ListTitle"),
  },
  filters: {
    plusMessageFilter: (carditem) =>
      carditem.length ? "Add another card" : "Add a card",
  },
  watch: {
    cardList: function () {
      this.carditem = this.cardList;
    },
  },
  data() {
    return {
      carditem: this.cardList,
    };
  },
  methods: {
    addCard() {
      this.carditem.push({
        id: new Date().getTime(),
        message: "",
        list: this.listItem.id,
        order: this.carditem.length,
      });
      this.changeEvent();
    },
    removeCard(item) {
      this.$emit("remove-card", item);
    },
    removeList() {
      this.$emit("remove-list");
    },
    changeEvent() {
      this.$emit("change-card", this.carditem);
    },
    changeCard(val, index) {
      this.carditem[index] = {
        ...this.carditem[index],
        message: val,
      };
      this.changeEvent();
    },
    dropHandler(to, e) {
      this.$emit("change-order", {
        card: e.dataTransfer.getData("dragItem"),
        list: this.listItem.id,
        order: to,
      });
    },

    dragStartHandler(e, item) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("dragItem", item.id);
      e.dataTransfer.setData("target", e.target);
    },

    changeBoardTitle(title) {
      this.$emit("change-board-title", title);
    },
  },
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