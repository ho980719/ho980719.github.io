import './App.css'
import {createContext, useEffect, useState} from 'react'
import logo from './logo.svg'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Product, {findProductById} from './Product.js'
import ProductDetail from './ProductDetail.js'
import Card from 'react-bootstrap/Card';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios'
import Cart from './Cart.js'
import product from "./Product.js";

export let Context1 = createContext();

function App() {
    const localViewProducts = JSON.parse(localStorage.getItem('views'));
    const viewProducts = [...localViewProducts].reverse();
    useEffect(() => {
        if (localViewProducts === null) {
            localStorage.setItem('views', JSON.stringify([]));
        }
    }, [])
    let obj = {name : 'kim'};

    let navigate = useNavigate();
    let [products, setProducts] = useState(Product())
    let [click, setClick] = useState(0);
    let [alertShow, setAlertShow] = useState(false);

    let [qty, setQty] = useState([10, 15, 13])

    const clickCheck = () => {
        return click < 2 ? <button style={{width: '50%', padding: 20, margin: 20}} type='button' onClick={() => {
            setClick(click + 1)
        }}>버튼임</button> : null
    }

    useEffect(() => {
        if (click == 1) {
            axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((e) => {
                    setProducts(products.concat(e.data))
                })
                .catch(() => {
                    alert('통신실패')
                })
                .finally(() => {
                    setAlertShow(false);
                })
        } else if (click == 2) {
            axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((e) => {
                    setProducts(products.concat(e.data))
                })
                .catch(() => {
                    alert('통신실패')
                })
                .finally(() => {
                    setAlertShow(false);
                })
        } else if (click > 2) {
            alert('나가')
        }

        return () => {
            setAlertShow(true);
        }
    }, [click])

    return (
        <div className='App'>
            <Header navigate={navigate}/>
            <div>
            </div>
            <Routes><Route path='/' element={<div className='main-bg'></div>}/></Routes>
            <div className='container' id='container'>
                <Routes>
                    <Route path='/'
                           element={<ProductList products={products} navigate={navigate} clickCheck={clickCheck}/>}/>
                    <Route path={'/detail/:id'} element={
                        <ProductDetail products={products} navigate={navigate}/>
                    }/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path='/event' element={
                        <>
                            <div>
                                <h1>오늘의 이벤트</h1>
                            </div>
                            <div><Outlet/></div>
                        </>
                    }>
                        <Route path='one' element={<><p>양배추즙 서비스</p></>}/>
                        <Route path='two' element={<><p>생일기념 쿠폰받기</p></>}/>
                    </Route>
                    <Route path='*' element={
                        <div>
                            없는 페이지입니다
                        </div>
                    }/>
                </Routes>
            </div>
            {
                viewProducts &&
                <div>
                    <h1>최근본 상품</h1>
                    <div className='view-products'>
                        {
                            viewProducts.map(function (el, i) {
                                if (findProductById(el) !== undefined) {
                                    return (
                                        <img key={i} width={100} style={{margin:10}} src={findProductById(el).image} />
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            }
            {alertShow ? <AlertBox text='loading...'/> : null}
        </div>
    )
}

function Header({navigate}) {
    return (
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='#' onClick={() => {
                    navigate('/')
                }}>
                    <img
                        src={logo}
                        width='50'
                        height='auto'
                        className='d-inline-block align-top'
                        alt='React Bootstrap logo'
                    />
                    Dogi Shop1
                </Navbar.Brand>
                <Nav.Link href='#deets' className='c'>Cart</Nav.Link>
                <Nav.Link href='#deets'>Mypage</Nav.Link>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='#' onClick={() => {
                            navigate('/cart')
                        }}>Cart</Nav.Link>
                        <Nav.Link href='#' onClick={() => {
                            navigate('/event/one')
                        }}>Event</Nav.Link>
                        <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
                            <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                            <NavDropdown.Item href='#action/3.2'>
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href='#action/3.4'>
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href='#deets'>More deets</Nav.Link>
                        <Nav.Link eventKey={2} href='#memes'>
                            Dank memes
                        </Nav.Link>
                    </Nav>
                    <Form className='d-flex'>
                        <Form.Control
                            type='search'
                            placeholder='Search'
                            className='me-2'
                            aria-label='Search'
                        />
                        <Button variant='outline-success'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const ProductList = (props) => {
    return (
        <>
            <div className='row justify-content-around'>
                {
                    props.products.map(function (product, i) {
                        return (
                            <ProductCard product={product} key={i} navigate={props.navigate}/>
                        )
                    })
                }
            </div>
            {props.clickCheck()}
        </>
    )
}

function ProductCard(props) {
    return (
        <div style={{width: '18rem'}} className='mt-4'>
            <Card style={{width: '100%'}} className='col-sm-12 col-md-6 col-lg-4 shadow-sm'
                  onClick={() => {
                      props.navigate(`/detail/${props.product.id}`)
                  }}>
                <Card.Img variant="top" src={props.product.image}/>
                <Card.Body>
                    <Card.Title>{props.product.title}</Card.Title>
                    <Card.Text>{props.product.content}</Card.Text>
                    <Card.Text>{props.product.price}&#8361;</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}



const AlertBox = (props) => {
    return (
        <div className='alertBox'>
            <p>{props.text}</p>
        </div>
    )
}
export default App
