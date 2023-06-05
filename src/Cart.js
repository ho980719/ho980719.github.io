import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {increaseAge} from './store'
import {decreaseQty, deleteCart, increaseQty} from './store/cartSlice.js'
import Button from 'react-bootstrap/Button';

const Cart = () => {
    let user = useSelector((state) => state.user)
    let cartList = useSelector((state) => state.cartList)
    let dispatch = useDispatch(); // store.js로 보내 요청하는 함수
    return (
        <div>
            <h4>{user.name} 장바구니 나이는 {user.age}</h4>
            <button type='button' onClick={() => dispatch(increaseAge(1))}>떡국</button>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>
                        <input type='checkbox'/>
                    </th>
                    <th scope='col'>name</th>
                    <th scope='col'>qty</th>
                    <th scope='col'>price</th>
                    <th scope='col'></th>
                </tr>
                </thead>
                <tbody>
                {
                    cartList.map(function (el, i) {
                        return (
                            <tr key={el.id}>
                                <th scope='row'><input type='checkbox'/></th>
                                <td>{el.name}</td>
                                <td>
                                    <div className='box-qty'>
                                        <button className='btn-qty' onClick={() => {
                                            dispatch(decreaseQty(el.id))
                                        }}>-
                                        </button>
                                        <input type='text' defaultValue={el.qty} key={el.qty}/>
                                        <button className='btn-qty' onClick={() => {
                                            dispatch(increaseQty(el.id))
                                        }}>+
                                        </button>
                                    </div>
                                </td>
                                <td>{el.totalPrice}</td>
                                <td>
                                    <Button variant="outline-danger" size='sm' onClick={() => {
                                        dispatch(deleteCart(i))
                                    }}>삭제</Button>
                                </td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
        </div>
    )
}

export default Cart
