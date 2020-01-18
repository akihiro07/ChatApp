<template>
  <div class="contents">
    <!-- chat -->
    <chat v-for="(message, id) in messages" :key="id" :message="message" />
  </div>
</template>

<script>
import Chat from "./Chat"
import { db } from "~/plugins/firebase"

export default {
  components: {
    Chat
  },
  data() {
    return {
      messages: []
    }
  },
  mounted() {
    // [参考][パラメータ取得]https://qiita.com/tabtt3/items/cd4405c6ab1a05d3b2c3
    const roomId = this.$route.params.id
    db.collection("rooms").doc(roomId).collection("messages").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.messages.push({id: doc.id, ...doc.data()})
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.contents {
  height: 85%;
  overflow: scroll;
  padding-top: 10px;
}
</style>
