// src/pages/Home.tsx
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext, Product } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../index.css'; 

// تعريف نوع الحالة المرجعة من الـ Context لضمان الأمان
interface CartContextType {
  addToCart: (product: Product) => void;
}

export const Home = () => {
  // استخدام التايب (Product[]) لضمان أن مصفوفة المنتجات تحتوي فقط على بيانات المنتجات
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  
  // التأكد من استيراد الـ Context بشكل صحيح
  const context = useContext(CartContext);
  
  // حماية الكود من عدم وجود الـ Context
  if (!context) {
    throw new Error("Home must be used within a CartProvider");
  }
  
  const { addToCart } = context as CartContextType;

  useEffect(() => {
    // تحديد نوع الاستجابة من الـ API
    axios.get<Product[]>('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // التصفية باستخدام التايب الصحيح
  const filteredProducts: Product[] = products.filter((p: Product) => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5" dir="rtl">
      
      {/* قسم العنوان والبحث */}
      <div className="row align-items-center mb-5 p-4 rounded-4 shadow-sm bg-white border border-light">
        
        <div className="col-md-6">
          <h2 className="fw-bold text-main-green m-0 d-flex align-items-center">
            <i className="bi bi-shop me-2"></i> متجرنا المميز
          </h2>
        </div>
        
        <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
          <div className="input-group input-group-lg shadow-sm" style={{ maxWidth: '400px', borderRadius: '50px' }}>
            <input 
              type="text" 
              className="form-control border-0 ps-4" 
              placeholder="ابحث عن منتجك..." 
              style={{ borderRadius: '50px 0 0 50px' }} 
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} 
            />
            <span className="input-group-text border-0 bg-white text-main-green pe-4" style={{ borderRadius: '0 50px 50px 0' }}>
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>
      
      {/* شبكة المنتجات */}
      <div className="row g-4">
        {filteredProducts.map((p: Product) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={p.id}>
            <div className="card h-100 border-0 shadow-sm rounded-4 p-3 product-card position-relative overflow-hidden">
              <span className="badge-sale">خصم 20%</span>
              <Link to={`/product/${p.id}`} className="text-decoration-none text-center d-block py-3">
                <img src={p.image} alt={p.title} style={{ height: '170px', objectFit: 'contain' }} className="img-fluid" />
              </Link>
              <div className="card-body text-center d-flex flex-column px-0 pb-0">
                <h6 className="fw-bold text-dark mb-2 text-truncate">{p.title}</h6>
                <small className="text-muted mb-3 d-block">{p.category}</small>
                <div className="mt-auto d-flex align-items-center justify-content-between border-top pt-3">
                  <p className="text-main-green fs-5 fw-bold m-0">${p.price.toFixed(2)}</p>
                  <button 
                    className="btn btn-main-green rounded-pill px-3 py-2" 
                    onClick={() => addToCart(p)}
                  >
                    <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};