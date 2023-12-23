import React, { useEffect, useState } from 'react';

const OrderSuccessPopup = ({ totalPrice, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isVisible ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-16 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
        <p>Your order total: &#8377;{totalPrice}</p>
        <p>Thank you for your order!</p>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;
