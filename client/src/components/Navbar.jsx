import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    const { cartItems } = props;
    console.log('navbar', cartItems);
    return (
        <header className="flex items-center justify-between px-8 mb-4 shadow">
            <NavLink to="/">
                <img className="h-16 p-4" src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" alt="Shop Logo" />
            </NavLink>
            <NavLink className="relative p-4" to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                <div className="absolute top-0.5 right-0.5 bg-yellow-500 rounded-full w-6 text-center font-semibold">{cartItems ? cartItems.length : 0}</div>
            </NavLink>
        </header>
    );
};

export default Navbar;
