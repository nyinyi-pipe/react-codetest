import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: false,
    user: '',
    patient: '',
  },
  reducers: {
    loginSuccess: (state) => {
      state.login = true
    },
    addUser: (state, action) => {
      state.user = action.payload
    },
    addUserP: (state, action) => {
      state.patient = action.payload
    },
    logoutSuccess: (state) => {
      state.login = false
      state.user = ''
      state.patient = ''
    },
  },
})

export const { loginSuccess, addUser, addUserP, logoutSuccess } =
  userSlice.actions
export default userSlice.reducer
