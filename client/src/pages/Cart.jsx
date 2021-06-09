import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/outline';

function Cart(props) {
    const { cartItems, setCartItems } = props;
    const [itemMetaData, setItemMetaData] = useState();
    const [items, setItems] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        if (!cartItems) return;

        // Since the API doesn't have an endpoint that returns fresh data of the items in the cart,
        // we fetch each product's data individually. This can be refactored if this becomes a
        // common case, but a better API response data would be a better solution.
        if (!itemMetaData) {
            console.log('finding');
            // let tmpItems = cartItems.slice(0);
            let tmpMetaData = [];
            let promises = [];

            cartItems.forEach((v, i) => {
                promises.push(
                    fetch(`https://fakestoreapi.com/products/${v.productId}`).then(async (response) => {
                        let j = await response.json();
                        tmpMetaData.push({ productId: v.productId, title: j.title, price: j.price, image: j.image });
                        // tmpItems[i] = { ...tmpItems[i], title: j.title, price: j.price, image: j.image };
                    })
                );
            });

            // Can choose to split the cart update for each promise, but we're simulating an ideal where
            // the cart information arrives in a single response.
            Promise.all(promises).then(() => {
                console.log(tmpMetaData);
                setItemMetaData(tmpMetaData);
                // updateCartTotal();
            });

            return;
        }

        // Merge persistent data with one-time metadata.
        const mergedCartData = cartItems.map((v) => ({ ...v, ...itemMetaData.find((m) => m.productId === v.productId) }));
        setItems(mergedCartData);

        // Update cart total
        let total = mergedCartData.reduce((acc, cur) => {
            return acc + cur.price * cur.quantity;
        }, 0);
        setCartTotalPrice(total);

        return () => {};
    }, [cartItems, itemMetaData]);

    const handleUpdateQuantity = (productId, quantity) => {
        quantity = Number(quantity);

        if (isNaN(quantity)) return;

        if (quantity > 999) {
            quantity = 999;
        }

        if (quantity < 1) {
            handleRemoveItem(productId);
            return;
        }

        setCartItems((prev) => prev.map((v) => (v.productId === productId ? { ...v, quantity } : v)));
    };

    const handleRemoveItem = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    return (
        <section className="container mx-auto">
            <h1 className="text-3xl font-semibold">Shopping Cart</h1>
            <div className="flex px-8 py-6 border-b">
                <p className="flex-none w-16"></p>
                <p className="pl-8 flex-grow">Product</p>
                <p className="flex-none w-24 text-center">Price</p>
                <p className="flex-none w-32 text-center">Quantity</p>
                <p className="flex-none w-24 text-center">Total Price</p>
                <p className="flex-none w-14"></p>
            </div>
            {!items.length ? (
                <div className="text-center m-4">Cart is empty.</div>
            ) : (
                items.map((v) => (
                    <div className="flex items-center px-8 py-4 hover:shadow" key={v.productId}>
                        <NavLink className="flex items-center flex-grow" key={v.id} to={`/product/${v.productId}`}>
                            <img className="flex-none object-contain h-16 w-16" src={v.image} alt={v.title} />
                            <p className="pl-8 flex-grow">{v.title}</p>
                        </NavLink>
                        <p className="flex-none w-24 text-right">${v.price.toFixed(2)}</p>
                        <p className="flex-none w-32 text-center flex place-content-center">
                            <button
                                onClick={() => {
                                    handleUpdateQuantity(v.productId, v.quantity - 1);
                                }}
                            >
                                <MinusIcon className="w-8 h-8 p-2 border" />
                            </button>
                            <input onChange={(e) => handleUpdateQuantity(v.productId, e.target.value)} className="text-center w-8 h-8 border-t border-b" type="text" value={v.quantity} />
                            <button
                                onClick={() => {
                                    handleUpdateQuantity(v.productId, v.quantity + 1);
                                }}
                            >
                                <PlusIcon className="w-8 h-8 p-2 border" />
                            </button>
                        </p>
                        <p className="flex-none w-24 text-right">${(v.price * v.quantity).toFixed(2)}</p>
                        <button onClick={() => handleRemoveItem(v.productId)} className="ml-4">
                            <TrashIcon className="flex-none w-6 h-6 m-2"></TrashIcon>
                        </button>
                    </div>
                ))
            )}

            <div className="flex items-center justify-end my-8">
                <p>Total:</p>
                <p className="ml-2 big-price">${cartTotalPrice.toFixed(2)}</p>
                <button className="btn mx-8">Checkout</button>
            </div>
        </section>
    );
}

export default Cart;
