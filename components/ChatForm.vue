<template>
  <div class="form-area">
    <div class="form">
      <textarea class="form__textarea"></textarea>
      <button class="form__send" @click="login">送信</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: null
    }
  },
  methods: {
    login() {
      alert(this.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-area {
  height: 15%;
}

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
