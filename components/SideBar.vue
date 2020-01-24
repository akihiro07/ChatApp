<template>
  <div class="sidebar">
      <div class="sidebar__container">
        <h1 class="sidebar__mainTitle">Chat App</h1>
        <div class="sidebar__header">
          <h2 class="sidebar__subTitle">ルーム一覧</h2>
          <el-button class="sidebar__add-room" @click="dialogVisible = true">&#043;</el-button>
          <el-dialog title="新規ルーム追加" :visible.sync="dialogVisible" width="40%">
            <div class="add-room">
              <input class="add-room__input" type="text" v-model="roomName">
              <button class="add-room__button" @click="createRoom">追加</button>
            </div>
          </el-dialog>
        </div>
        <ul class="sidebar__contents">
          <li class="sidebar__item" v-for="room in rooms" :key="room.name">
            <nuxt-link class="sidebar__item--link" :to="`/rooms/${room.id}`">{{ room.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <button v-if="isAuthenticated" class="sidebar__auth sidebar__logout" @click="logout">ログアウト</button>
      <button v-else class="sidebar__auth sidebar__login" @click="login">ログイン</button>
    </div>
</template>

<script>
import { db, firebase } from "../plugins/firebase"
import { mapGetters, mapActions } from "vuex"
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

export default {
  data() {
    return {
      dialogVisible: false,
      rooms: [],
      roomName: null
    }
  },
  mounted() {
    // リロード時、ログインユーザー情報取得
    // [参考1]https://teratail.com/questions/147054
    // [参考2]https://firebase.google.com/docs/auth/web/manage-users?hl=JA
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        // User is signed in.
        this.setUser(user)
      }
    })
    // room名を取得
    db.collection('rooms').orderBy("createdAt")
    // [参考]https://firebase.google.com/docs/firestore/query-data/listen?hl=ja#events-local-changes
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if(change.type === "added") {
          const doc = change.doc
          this.rooms.push({id: doc.id, ...doc.data()})
        }
      })
    })
  },
  methods: {
    ...mapActions(["setUser"]),
    /**
     * func:createRoom
     * detail:新しいルームを追加
     */
    createRoom() {
      console.log(this.roomName)
      db.collection('rooms')
      .add({
        name: this.roomName,
        createdAt: new Date().getTime()
      })
        .then(() => {
          this.roomName = null
          this.dialogVisible =false
        })
        .catch(error => {
          alert(error)
        })
    },
    /**
       * func:login
       * detail:googleログイン処理 + vuex>state>userデータ格納
       *  */
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const user = result.user // 元 => {user: obj, credential: obj, additionalUserInfo: obj, etc...}
          this.setUser(user)
        })
        .catch((error) => {
          alert(error)
        })
    },
    /**
       * func:logout
       * detail:googleログアウト処理 + vuex>state>userデータ削除
       *  */
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null) // action->nutation->stateの手順
          alert("ログアウト成功！")
        })
        .catch(() => {
          alert("ログアウト失敗...")
        })
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
}
</script>

<style lang="scss">
.el-dialog__header {
    display: flex;
    justify-content: center;
}

.el-dialog__title {
  font-size: 1.375rem;
  font-weight: 600;
}
</style>


<style lang="scss" scoped>
$side-bg: #03b361;
$main-bg: #e8e8e8;

$side-color: #ffffff;
$main-color: #272727;
$sub1-color: #03b361;
$sub2-color: #f98a8a;

.sidebar {
  background: $side-bg;
  color: $side-color;
  position: relative;
  width: 30%;

  &__container {
    margin-top: 1rem;
    margin-left: 2.2rem;
  }

  &__mainTitle {
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 3%;
  }

  &__header {
    display: flex;
    margin-bottom: 3%;
  }

  &__subTitle {
    font-size: 20px;
    font-weight: 600;
  }

  &__add-room {
    background: $side-color;
    border: none;
    border-radius: 50%;
    color: $sub1-color;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    margin-left: 15px;
    text-align: center;
    width: 30px;
  }

  &__item {
    letter-spacing: 1px;
    margin-bottom: 3%;

    &--link {
      color: $side-color;
    }
  }

  &__auth {
    bottom: 3rem;
    border: none;
    color: #03b361;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    left: 50%;
    padding: 5px 15px;
    position: absolute;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
  }
}

// el-dialog
.el-button {
  padding: 0;
}

.add-room {
  align-items: baseline;
  display: flex;
  justify-content: center;

  &__input {
    font-size: 1rem;
    height: 100%;
    margin-right: 1.5rem;
    padding: 10px;
    width: 60%;
  }

  &__button {
    border: none;
    border-radius: 25px;
    background: #03b361;
    color: #ffffff;
    font-size: 1.125rem;
    padding: 3px 15px;
  }
}
</style>

