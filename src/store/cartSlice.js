import { configureStore, createSlice } from '@reduxjs/toolkit'

let cartList = createSlice({
  name: 'cartList',
  initialState: [
    { id: 0, name: 'White and Black', qty: 2, price: 10000, totalPrice: 20000 },
    { id: 2, name: 'Grey Yordan', qty: 1, price: 15000, totalPrice: 15000 }
  ],
  reducers: {
    increaseQty (state, id) {
      state.find((x) => {
        if (x.id === id.payload) {
          x.qty++
          x.totalPrice = x.qty * x.price
        }
      })
    },
    decreaseQty (state, id) {
      state.find(x => {
        if (x.id === id.payload) {
          if (x.qty == 1) {
            alert('개수를 0개로 할순 없잖아')
            return false
          }
          x.qty--
          x.totalPrice = x.qty * x.price
        }
      })
    },
    deleteCart (state, i) {
      state.splice(i.payload, 1);
    },
    addCart(state, action) {
        state.push(action.payload);
    }
  }
})

export let { increaseQty, decreaseQty, setTotalPrice, deleteCart, addCart } = cartList.actions;

export default cartList;