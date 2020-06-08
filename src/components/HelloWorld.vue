<template>
  <div class="hello">
    <header>
     💫 To-Do List 💫
    </header>
    <div class="list">
      <p id="title">list</p>
      <div class="card">
        card
      </div>
      <div class="addCard">
        Add anorder card
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.hello {
  background-color: #42b983;
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
  width: 15rem;
  background-color: #ececec;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.1);
}
.card{
  padding: 0.5rem;
  background-color: #e2e2e2;
  border-radius: 0.2rem;
  margin-bottom: 0.5rem;
}
.addCard{
  
}
</style>
