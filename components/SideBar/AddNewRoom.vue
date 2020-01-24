<template>
  <div class="add-room-layout">
    <el-button class="add-room" @click="dialogVisible = true">&#043;</el-button>
    <el-dialog title="ルーム追加" :visible.sync="dialogVisible" width="40%">
      <div class="add-room-modal">
        <input class="add-room-modal__input" type="text" v-model="roomName">
        <button class="add-room-modal__button" @click="createRoom">追加</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase"

export default {
  data() {
    return {
      dialogVisible: false,
      roomName: null
    }
  },
  methods: {
    /**
     * func:createRoom
     * detail:新しいルームを追加
     */
    createRoom() {
      db.collection('rooms')
      .add({
        name: this.roomName,
        createdAt: new Date().getTime()
      })
        .then(() => {
          this.roomName = null
          this.dialogVisible =false
        })
        .catch(error => {
          alert(error)
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.add-room-layout {
  display: inherit;
}

.add-room {
  background: #ffffff;
  border: none;
  border-radius: 50%;
  color: #03b361;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 15px;
  text-align: center;
  width: 30px;
}

.el-button {
  padding: 0;
}

.add-room-modal {
  align-items: baseline;
  display: flex;
  justify-content: center;

  &__input {
    font-size: 1rem;
    height: 100%;
    margin-right: 1.5rem;
    padding: 10px;
    width: 60%;
  }

  &__button {
    border: none;
    border-radius: 25px;
    background: #03b361;
    color: #ffffff;
    font-size: 1.125rem;
    padding: 3px 15px;
  }
}
</style>
