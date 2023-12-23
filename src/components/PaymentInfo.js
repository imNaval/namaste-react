import React, { useEffect, useState } from 'react';
import OrderSuccessPopup from './OrderSuccessPopup';
import { useSelector } from 'react-redux';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [warnings, setWarnings] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const grandTotal = useSelector(store => store.cart.grandTotal)

  const handleConfirmOrder = () => {
    // Reset warnings
    setWarnings({});

    // Validate card number: Allow only digits and check length
    if (!/^\d+$/.test(cardNumber) || cardNumber.length !== 16) {
      setWarnings({ ...warnings, cardNumber: 'Please enter a valid 16-digit card number.' });
      return;
    } else {
      setWarnings({ ...warnings, cardNumber: '' }); // Clear warning for card number
    }

    // Validate expiry date: Check format and ensure it's not in the past
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!dateRegex.test(expiryDate)) {
      setWarnings({ ...warnings, expiryDate: 'Please enter a valid expiry date in MM/YY format.' });
      return;
    } else {
      setWarnings({ ...warnings, expiryDate: '' }); // Clear warning for expiry date
    }

    // Validate expiry date: Check length and ensure it's not in the past
    const currentDate = new Date();
    const enteredDate = new Date(`20${expiryDate.slice(3, 5)}`, expiryDate.slice(0, 2) - 1, 1);
    if (expiryDate.length !== 5 || enteredDate < currentDate) {
      setWarnings({ ...warnings, expiryDate: 'Please enter a valid expiry date.' });
      return;
    } else {
      setWarnings({ ...warnings, expiryDate: '' }); // Clear warning for expiry date
    }

    // Validate CVV: Allow only digits and check length
    if (!/^\d+$/.test(cvv) || cvv.length !== 3) {
      setWarnings({ ...warnings, cvv: 'Please enter a valid 3-digit CVV.' });
      return;
    }

    // Perform payment confirmation logic here if validation passes
    // alert('Payment confirmed!');
    setShowPopup(true);
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="max-w-md mx-auto p-4 pb-12">
      <h1 className="text-2xl sm:font-bold mb-4">Payment Information</h1>

      <div className='-ml-4 p-4 border border-red-100 rounded-lg mb-6'>
        <div className="mb-4">
          <p className="text-lg sm:font-bold">Amount to be Paid:</p>
          <p className="text-green-500 text-xl sm:font-bold">&#8377;{grandTotal}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg sm:font-bold">Disclaimer:</p>
          <p className="text-gray-600 text-sm sm:text-base">
            This is a demo app. Please do not enter your actual card details. Use the following test card number for demo purposes: <br />
            <span className="text-red-500 text-sm sm:text-base">4242 4242 4242 4242</span> (any future date, any CVC, any postal code).
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          className={`mt-1 p-2 w-full border rounded-md ${warnings.cardNumber ? 'border-red-500' : ''}`}
          placeholder="1234 5678 9012 3456"
          maxLength={16}
          value={cardNumber}
          onChange={(e) => { setCardNumber(e.target.value); setWarnings({ ...warnings, cardNumber: '' }); }}
        />
        {warnings.cardNumber && <p className="text-red-500 text-sm mt-1">{warnings.cardNumber}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          className={`mt-1 p-2 w-full border rounded-md ${warnings.expiryDate ? 'border-red-500' : ''}`}
          placeholder="MM/YY"
          maxLength={5}
          value={expiryDate}
          onChange={(e) => { setExpiryDate(e.target.value); setWarnings({ ...warnings, expiryDate: '' }); }}
        />
        {warnings.expiryDate && <p className="text-red-500 text-sm mt-1">{warnings.expiryDate}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className={`mt-1 p-2 w-full border rounded-md ${warnings.cvv ? 'border-red-500' : ''}`}
          placeholder="123"
          maxLength={3}
          value={cvv}
          onChange={(e) => { setCvv(e.target.value); setWarnings({ ...warnings, cvv: '' }); }}
        />
        {warnings.cvv && <p className="text-red-500 text-sm mt-1">{warnings.cvv}</p>}
      </div>
      <button
        type="button"
        className="p-2 bg-green-500 text-white rounded-md"
        onClick={handleConfirmOrder}
      >
        Confirm Order
      </button>

      {showPopup && <OrderSuccessPopup totalPrice={grandTotal} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default PaymentForm;
