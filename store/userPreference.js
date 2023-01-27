export const state = () => ({
  isDetectingNote: false,
  tuning: ["E2", "A2", "D3", "G3", "B3", "E4"],
  meter: 'HorizontalMeter',
  isListenMode: false,
})

export const mutations = {
  SET_IS_DETECTING_NOTE: (state, isDetectingNote) => state.isDetectingNote = isDetectingNote,
  SET_TUNING: (state, tuning) => state.tuning = tuning,
  SET_METER: (state, meter) => state.meter = meter,
  SET_IS_LISTEN_MODE: (state, isListenMode) => state.isListenMode = isListenMode,
}
