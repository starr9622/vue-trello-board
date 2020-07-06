<template>
  <div class="list bg-ececec box-shadow">
      <div class="title p-relative">
          new List !
            <div class="close">🗑</div>
      </div>
      <component v-for="(item, index) in cards" :key="index" :is="item" @remove-card="removeCard(index)"></component>
      <div class="addCard pointer" @click="addCard()">
          <span class="plus">+</span>
          <span>{{message}}</span>
      </div>
  </div>
</template>

<script>
import card from "../Card/card.vue";

export default {
    components:{
        card
    },
    watch:{
      cards:function(){
          this.message = this.cards.length > 0 ? "Add another card" : "Add a card";
      }
    },
    data(){
        return{
            cards:[],
            message: "Add a card"
        }
    },
    methods:{
        addCard(){
            this.cards.push(card)
        },
        removeCard(index){
            this.cards.splice(index,1);
        }
    }
}
</script>