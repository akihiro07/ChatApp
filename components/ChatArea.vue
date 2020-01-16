<template>
  <div class="contents">
    <!-- chat -->
    <chat />
    <chat />
    <chat />
    <chat />
    <chat />
    <chat />
    <chat />
    <chat />
    <chat />
    <chat />
  </div>
</template>

<script>
import Chat from "./Chat"

export default {
  components: {
    Chat
  }
}
</script>

<style lang="scss" scoped>
.contents {
  height: 85%;
  overflow: scroll;
  padding-top: 10px;
}
</style>
