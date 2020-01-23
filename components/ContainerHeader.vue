<template>
  <div class="container__header">
    <h2 class="title">{{ roomName }}</h2>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase"

export default {
  data() {
    return {
      roomName: null
    }
  },
  mounted() {
    // [参考]https://goq.to/MDA2ODIz
  const roomId = this.$route.params.id
  db.collection("rooms").doc(roomId).get()
    .then(doc => {
      this.roomName = doc.data().name
    })
  }
}
</script>


<style lang="scss" scoped>
.container__header {
  align-items: center;
  border-bottom: 1px solid #474747;
  display: flex;
  height: 8%;
}
</style>
