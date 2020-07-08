<template>
    <div class="card pointer p-relative d-flex">
        <textarea 
        ref="textArea" 
        :style="{height : textareaHeight, width : '90%', 'max-height' : '10rem' }"
        v-model="message"></textarea>
        <div class="close" @click="remove()">❌</div>
    </div>
</template>

<script>
export default {
    props:["cardItem"],
    data(){
        return{
            textareaHeight : "1rem",
            message : '',
        }
    },
    watch:{
        message(){
            if(this.$refs.textArea.scrollHeight > this.$refs.textArea.clientHeight){
                this.$nextTick(()=>{
                    this.textareaHeight= this.$refs.textArea.scrollHeight + "px";
                })
            }
            this.$emit("change-card", this.message);
        }
    },
    created(){
        this.message = this.cardItem;
    },
    methods:{
        remove(){
            return this.$emit('remove-card',this);
        }
    }
}
</script>
