<template>
  <trello />
</template>

<script>
export default {
  name: "Home",
  components: {
    Trello: () => import("@/components/Trello"),
  },
};
</script>
