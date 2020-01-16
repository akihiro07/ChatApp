<template>
  <div class="app">
    <div class="sidebar">
      <div class="sidebar__container">
        <h2 class="sidebar__title">ルーム一覧</h2>
        <ul class="sidebar__contents">
          <!-- 仮のUI -->
          <li class="sidebar__item">#room1</li>
          <li class="sidebar__item">#room2</li>
          <li class="sidebar__item">#room3</li>
        </ul>
      </div>
    </div>

    <nuxt class="container" />
  </div>
</template>

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
  }

  &__item {
    letter-spacing: 1px;
  }
}

// container
.container {
  background: $main-bg;
  color: $main-color;
  width: 100%;
}
</style>
