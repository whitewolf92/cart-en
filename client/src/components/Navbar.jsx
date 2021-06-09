import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/outline';

const Navbar = (props) => {
    const { cartItems } = props;

    return (
        <header className="flex items-center justify-between px-8 mb-4 shadow">
            <NavLink to="/">
                <img className="h-16 p-4" src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" alt="Shop Logo" />
            </NavLink>
            <NavLink className="relative p-4" to="/cart">
                <ShoppingCartIcon className="h-6 w-6" />
                <div className="absolute top-0.5 right-0.5 bg-yellow-500 rounded-full w-6 text-center font-semibold">{cartItems ? Object.keys(cartItems).length : 0}</div>
            </NavLink>
        </header>
    );
};

export default Navbar;
