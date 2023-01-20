export const state = () => ({
  ip: null,
  isConnected: false,
  isLoading: false,
  socket: null,
})

export const getters = {
  getIsConnected(state) {
    return state.isConnected
  }
}

export const mutations = {
  setIp(state, ip) {
    state.ip = ip

    if (ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
      state.socket = new WebSocket(`ws://${ip}/ws`)
      state.isLoading = true

      state.socket.addEventListener('open', (event) => {
        state.isConnected = true
        state.isLoading = false
        console.log('Hello Server!');
      });

      state.socket.addEventListener('error', (event) => {
        state.isConnected = false
        state.isLoading = false
        console.log('Error Server!');
      });

      state.socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);
      });
    }
  }
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}
