<template>
  <div>
    <div class="container__layout">
      <!-- === room名部分 === -->
      <container-header />
      <!-- === main部分 === -->
      <main class="container__main">
        <!-- chats -->
        <chat-area />
        <!-- input&send -->
        <chat-form />
      </main>
    </div>
  </div>
</template>

<script>
import ContainerHeader from "~/components/ContainerHeader"
import ChatArea from "~/components/ChatArea"
import ChatForm from "~/components/ChatForm"

export default {
  components: {
    ContainerHeader,
    ChatArea,
    ChatForm
  }
}
</script>

<style lang="scss" scoped>
.container__layout {
  height: 100%;
  margin-right: 2.2rem;
  margin-left: 2.2rem;
}
.container__main {
  height: 92%;
}
</style>
