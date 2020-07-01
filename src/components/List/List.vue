<template>
    <div style="display : flex;">
        <component v-for="(item, index) in list" :key="index" :is="item"></component>
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
        if (this.list.length > 0){
          this.message = "Add another list";
        }
      }
    },
    data(){
        return{
            list :[],
            message: "Add a list"
        }
    },
    methods:{
        addlist(){
            this.list.push(ListItem);
        }
    }
}
</script>

<style>
#title{
  margin-top: 0;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 0.5rem;
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
</style>