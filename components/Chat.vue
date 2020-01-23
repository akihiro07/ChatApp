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
        thumbnail: "https://1.bp.blogspot.com/-4wfcL_kE4hg/XVjgJLRouRI/AAAAAAABUMo/n7wMY5kms9I6BiGxu6a5gIKkPipH7ls4wCLcBGAs/s450/kid_seikaku_kachiki_boy.png"
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
