<template>
  <div class="content">
    <div>
      <img :src="user.thumbnail" class="content__img" alt="画像" />
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
  data() {
    return {
      user: {
        id: 1,
        name: "akihiro",
        thumbnail:
          "https://pbs.twimg.com/profile_images/1131882065337602049/0JRUGd3S_400x400.jpg"
      }
    }
  },
  computed: {
    displayName() {
      return `@${this.user.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;

  &__img {
    border-radius: 50%;
    height: 70px;
    margin-right: 1.3rem;
    object-fit: cover;
    width: 70px;
  }
}
</style>
