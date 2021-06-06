import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const ProductList = (props) => {
    const [selectedCategory, setSelectedCategory] = useState();
    const { data: categories } = useFetch('https://fakestoreapi.com/products/categories');
    const { data: products } = useFetch('https://fakestoreapi.com/products');

    console.log(categories);
    console.log(products);

    return (
        <section className="container mx-auto">
            <div className="grid grid-cols-5 gap-4">
                <button onClick={() => setSelectedCategory()} class="text-center capitalize border border-gray-600 py-2">
                    All Products
                </button>
                {categories.map((v) => (
                    <button onClick={() => setSelectedCategory(v)} class="text-center capitalize border border-gray-600 py-2">
                        {v}
                    </button>
                ))}
            </div>
            <div className="grid md:grid-cols-4 gap-4 my-4">
                {products
                    .filter((v) => !selectedCategory || v.category == selectedCategory)
                    .map((v) => {
                        return (
                            <NavLink className="flex-auto items-stretch" to={`/product/${v.id}`}>
                                <div className="p-4 hover:shadow">
                                    <img className="object-contain h-40 w-full" src={v.image} alt={v.title} />
                                    <p className="truncate mt-2">{v.title}</p>
                                    <p className="text-yellow-600">${v.price.toFixed(2)}</p>
                                </div>
                            </NavLink>
                        );
                    })}
            </div>
        </section>
    );
};

export default ProductList;
