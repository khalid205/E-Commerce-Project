import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { ProductDetails } from './pages/ProductDetails';


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <ToastContainer position="bottom-right" />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App;