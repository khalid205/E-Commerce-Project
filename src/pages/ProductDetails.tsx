// src/pages/ProductDetails.tsx
import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string; // تأكد من وجود هذا السطر هنا
}

export const ProductDetails = () => {
  // 1. جلب الـ ID من الرابط
  const { id } = useParams<{ id: string }>();
  
  // 2. استخدام Context لجلب دالة الإضافة
  const context = useContext(CartContext);
  if (!context) throw new Error("ProductDetails must be used within a CartProvider");
  const { addToCart } = context;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 3. جلب بيانات المنتج المحدد
  useEffect(() => {
    axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("خطأ في جلب تفاصيل المنتج:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border text-main-green" role="status"></div>
      <h4 className="mt-3">جاري تحميل تفاصيل المنتج...</h4>
    </div>
  );

  if (!product) return (
    <div className="text-center py-5">
      <h4>عذراً، لم يتم العثور على هذا المنتج.</h4>
      <Link to="/" className="btn btn-main-green mt-3">العودة للمتجر</Link>
    </div>
  );

  return (
    <div className="container py-5" dir="rtl">
      <div className="row align-items-center bg-white p-4 p-md-5 rounded-4 shadow-sm">
        
        {/* قسم الصورة */}
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img 
            src={product.image} 
            className="img-fluid rounded-4 p-3" 
            alt={product.title} 
            style={{ maxHeight: '400px', objectFit: 'contain' }} 
          />
        </div>

        {/* قسم التفاصيل */}
        <div className="col-md-7 ps-md-5">
          <span className="badge bg-light text-main-green border border-main-green mb-3 px-3 py-2 rounded-pill">
            {product.category}
          </span>
          <h2 className="fw-bold mb-3">{product.title}</h2>
          <h3 className="text-main-green fw-bold mb-4">${product.price.toFixed(2)}</h3>
          
          <hr className="my-4" />
          
          <h5 className="fw-bold mb-3">وصف المنتج</h5>
          <p className="text-muted lh-lg" style={{ fontSize: '1.1rem' }}>
            {product.description}
          </p>
          
          <div className="d-flex gap-3 mt-4">
            <button 
              className="btn btn-main-green btn-lg px-5 rounded-pill shadow-sm" 
              onClick={() => addToCart(product)}
            >
              <i className="bi bi-cart-plus me-2"></i>إضافة إلى السلة
            </button>
            <Link to="/" className="btn btn-outline-secondary btn-lg px-4 rounded-pill">
              متابعة التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};