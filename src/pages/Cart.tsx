// src/pages/Cart.tsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext)!;
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    
    <div className="container py-5" dir="rtl">
      <h3 className="mb-4 fw-bold text-dark">
        <i className="bi bi-bag-check me-2 text-main-green"></i>حقيبة التسوق
      </h3>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x fs-1 text-muted"></i>
          <p className="mt-3">السلة فارغة. ابدأ بالتسوق الآن!</p>
          <Link to="/" className="btn btn-main-green">العودة للمتجر</Link>
        </div>
      ) : (
        <div className="row">
          {/* قائمة المنتجات */}
          <div className="col-md-8">
            {cart.map((item, i) => (
              <div key={i} className="card mb-3 p-3 d-flex flex-row align-items-center shadow-sm border-0 rounded-4">
                <img src={item.image} width="80" height="80" style={{ objectFit: 'contain' }} className="rounded" />
                <div className="ms-4 flex-grow-1">
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <span className="text-main-green fw-bold">${item.price}</span>
                </div>
                <button 
                  className="btn btn-outline-danger btn-sm" 
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>

          {/* كرت ملخص الفاتورة */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '20px' }}>
              <h4 className="fw-bold mb-4">
                <i className="bi bi-receipt me-2 text-main-green"></i>ملخص الطلب
              </h4>
              
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">المجموع الفرعي</span>
                <span className="fw-bold">${total.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">الشحن</span>
                <span className="text-success fw-bold">مجاني</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">الضريبة (5%)</span>
                <span className="fw-bold">${(total * 0.05).toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">الإجمالي الكلي</h5>
                <h5 className="fw-bold text-main-green fs-3">${(total * 1.05).toFixed(2)}</h5>
              </div>

              <Link to="/checkout" className="btn btn-main-green btn-lg rounded-pill w-100 shadow-sm py-2">
                إتمام الدفع الآمن <i className="bi bi-arrow-left ms-2"></i>
              </Link>
              
              <div className="text-center mt-3">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  معاملاتنا مشفرة وآمنة 100%
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};