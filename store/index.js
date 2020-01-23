// [Why?]下記がないと"RangeError: Maximum call stack size exceeded"発生
// => [解決]https://teratail.com/questions/175568
export const strict = false

export const state = () => ({
  user: null
})

export const getters = {
  /**
   * func:isAuthenticated
   * detail:ログイン有無を確認
   */
  isAuthenticated(state) {
    return !!state.user
  }
}

export const mutations = {
  setUser(state, user) { // user => payload
    state.user = user
  }
}

export const actions = {
  setUser({commit}, user) { // user => payload
    commit("setUser", user)
  }
}