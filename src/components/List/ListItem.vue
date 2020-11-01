<template>
  <div class="list bg-ececec box-shadow">
    <div class="title p-relative d-flex">
      <input type="text" v-model="title" @input="changeBoardTitle" />
      <div class="close pointer" @click="removeList()">🗑</div>
    </div>
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
    <div class="addCard pointer" @click="addCard()">
      <span class="plus">{{ carditem | plusMessageFilter }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listItem", "cardList"],
  components: {
    card: () => import("../Card/Card"),
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
      title: this.listItem.boardTitle,
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

    changeBoardTitle() {
      this.$emit("change-board-title", this.title);
    },
  },
};
</script>

<style scoped>
.cardDropZone {
  padding: 0.5rem;
}
.itemHandler {
  padding: 0.5rem;
}
</style>