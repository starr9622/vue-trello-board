<template>
  <div class="board-wrap">
    <board
      v-for="(item, index) in list"
      :key="item.id"
      :listItem="list[index]"
      :cardList="item.id | cardFilter(card)"
      @remove-list="removeList(item.id)"
      @change-order="changeOrder"
      @change-card="cardHandler"
      @remove-card="cardRemove"
      @change-board-title="(title) => titleChange(item.id, title)"
    ></board>
    <add-button
      :message="list | messageFilter"
      @addEvent="addlist"
    ></add-button>
  </div>
</template>

<script>
export default {
  components: {
    board: () => import("./board.vue"),
    addButton: () => import("../Button/Add"),
  },
  filters: {
    cardFilter: (id, card) =>
      card.filter((c) => c.list === id).sort((a, b) => a.order - b.order),
    messageFilter: (list) => (list.length ? "Add another list" : "Add a list"),
  },
  watch: {
    orderSort() {
      if (this.orderSort)
        this.list.forEach(({ id }) => this.sortingCardOrder(id));
    },
  },
  data() {
    return {
      list: [],
      card: [],
      orderSort: false,
    };
  },
  methods: {
    addlist() {
      this.list.push({
        id: new Date().getTime(),
        boardTitle: "new List !",
      });
    },
    removeList(id) {
      this.list = this.list.filter((item) => item.id != id);
    },
    changeOrder(item) {
      const changeList = parseInt(item.list);
      if (item.order === -1 && this.card.find((c) => c.list === changeList)) {
        return;
      }
      let moveItem = this.card.find((i) => i.id === parseInt(item.card));
      let listIds = this.card
        .filter((c) => c.list === changeList)
        .map((f) => f.id);
      if (moveItem.list !== changeList) {
        moveItem.list = changeList;
        moveItem.order = listIds.length - 1;
      }
      listIds.forEach((id) => {
        let orderItem = this.card.find((c) => c.id === id);
        orderItem.order =
          moveItem.order > item.order && orderItem.order >= item.order
            ? orderItem.order + 1
            : orderItem.order <= item.order
            ? orderItem.order - 1
            : orderItem.order;
      });
      moveItem.order = item.order;
      this.orderSort = true;
    },
    cardHandler(updateData) {
      updateData.forEach((data) => {
        let exist = this.card.find((c) => c.id === data.id);
        if (exist) {
          exist.message = data.message;
        } else {
          this.card.push(data);
        }
      });
    },
    cardRemove(removeData) {
      this.card = this.card.filter((item) => item.id !== removeData.id);
    },

    sortingCardOrder(listId) {
      let cardIds = this.card
        .filter((c) => c.list === listId)
        .sort((a, b) => a.order - b.order)
        .map((f) => f.id);
      cardIds.forEach((id, index) => {
        let card = this.card.find((c) => c.id === id);
        card.order = index;
      });
      this.orderSort = false;
    },

    titleChange(id, title) {
      let board = this.list.find((b) => b.id === id);
      board.boardTitle = title;
    },
  },
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