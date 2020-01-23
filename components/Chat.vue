<template>
  <div class="content">
    <div>
      <img :src="message.user.thumbnail" class="content__img" alt="画像" />
    </div>
    <div>
      <div class="content__user-name">{{ displayName }}</div>
      <div class="content__message">{{ message.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  computed: {
    displayName() {
      return `@${this.message.user.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;

  &__img {
    border-radius: 50%;
    height: 60px;
    margin-right: 1.3rem;
    object-fit: cover;
    width: 60px;
  }
}
</style>
