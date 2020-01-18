<template>
  <div class="app">
    <div class="sidebar">
      <div class="sidebar__container">
        <h2 class="sidebar__title">ルーム一覧</h2>
        <ul class="sidebar__contents">
          <li class="sidebar__item" v-for="room in rooms" :key="room.name">
            <nuxt-link class="sidebar__item--link" :to="`/rooms/${room.id}`">{{ room.name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <nuxt class="container" />
  </div>
</template>

<script>
// firebase
import { db } from "../plugins/firebase"

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
  width: 30%;

  &__container {
    margin-top: 1rem;
    margin-left: 2.2rem;
  }

  &__title {
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
}

// container
.container {
  background: $main-bg;
  color: $main-color;
  width: 100%;
}
</style>
