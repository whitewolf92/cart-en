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
        let items = [...cartItems];
        let item = items.find((v) => v.productId === product.id);
        if (item) {
            item.quantity += 1;
        } else {
            items.push({ productId: product.id, quantity: 1 });
        }
        setCartItems(items);
        // Would add an Alert hook here to give feedback for adding to cart.
        alert('Item added to cart!');
    };

    return (
        <div className="container mx-auto grid grid-cols-3 gap-4  mt-8">
            <div className="col-span-2">
                <img className="object-contain h-80 w-full" src={product.image} alt={product.title} />
                <div className="mt-8">
                    <h2 className="text-2xl">Description</h2>
                    <p className="mt-2">{product.description}</p>
                </div>
            </div>
            <div>
                <h1 className="text-2xl">{product.title}</h1>
                <p className="mt-2 big-price">${product.price.toFixed(2)}</p>
                <button onClick={handleAddToCart} className="btn mt-8">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;
