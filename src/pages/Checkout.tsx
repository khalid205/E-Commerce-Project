import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("تم تأكيد الطلب بنجاح! 🎉");
      navigate('/');
    }, 2500);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-5">
            <h2 className="text-center mb-4">معلومات الدفع</h2>
            <input className="form-control mb-3" placeholder="اسم حامل البطاقة" />
            <input className="form-control mb-3" placeholder="رقم البطاقة" />
            <div className="d-flex gap-2 mb-4">
              <input className="form-control" placeholder="MM/YY" />
              <input className="form-control" placeholder="CVC" />
            </div>
            <button className="btn btn-primary btn-lg w-100" onClick={handleCheckout} disabled={loading}>
              {loading ? "جاري المعالجة..." : "ادفع الآن"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};