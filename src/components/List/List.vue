<template>
  <div class="d-flex">
    <list-item
      v-for="(item, index) in list"
      :index="index"
      v-bind:key="item.id"
      @remove-list="removeList(index)"
      @changeItem="changeItem"
      :list-item="list[index]"
      :cardlist="item.id | cardFilter(card)"
      @changeCard="cardHandler"
      @removeCard="cardRemove"
    >
    </list-item>
    <div class="list bg-ffffff03 pointer" @click="addlist()">
      <span class="plus">{{ list | messageFilter }}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "list-item": () => import("./ListItem.vue"),
  },
  filters: {
    cardFilter: (id, card) =>
      card.filter((c) => c.list === id).sort((a, b) => a.order - b.order),
    messageFilter: (list) => (list.length ? "Add another list" : "Add a list"),
  },
  data() {
    return {
      list: [],
      card: [],
    };
  },
  methods: {
    addlist() {
      this.list.push({
        id: new Date().getTime(),
        listTitle: "new List !",
      });
    },
    removeList(index) {
      this.list.splice(index, 1);
    },
    changeItem(item) {
      const changeList = parseInt(item.list);
      if (item.order === -1 && this.card.find((c) => c.list === changeList)) {
        return;
      }
      let moveItem = this.card.find((i) => i.id === parseInt(item.card));
      let orderList = this.card.filter((c) => c.list === changeList);
      this.$nextTick(() => {
        moveItem.list = changeList;
        orderList.forEach((list) => {
          let orderItem = this.card.find((c) => c.id === list.id);
          orderItem.order =
            orderItem.order >= item.order
              ? orderItem.order + 1
              : orderItem.order;
        });
        moveItem.order = item.order;
      });
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
      let remove = this.card.findIndex((c) => c.id === removeData.id);
      this.card.splice(remove, 1);
    },
  },
};
</script>

<style lang="scss">
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
  width: 18rem;
  min-width: 18rem;
  height: fit-content;
  margin: 0.5rem;
  padding: 0.5rem;
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