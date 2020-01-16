<template>
  <div>
    <div class="container__layout">
      <!-- === room名部分 === -->
      <container-header />
      <!-- === main部分 === -->
      <main class="container__main">
        <!-- chats -->
        <div class="contents">
          <!-- chat -->
          <div class="content">
            <div>
              <img class="content__img" src="~/assets/sample.jpg" alt="画像" />
            </div>
            <div>
              <div>@name</div>
              <div>texttext</div>
            </div>
          </div>

          <!-- chat -->
          <div class="content">
            <div>
              <img class="content__img" src="~/assets/sample.jpg" alt="画像" />
            </div>
            <div>
              <div>@name</div>
              <div>texttext</div>
            </div>
          </div>
        </div>
        <!-- input&send -->
        <div class="form-area">
          <div class="form">
            <textarea class="form__textarea"></textarea>
            <button class="form__send">送信</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import ContainerHeader from "../components/ContainerHeader"

export default {
  components: {
    ContainerHeader
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

.contents {
  height: 85%;
  overflow: scroll;
  padding-top: 10px;
}
.form-area {
  height: 15%;
}

// content component
.content {
  display: flex;

  &__img {
    border-radius: 50%;
    height: 80px;
    margin-right: 1.3rem;
    object-fit: cover;
    width: 80px;
  }
}

// form component
.form {
  align-items: flex-end;
  display: flex;
  font-size: 16px;
  height: 80%;
  justify-content: end;

  &__textarea {
    font-size: 16px;
    height: 100%;
    margin-right: 1.5rem;
    padding: 10px;
    resize: none;
    width: 80%;
  }

  &__send {
    background: #03b361;
    border: none;
    box-sizing: border-box;
    border-radius: 25px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    padding: 5px 25px;
  }
}
</style>
