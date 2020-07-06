<template>
    <div class="card pointer p-relative">
        new card
        <div class="close" @click="remove()">❌</div>
    </div>
</template>

<script>
export default {
    methods:{
        remove(){
            return this.$emit('remove-card',this);
        }
    }
}
</script>
