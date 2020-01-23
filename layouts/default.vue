<template>
  <div class="app">
    <!-- component -->
    <side-bar />
    <!-- component end -->

    <nuxt class="container" />
  </div>
</template>

<script>
import SideBar from "~/components/SideBar"

export default {
  components: {
    SideBar
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

// ===== component =====
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

.el-button {
  padding: 0;
}
// ===== component end =====

// container
.container {
  background: $main-bg;
  color: $main-color;
  width: 100%;
}
</style>
