export const state = () => ({
  ip: null,
  isConnected: false,
  isLoading: false,
  socket: null,
  input: 0,
})

export const getters = {
  getIsConnected(state) {
    return state.isConnected
  },
}

export const mutations = {
  SET_IP(state, ip) {
    state.ip = ip
  },

  SET_ISLOADING(state, isLoading) {
    state.isLoading = isLoading
  },

  SET_ISCONNECTED(state, isConnected) {
    state.isConnected = isConnected
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
}

export const actions = {
  connectToWebSocket({ commit, dispatch }, ip) {
    if (ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
      commit('SET_IP', ip)

      commit('CLOSE_WEBSOCKET')
      commit('SET_SOCKECT', new WebSocket(`ws://${ip}/ws`))
      commit('SET_ISLOADING', true)

      dispatch('onOpen')
      dispatch('onError')
      dispatch('onMessage')

      window.setInterval(() => {
        commit('SET_INPUT', Math.floor(Math.random() * (500 - 200 + 1) + 200))
      }, 500)
    }
  },

  onOpen({ state, commit }) {
    state.socket.addEventListener('open', (event) => {
      console.log('Hello Server!');
      commit('SET_ISLOADING', false)
      commit('SET_ISCONNECTED', true)
    });
  },

  onError({ state, commit }) {
    state.socket.addEventListener('error', (event) => {
      console.log('Error Server!');
      commit('SET_ISCONNECTED', false)
      commit('SET_ISLOADING', false)
    });
  },

  onMessage({ state, commit }) {
    state.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      commit('SET_INPUT', event.data)
    });
  }
}
