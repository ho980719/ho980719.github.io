import { configureStore, createSlice } from '@reduxjs/toolkit'
import cartList from './store/cartSlice.js'

let user = createSlice({
  name : 'user',
  initialState : {name : 'junho', age : 26},
  reducers : {
    changeName(state) {
      state.name = '박'
    },
    increaseAge(state, i) {
      state.age += i.payload
    }
  }
})

export let { changeName, increaseAge } = user.actions


let stock = createSlice({
  name : 'stock',
  initialState : [17, 13, 15]
})

export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    cartList : cartList.reducer,
  }
}) 