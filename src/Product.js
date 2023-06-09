import {useState} from 'react'

function Product() {
    let data = [
        {
            id: 0,
            title: 'White and Black',
            content: 'Born in France',
            image: 'https://codingapple1.github.io/shop/shoes1.jpg',
            price: 120000
        },

        {
            id: 1,
            title: 'Red Knit',
            content: 'Born in Seoul',
            image: 'https://codingapple1.github.io/shop/shoes2.jpg',
            price: 110000
        },

        {
            id: 2,
            title: 'Grey Yordan',
            content: 'Born in the States',
            image: 'https://codingapple1.github.io/shop/shoes3.jpg',
            price: 130000
        }
    ]

    return data;
}

export const findProductById = (id) => {
    let products = Product();
    let object = products.find((product) => {
        if (product.id == id) {
            return product
        }
    })

    return object;
}

export default Product
