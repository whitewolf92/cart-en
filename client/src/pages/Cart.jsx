import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Cart(props) {
    const { cartItems } = props;
    const [items, setItems] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        // Since the API doesn't have an endpoint that returns fresh data of the items in the cart,
        // we fetch each product's data individually. This can be refactored if this becomes a
        // common case, but a better API response data would be a better solution.
        if (!cartItems) return;

        let tmpItems = cartItems.slice(0);
        let promises = [];

        tmpItems.forEach((v, i) => {
            promises.push(
                fetch(`https://fakestoreapi.com/products/${v.productId}`).then(async (response) => {
                    let j = await response.json();
                    tmpItems[i] = { ...tmpItems[i], title: j.title, price: j.price, image: j.image };
                })
            );
        });

        // Can choose to split the cart update for each promise, but we're simulating an ideal where
        // the cart information arrives in a single response.
        Promise.all(promises).then(() => {
            setItems(tmpItems);

            // Calculate cart total.
            let total = tmpItems.reduce((acc, cur) => {
                return acc + cur.price * cur.quantity;
            }, 0);
            console.log(total);
            setCartTotalPrice(total);
        });

        return () => {};
    }, [cartItems]);

    return (
        <section className="container mx-auto">
            <h1 className="text-3xl font-semibold">Shopping Cart</h1>
            <div className="flex px-8 py-6 border-b">
                <p className="flex-none w-16"></p>
                <p className="pl-8 flex-grow">Product</p>
                <p className="flex-none w-24 text-center">Price</p>
                <p className="flex-none w-24 text-center">Quantity</p>
                <p className="flex-none w-24 text-center">Total Price</p>
            </div>
            {items.map((v) => (
                <div className="flex items-center px-8 py-4 hover:shadow">
                    <NavLink className="flex items-center flex-grow" key={v.id} to={`/product/${v.productId}`}>
                        <img className="flex-none object-contain h-16 w-16" src={v.image} alt={v.title} />
                        <p className="pl-8 flex-grow">{v.title}</p>
                    </NavLink>
                    <p className="flex-none w-24 text-right">${v.price.toFixed(2)}</p>
                    <p className="flex-none w-24 text-center">{v.quantity}</p>
                    <p className="flex-none w-24 text-right">${(v.price * v.quantity).toFixed(2)}</p>
                </div>
            ))}

            <div className="flex items-center justify-end my-8">
                <p>Total:</p>
                <p className="ml-2 big-price">${cartTotalPrice.toFixed(2)}</p>
                <button className="btn mx-8">Checkout</button>
            </div>
        </section>
    );
}

export default Cart;
