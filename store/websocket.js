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
  }
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

  onOpen(state) {
    state.socket.addEventListener('open', (event) => {
      console.log('Hello Server!');
      state.isLoading = false
      state.isConnected = true
    });
  },

  onError(state) {
    state.socket.addEventListener('error', (event) => {
      console.log('Error Server!');
      state.isConnected = false
      state.isLoading = false
    });
  },

  onMessage(state) {
    state.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      state.input = event.data
    });
  }
}

export const actions = {
  setIp({commit}, ip) {
    commit('SET_IP', ip)

    if (ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
      commit('SET_SOCKECT', new WebSocket(`ws://${ip}/ws`))
      commit('SET_ISLOADING', true)

      commit('onOpen')
      commit('onError')
      commit('onMessage')
    }
  }
}
