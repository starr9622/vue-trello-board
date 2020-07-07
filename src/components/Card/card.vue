<template>
    <div class="card pointer p-relative">
        <textarea 
        ref="textArea" 
        :style="{height : textareaHeight, width : '90%', 'max-height' : '10rem' }"
        v-model="cardItem"></textarea>
        <div class="close" @click="remove()">❌</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cardItem : "new card",
            textareaHeight : "1rem"
        }
    },
    watch:{
        cardItem(){
            if(this.$refs.textArea.scrollHeight > this.$refs.textArea.clientHeight){
                this.$nextTick(()=>{
                    this.textareaHeight= this.$refs.textArea.scrollHeight + "px";
                })
            }
        }
    },
    methods:{
        remove(){
            return this.$emit('remove-card',this);
        },
        resize(){
            console.log(this);
            
        }
    }
}
</script>
