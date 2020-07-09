<template>
  <div class="list bg-ececec box-shadow">
      <div class="title p-relative d-flex">
            <input type="text" v-model="title" >
            <div class="close pointer" @click="removeList()">🗑</div>
      </div>
      <card 
        v-for="(item, index) in carditem" 
        :key="item.id"
        @remove-card="removeCard(index)" 
        :card-item="carditem[index].message"
        @change-card="(v)=>changeCard(v, index)"
        ></card>
      <div class="addCard pointer" @click="addCard()">
          <span class="plus">+</span>
          <span>{{message}}</span>
      </div>
  </div>
</template>

<script>
import card from "../Card/card.vue";

export default {
    props:["listItem"],
    components:{
        card
    },
    watch:{
      carditem:function(){
        this.message = this.listItem.cardItem.length > 0 ? "Add another card" : "Add a card";
        this.changeEvent();
      },
      title:function(){
        this.changeEvent();
      }
    },
    data(){
        return{
            message: "Add a card",
            title : '',
            carditem : []
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.title = this.listItem.listTitle;
            this.carditem = this.listItem.cardItem;
        },
        addCard(){
            this.carditem.push({
                id : new Date().getTime(),
                message : "new card !"
            });
        },
        removeCard(index){
            this.carditem.splice(index,1);
        },
        removeList(){
            this.$emit("remove-list");
        },
        changeEvent(){
            this.$emit("changeList", {
                id: this.listItem.id,
                listTitle: this.title,
                cardItem: this.carditem
            });
        },
        changeCard(val, index){
            this.carditem[index] = {
                id : this.carditem[index].id,
                message: val
            };
            this.changeEvent();
        }
    }
}
</script>