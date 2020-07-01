<template>
    <footer>
        <label >change background Color</label>
        <select class="colorSelect" v-model="selectColor">
            <option v-for="color in backGroundColor" :key="color" :value="color">{{color}}</option>
        </select>
    </footer>
</template>

<script>
export default {
    props:['init'],
    watch:{
        selectColor: function(val){
            this.$emit("color", val);
        }
    },
    data(){
        return {
            selectColor : "",
            backGroundColor : ["wheat", "salmon"]
        }
    },
    created(){
        this.selectColor = this.init
    }
}
</script>

<style scoped>
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