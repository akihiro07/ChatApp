<template>
  <div class="contents">
    <!-- chat -->
    <chat v-for="(message, id) in messages" :key="id" :message="message" />
  </div>
</template>

<script>
import Chat from "./ChatArea/Chat"
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
    db.collection("rooms").doc(roomId).collection("messages").orderBy("createdAt")
      .onSnapshot((snapshot) => {
        // snapshot.docChanges() => DBの変更点を取得可能（初期は全データを取得）
        snapshot.docChanges().forEach((change) => {
          // "added(追加)"したデータのみを判別
          if(change.type === "added") {
            this.messages.push({id: change.doc.id, ...change.doc.data()})
          }
        })
      })
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
