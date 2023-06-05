import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import {useDispatch, useSelector} from 'react-redux';
import {addCart} from './store/cartSlice';
// import styled from 'styled-components'

const ProductDetail = props => {
    let cart = useSelector((state) => state.cartList);

    let dispatch = useDispatch();

    let [count, setCount] = useState(0)
    let [alertShow, setAlertShow] = useState(true)
    let [tabIndex, setTabIndex] = useState(0);

    let [inputNumber, setInputNumber] = useState('');

    let [infoStyle, setInfoStyle] = useState({'backgroundColor': 'beige'});

    useEffect(() => {
        let time = setTimeout(() => {
            document.getElementById('productInfo').classList.remove('op0');
        }, 100)
    }, [])

    useEffect(() => {
        if (isNaN(inputNumber)) {
            alert('그러지 마세요')
        }
    }, [inputNumber])

    useEffect(() => {
        let timeout = setTimeout(() => {
            setAlertShow(false)
        }, 2000)

        return () => {
            // useEffect 동작 전에 실행 (clean up function)
            clearTimeout(timeout)
        }
    }, [count])

    const {id} = useParams()
    const product = props.products.find(el => el.id == id)

    return (
        <>
            {alertShow ? (
                <div id='alert-sale' className='alert alert-warning'>
                    2초이내 구매시 할인
                </div>
            ) : null}
            <div className='row op0' id='productInfo' style={{transition: '1.5s'}}>
                <div className='col-md-6'>
                    <img src={product.image} width='100%'/>
                </div>
                <div className='col-md-6'>
                    <h4 className='pt-5'>{product.title}</h4>
                    <p>{product.content}</p>
                    <p>{product.price}&#8361;</p>
                    <button
                        className='btn btn-outline-primary'
                        onClick={() => {
                            setCount(count + 1)
                        }}
                    >
                        주문하기
                    </button>
                    <button
                        className='btn btn-outline-secondary' style={{margin: 15}}
                        onClick={() => {
                            dispatch(addCart(product))
                        }}
                    >
                        장바구니
                    </button>
                </div>
                {/* <input
          style={{ width: '50%', margin: 'auto', marginTop: '10px' }}
          type='text'
          onChange={(e) => { setInputNumber(e.target.value) }}
        /> */}
                <Nav fill variant="tabs" defaultActiveKey="link-0" className='product-tab'>
                    <Nav.Item>
                        <Nav.Link eventKey="link-0" onClick={() => {
                            setTabIndex(0)
                        }}>상품설명</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" onClick={() => {
                            setTabIndex(1)
                        }}>상품평</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" onClick={() => {
                            setTabIndex(2)
                        }}>상품문의</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-3" onClick={() => {
                            setTabIndex(3)
                        }}>배송/교환/반품 안내</Nav.Link>
                    </Nav.Item>
                </Nav>
                {<ProductTabInfo tabIndex={tabIndex}/>}
            </div>
        </>
    )
}


const ProductTabInfo = (props) => {
    let [opacity, setOpacity] = useState(1)
    useEffect(() => {
        let time = setTimeout(() => {
            setOpacity(1)
        }, 400)

        return () => {
            clearTimeout(time)
            setOpacity(0)
        }
    }, [props.tabIndex])

    return [
        <div className='product-info' style={{'backgroundColor': 'beige', 'opacity': opacity}}>
            <h3>타이틀 설명설명1</h3>
            <p>샬라샬라 설명1</p>
        </div>,
        <div className='product-info' style={{'backgroundColor': 'red', opacity: opacity}}>
            <h3>상품평임ㅋ</h3>
            <p>개꿀인데여</p>
        </div>,
        <div className='product-info' style={{'backgroundColor': 'green', opacity: opacity}}>
            <h3>문의드립니다.</h3>
            <p>나문희</p>
        </div>,
        <div className='product-info' style={{'backgroundColor': 'blue', opacity: opacity}}>
            <h3>안됨</h3>
            <p>X</p>
        </div>,
    ][props.tabIndex]
}

export default ProductDetail
