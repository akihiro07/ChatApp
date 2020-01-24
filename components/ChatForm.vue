<template>
  <div class="form-area">
    <div class="form">
      <!-- want:enterを押した時にも送信できるoption付けたい -->
      <textarea class="form__textarea" v-model="message"></textarea>
      <button class="form__send" @click="sendMessage">送信</button>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase"

export default {
  data() {
    return {
      message: null
    }
  },
  methods: {
    //[参考][firebaseにメッセージ追加]https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja
    /**
     * func:sendMessage
     * detail:firestoreに情報を格納(メッセージ送信) + ChatAreaで使用 
     */
    sendMessage() {
      const roomId = this.$route.params.id
      // Add a new document with a generated id.
      db.collection("rooms").doc(roomId).collection("messages")
      .add({
        message: this.message,
        createdAt: new Date().getTime(),
        user: {
          name: this.user.displayName, // this.userはcomputedを表す
          thumbnail: this.user.photoURL
        }
      })
        .then(() => {
          this.message = null
        })
    }
  },
  computed: {
    // method内でも使える！
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>
.form-area {
  height: 15%;
}

.form {
  align-items: flex-end;
  display: flex;
  font-size: 1rem;
  height: 80%;
  justify-content: end;

  &__textarea {
    font-size: 1rem;
    height: 100%;
    margin-right: 1.5rem;
    padding: 10px;
    resize: none;
    width: 80%;
  }

  &__send {
    background: #03b361;
    border: none;
    box-sizing: border-box;
    border-radius: 25px;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    padding: 5px 25px;
  }
}
</style>
