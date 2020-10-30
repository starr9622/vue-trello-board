<template>
  <div class="list bg-ececec box-shadow">
    <div class="title p-relative d-flex">
      <input type="text" v-model="title" />
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
        order: this.carditem.length,
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
        ...this.carditem[index],
        message: val,
      };
      this.changeEvent();
    },
    dropHandler(to, e) {
      this.$emit("changeItem", {
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
      this.dropitem = e.target;
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