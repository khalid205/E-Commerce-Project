// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const Navbar = () => {
  const { cart } = useContext(CartContext)!;

  return (
    // إضافة dir="rtl" هنا لضمان اتجاه العناصر من اليمين لليسار
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3" dir="rtl">
      <div className="container">
        
        {/* اللوجو في اليمين (في اتجاه RTL، سيبدأ من اليمين تلقائياً) */}
        <Link className="navbar-brand fw-bold text-main-green d-flex align-items-center" to="/">
          <i className="bi bi-shop-window ms-2"></i> متجري
        </Link>

        {/* السلة في الشمال */}
        <div className="d-flex align-items-center">
          <Link className="nav-link position-relative text-dark" to="/cart">
            <i className="bi bi-bag-fill fs-4 text-main-green"></i>
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};