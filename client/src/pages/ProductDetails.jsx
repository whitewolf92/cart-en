import React from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

function ProductDetails(props) {
    let { cartItems, setCartItems } = props;
    const { productId } = useParams();
    const { loading, data: product } = useFetch(`https://fakestoreapi.com/products/${productId}`);

    if (loading) return <></>;
    if (!product.id) return <p>Oops! Product not found!</p>;

    const handleAddToCart = () => {
        if (cartItems) cartItems.push(product.id);
        cartItems = cartItems || [product.id];
        console.log(cartItems);
        setCartItems(cartItems);
    };

    console.log(cartItems);

    return (
        <div className="container mx-auto grid grid-cols-3 gap-4  mt-8">
            <div className="col-span-2">
                <img className="object-contain h-80 w-full" src={product.image} alt="Product Image" />
                <div className="mt-8">
                    <h2 className="text-2xl">Description</h2>
                    <p className="mt-2">{product.description}</p>
                </div>
            </div>
            <div>
                <h1 className="text-2xl">{product.title}</h1>
                <p className="mt-2 text-3xl text-yellow-600 font-semibold">${product.price.toFixed(2)}</p>
                <button onClick={handleAddToCart} className="mt-8 bg-red-600 hover:bg-red-500 active:shadow-lg px-8 py-2 text-white text-lg font-semibold ">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;
