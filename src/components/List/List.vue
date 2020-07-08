<template>
    <div class="d-flex">
        <list-item 
          v-for="(item, index) in list" :index="index" v-bind:key="item.id"
          @remove-list="removeList(index)"
          @changeList="(v)=>changeItem(v,index)" 
          :list-item="list[index]">
        </list-item>
        <div class="list bg-ffffff03 pointer" @click="addlist()">
            <span class="plus">+</span>
            {{message}}
        </div>
    </div>
</template>

<script>
import ListItem from "./ListItem.vue";
export default {
    components:{
        ListItem,
    },
    watch:{
      list:function(){
        this.message = this.list.length > 0 ? "Add another list" : "Add a list";
        localStorage.setItem("ListItem", JSON.stringify(this.list));
        console.log("changed!!");
      }
    },
    data(){
        return{
            message: "Add a list",
            list: []
        }
    },
    created: function(){
      if(localStorage.getItem("ListItem")) this.list = JSON.parse(localStorage.getItem("ListItem"));
    },
    methods:{
        addlist(){
          this.list.push({
            id: new Date().getTime(),
            listTitle : "new List !",
            cardItem : []
          });
        },
        removeList(index){
          this.list.splice(index,1);
          this.$nextTick(()=>{
            this.list = JSON.parse(localStorage.getItem("ListItem"));
          });
        },
        changeItem(newVal, index){
          this.list[index] = newVal;
          localStorage.setItem("ListItem", JSON.stringify(this.list));
        }
    }
}
</script>

<style>
*{
  font-family: sans-serif;
}
.title{
  margin-top: 0;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #dfdfdf;
  padding: 0.5rem;
  font-weight: 800;
}
.list{
  width: 18rem;
  min-width: 18rem;
  height: fit-content;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
.box-shadow{
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.1);
}
.bg-ececec{
  background-color: #ececec;
}
.bg-ffffff03{
  background-color: rgba(255,255,255,0.3);
}
.pointer{
  cursor: pointer;
}
.pointer:hover{
  opacity: 0.5;
  mix-blend-mode: hard-light;
}
.card{
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 0.2rem;
  margin-bottom: 0.5rem;
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);
}
.addCard{
  padding: 0.5rem;
}
.addCard span{
  line-height: 1rem;
}
.plus{
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: .5rem;
}
.p-relative{
  position: relative;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.3;
  margin: .5rem;
  line-height: 1.5rem;
}
.close:hover {
  opacity: 1;
}
.d-flex{
  display: flex;
}
</style>