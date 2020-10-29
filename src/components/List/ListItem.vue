<template>
  <div class="list bg-ececec box-shadow">
    <div class="title p-relative d-flex">
      <input type="text" v-model="title" />
      <div class="close pointer" @click="removeList()">🗑</div>
    </div>
    <div @drop="dropHandler" @dragover.prevent class="cardDropZone">
      <div
        v-for="(item, index) in carditem"
        :key="item.id"
        draggable="true"
        @dragstart="dragStartHandler($event, item.id)"
      >
        <card
          @remove-card="removeCard(index)"
          :card-item="carditem[index].message"
          @change-card="(v) => changeCard(v, index)"
        ></card>
      </div>
    </div>
    <div class="addCard pointer" @click="addCard()">
      <span class="plus">+</span>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
import card from "../Card/card.vue";

export default {
  props: ["listItem"],
  components: {
    card,
  },
  watch: {
    carditem: function () {
      this.message =
        this.listItem.cardItem.length > 0 ? "Add another card" : "Add a card";
      this.changeEvent();
    },
    title: function () {
      this.changeEvent();
    },
  },
  data() {
    return {
      message: "Add a card",
      title: "",
      carditem: [],
      dropitem: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.title = this.listItem.listTitle;
      this.carditem = this.listItem.cardItem;
    },
    addCard() {
      this.carditem.push({
        id: new Date().getTime(),
        message: "new card !",
      });
    },
    removeCard(index) {
      this.carditem.splice(index, 1);
    },
    removeList() {
      this.$emit("remove-list");
    },
    changeEvent() {
      this.$emit("changeList", {
        id: this.listItem.id,
        listTitle: this.title,
        cardItem: this.carditem,
      });
    },
    changeCard(val, index) {
      this.carditem[index] = {
        id: this.carditem[index].id,
        message: val,
      };
      this.changeEvent();
    },
    dropHandler(e) {
      let item = e.dataTransfer.getData("dragItem");
      let beforelist = e.dataTransfer.getData("dragstartList");
      console.log(item, beforelist);
      console.log(e);
    },

    dragStartHandler(e, index) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("dragItem", index);
      e.dataTransfer.setData("dragstartList", this.listItem.id);
    },
  },
};
</script>

<style scoped>
.cardDropZone {
}
</style>