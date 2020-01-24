<template>
  <div class="sidebar">
      <div class="sidebar__container">
        <h1 class="sidebar__mainTitle">Chat App</h1>
        <div class="sidebar__header">
          <h2 class="sidebar__subTitle">ルーム一覧</h2>
          <add-new-room />
        </div>
        <ul class="sidebar__contents">
          <li class="sidebar__item" v-for="room in rooms" :key="room.name">
            <nuxt-link class="sidebar__item--link" :to="`/rooms/${room.id}`">{{ room.name }}</nuxt-link>
            <el-button class="sidebar__item--icon" @click="isOpenDialog(room)">
              <i class="el-icon-delete-solid"></i>
            </el-button>
          </li>
        </ul>
      </div>
      <button v-if="isAuthenticated" class="sidebar__auth sidebar__logout" @click="logout">ログアウト</button>
      <button v-else class="sidebar__auth sidebar__login" @click="login">ログイン</button>

      <!-- ダイアログ表示 -->
      <el-dialog title="ルーム削除" :visible.sync="openDialog" width="30%">
        <span>『{{roomName}}』内のトーク履歴が全て削除されてしまいます。<br>本当に削除してよろしいですか？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="openDialog = false">いいえ</el-button>
          <el-button type="primary" @click="deleteRoom(roomId)">はい</el-button>
        </span>
      </el-dialog>
      <!-- ダイアログ表示 end -->
    </div>
</template>

<script>
import AddNewRoom from "~/components/SideBar/AddNewRoom"
import { db, firebase } from "../plugins/firebase"
import { mapGetters, mapActions } from "vuex"
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { debuglog } from 'util';

Vue.use(ElementUI)

export default {
  components: {
    AddNewRoom
  },
  data() {
    return {
      rooms: [],
      roomName: null,
      roomId: null,
      openDialog: false
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
        const doc = change.doc
        if(change.type === "added") {
          this.rooms.push({id: doc.id, ...doc.data()})
        } else if(change.type === "removed") {
          this.rooms.splice(change.oldIndex, 1)
        }
      })
    })
  },
  methods: {
    ...mapActions(["setUser"]),
    /**
     * func:isOpenDialog
     * detail:room削除確認のモーダル表示 + el-buttonから各ルーム情報をdataに格納
     */
    isOpenDialog(room) {
      // TODO:"this.rooData = room"でroom objectを格納するとエラーが出る
      this.roomName = room.name
      this.roomId = room.id
      this.openDialog = true
    },
    /**
     * func:deleteRoom
     * detail:room削除
     */
    deleteRoom(roomId) {
      db.collection("rooms").doc(roomId).delete()
      .then(() => {
        this.roomName = null
        this.roomId = null
        this.openDialog = false
      }).catch((error) => {
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
    margin-left: 1.2rem;
    margin-right: 1.2rem;
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

  &__item {
    align-items: center;
    display: flex;
    justify-content: space-between;
    letter-spacing: 1px;
    margin-bottom: 4%;

    &:hover {
      background: #108951;
    }

    &--link {
      color: $side-color;
    }

    &--icon {
    color: #03b361;
    font-size: 1rem;
    padding: 3px;
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
</style>

