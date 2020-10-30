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
        @dragstart="dragStartHandler($event, item)"
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
  props: ["listItem", "card"],
  components: {
    card,
  },
  computed: {
    carditem: function () {
      return this.card;
    },
  },
  watch: {
    carditem: function () {
      this.message =
        this.carditem.length > 0 ? "Add another card" : "Add a card";
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
      dropitem: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.title = this.listItem.listTitle;
    },
    addCard() {
      this.carditem.push({
        id: new Date().getTime(),
        message: "new card !",
        list: this.listItem.id,
      });
      this.$emit("changeCard", this.carditem);
    },
    removeCard(index) {
      this.carditem.splice(index, 1);
    },
    removeList() {
      this.$emit("remove-list");
    },
    changeEvent() {
      this.$emit("changeCard", this.carditem);
    },
    changeCard(val, index) {
      this.carditem[index] = {
        id: this.carditem[index].id,
        message: val,
        list: this.listItem.id,
      };
      this.changeEvent();
    },
    dropHandler(e) {
      this.$emit("changeTest", {
        card: e.dataTransfer.getData("dragItem"),
        list: this.listItem.id,
      });
    },

    dragStartHandler(e, item) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("dragItem", item.id);
    },
  },
};
</script>

<style scoped>
.cardDropZone {
  padding: 1rem;
}
</style>