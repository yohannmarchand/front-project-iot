export const state = () => ({
  isDetectingNote: false,
  tuning: 'EADGBE',
})

export const mutations = {
  SET_IS_DETECTING_NOTE: (state, isDetectingNote) => state.isDetectingNote = isDetectingNote,
  SET_TUNING: (state, tuning) => state.tuning = tuning,
}
