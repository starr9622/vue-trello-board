<template>
  <div 
    class="board"
    :class="selectColor"
  >
    <header>
     💫 To-Do List 💫
    </header>
    <main>
      <div class="list">
        <p id="title">list</p>
        <div class="card hover">
          card
        </div>
        <div class="addCard hover">
          <span class="plus">+</span>
          <span>Add anorder card</span>
        </div>
      </div>
      <div class="list">
        <p id="title">list</p>
        <div class="addCard hover">
          <span class="plus">+</span>
          <span>Add a card</span>
        </div>
      </div>
      <div class="AddList">
        <span class="plus">+</span>
        Add a List
      </div>
    </main>
    <footer>
      <label >change background Color</label>
      <select class="colorSelect" v-model="selectColor">
        <option v-for="color in backGroundColor" :key="color" :value="color">{{color}}</option>
      </select>
    </footer>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data(){
      return{
        selectColor : "wheat",
        backGroundColor : ["wheat", "salmon"]
      };
    },
    mounted(){
    },
    methods:{
      changeBackGround(){
        let num = Math.floor(Math.random() * this.backGroundColor.length);
        this.selectColor = this.backGroundColor[num];
    }
  }
}
</script>

<style scoped>
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
p#title{
  margin-top: 0;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 0.5rem;
  font-weight: 800;
}
.list{
  width: 18rem;
  height: fit-content;
  background-color: #ececec;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.1);
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
.hover:hover{
  background: rgba(0,0,0,0.3);
  cursor: pointer;
}
main{
  display: flex;
}
.AddList{
  width: 18rem;
  background-color: rgba(255,255,255,0.3);
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin: 0.5rem;
  height: fit-content;
}
.AddList:hover{
  background: rgba(255,255,255,0.4);
  cursor: pointer;
}
.colorSelect{
  background-color: rgba(0,0,0,0.3);
  height: 1rem;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 100 !important;
}
footer label{
  font-weight: 100;
  margin-right: 1rem;
}
footer{
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
select {
  text-shadow: 0 0 0 #000 !important;
}
:focus {
outline: 0;
}
</style>
