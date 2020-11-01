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
    <div class="list bg-ececec box-shadow pointer" @click="addlist()">
      <span class="plus">{{ list | messageFilter }}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    board: () => import("./board.vue"),
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

<style lang="scss">
.board-wrap {
  display: grid;
  column-gap: 1rem;
  align-items: flex-start;
  grid-auto-flow: column;
  grid-auto-columns: 18rem;
  grid-template-columns: repeat(5, 18rem);
  height: 100%;
}
* {
  font-family: sans-serif;
}
.title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #dfdfdf;
  padding: 0.5rem;
  font-weight: 800;
}
.list {
  border-radius: 0.25rem;
}
.box-shadow {
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.bg-ececec {
  background-color: #ececec;
}
.bg-ffffff03 {
  background-color: rgba(255, 255, 255, 0.3);
}
.pointer {
  cursor: pointer;
}
.pointer:hover {
  opacity: 0.5;
  mix-blend-mode: hard-light;
}
.card {
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 0.2rem;
  margin-bottom: 0.5rem;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.addCard {
  padding: 0.5rem;
}
.addCard span {
  line-height: 1rem;
}
.plus {
  &::before {
    content: "+";
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: 0.5rem;
  }
}
.p-relative {
  position: relative;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.3;
  margin: 0.5rem;
  line-height: 1.5rem;
}
.close:hover {
  opacity: 1;
}
.d-flex {
  display: flex;
}
</style>