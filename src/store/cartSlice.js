import {configureStore, createSlice} from '@reduxjs/toolkit'
import {useNavigate} from "react-router-dom";

let cartList = createSlice({
    name: 'cartList',
    initialState: [],
    reducers: {
        increaseQty(state, id) {
            state.find((x) => {
                if (x.id === id.payload) {
                    x.qty++
                    x.totalPrice = x.qty * x.price
                }
            })
        },
        decreaseQty(state, id) {
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
        deleteCart(state, i) {
            state.splice(i.payload, 1);
        },
        addCart(state, action) {
            let product = action.payload;
            console.log(product)
            // cartCheck ? 존재하니까 + 1 : 없어서 추가
            if (product.cartCheck) {
                // 동일 제품 존재시 수량 + 1
                state.find((x) => {
                    if (x.pdtId == product.id) {
                        x.qty++
                        x.totalPrice = x.qty * x.price
                    }
                })
            } else {
                state.push({id: state.length, pdtId: product.id, name: product.title, qty: 1, price: product.price, totalPrice: product.price});
            }
        }
    }
})

export let {increaseQty, decreaseQty, setTotalPrice, deleteCart, addCart} = cartList.actions;

export default cartList;