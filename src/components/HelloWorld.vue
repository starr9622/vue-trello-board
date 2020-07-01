<template>
  <div 
    class="board"
    :class="bgColor"
  >
    <header>
     💫 To-Do List 💫
    </header>
    <main class="overflow-auto p-5">
      <List />
    </main>
    <Footer :init="bgColor" @color="aa"/>
    </div>
</template>

<script>
import List from "./List/List.vue";
import Footer from "./Footer/changeBg.vue";

export default {
    name: 'HelloWorld',
    components:{
      List,
      Footer
    },
    props: {
      msg: String
    },
    data(){
      return{
        bgColor : 'wheat'
      };
    },
    mounted(){
    },
    methods:{
      aa(val){
        this.bgColor = val;
      }
    }
}
</script>

<style scoped>
.p-5{
  padding: 0.5rem;
}
.overflow-auto{
  overflow: auto;
}
.wheat{
  background-color: wheat;
}
.salmon{
  background-color: salmon;
}
.board {
  height: 100vh;
}
header{
  text-align: center;
  font-size: 1.5rem;
  font-weight: 100;
  padding: .5rem;
  background: rgba(255, 252, 252, 0.1);
  color: #fff;
}
</style>
