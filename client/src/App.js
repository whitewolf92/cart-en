import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
    const { data: cartItems, setData: setCartItems } = useLocalStorage('cartItems', []);

    console.log('cartItems', cartItems);

    return (
        <BrowserRouter>
            <Navbar cartItems={cartItems} />
            <Switch>
                <Route exact path="/">
                    <ProductList />
                </Route>
                <Route path="/product/:productId">
                    <ProductDetails cartItems={cartItems} setCartItems={setCartItems} />
                </Route>
                <Route path="/cart">
                    <Cart />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
