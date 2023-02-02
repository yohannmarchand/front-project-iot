export const state = () => ({
  ip: null,
  IS_CONNECTED: false,
  IS_LOADING: false,
  socket: null,
  input: 0,
  note: null,
})

export const mutations = {
  SET_IP(state, ip) {
    state.ip = ip
  },

  SET_IS_LOADING(state, IS_LOADING) {
    state.IS_LOADING = IS_LOADING
  },

  SET_IS_CONNECTED(state, IS_CONNECTED) {
    state.IS_CONNECTED = IS_CONNECTED
  },
  SET_SOCKECT(state, socket) {
    state.socket = socket
  },

  SET_INPUT(state, input) {
    state.input = input
  },

  CLOSE_WEBSOCKET(state) {
    state.websocket?.close()
    state.websocket = null
  },

  SET_NOTE(state, note) {
    state.note = note
  }
}

export const actions = {
  connectToWebSocket({ commit, dispatch }, ip) {
    if (ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
      commit('SET_IP', ip)

      commit('CLOSE_WEBSOCKET')
      commit('SET_SOCKECT', new WebSocket(`ws://${ip}/ws`))
      commit('SET_IS_LOADING', true)

      dispatch('onOpen')
      dispatch('onError')
      dispatch('onMessage')
    }
  },

  onOpen({ state, commit }) {
    state.socket.addEventListener('open', (event) => {
      console.log('Hello Server!');
      commit('SET_IS_LOADING', false)
      commit('SET_IS_CONNECTED', true)
    });
  },

  onError({ state, commit }) {
    state.socket.addEventListener('error', (event) => {
      console.log('Error Server!');
      commit('SET_IS_CONNECTED', false)
      commit('SET_IS_LOADING', false)
    });
  },

  onMessage({ state, commit }) {
    state.socket.addEventListener('message', (event) => {
      const data = event.data.split(' ')

      console.log(data)
      commit('SET_INPUT', data[0])
      commit('SET_NOTE', data[1])
    });
  }
}
