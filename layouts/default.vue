<template>
  <div class="app">
    <div class="sidebar">
      <div class="sidebar__container">
        <h1 class="sidebar__mainTitle">Chat App</h1>
        <h2 class="sidebar__subTitle">ルーム一覧</h2>
        <ul class="sidebar__contents">
          <li class="sidebar__item" v-for="room in rooms" :key="room.name">
            <nuxt-link class="sidebar__item--link" :to="`/rooms/${room.id}`">{{ room.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <button v-if="isAuthenticated" class="sidebar__auth sidebar__logout" @click="logout">ログアウト</button>
      <button v-else class="sidebar__auth sidebar__login" @click="login">ログイン</button>
    </div>

    <nuxt class="container" />
  </div>
</template>

<script>
// firebase
import { db, firebase } from "../plugins/firebase"
import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      rooms: []
    }
  },
  mounted() {
    // room名を取得
    db.collection('rooms').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.rooms.push({id: doc.id, ...doc.data()})
        })
      })
  },
  methods: {
    ...mapActions(["setUser"]),
    /**
       * func:login
       * detail:googleログイン処理 + vuex>state>userデータ格納
       *  */
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const user = result.user // 元 => {user: obj, credential: obj, additionalUserInfo: obj, etc...}
          console.log("result:",result)
          console.log("user:",user)
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


<style lang="scss" scoped>
$side-bg: #03b361;
$main-bg: #e8e8e8;

$side-color: #ffffff;
$main-color: #272727;
$sub1-color: #03b361;
$sub2-color: #f98a8a;

.app {
  display: flex;
  height: 100vh;
}

// sidebar
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

  &__subTitle {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 3%;
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

// container
.container {
  background: $main-bg;
  color: $main-color;
  width: 100%;
}
</style>
