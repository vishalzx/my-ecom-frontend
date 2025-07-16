import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
const CartItems = () => {
    const {all_product, cartItems, removeFromCart, getTotalCartAmount}= useContext(ShopContext);
    const handlePayment = async () => {
  const res = await fetch("https://my-ecom-backend.onrender.com/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 500 }) // ₹500
  });
  const order = await res.json();

  const options = {
    key: "YOUR_PUBLIC_KEY",
    amount: order.amount,
    currency: order.currency,
    name: "SHOPPER",
    description: "Test Transaction",
    order_id: order.id,
    handler: function (response) {
      alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      console.log(response);
    },
    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id]>0){
            return(
                <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img className='carticon-product-icon' src={e.image} alt="" />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} alt="" onClick={()=>{removeFromCart(e.id)}}/>
                    </div>
                    <hr />
                </div>
            )
        }
        return null;
      })}
      <div className="cartitems-down" >
        <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
                <div className='cartitems-total-item'>
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount}</h3>
                </div>
            </div>
            <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promocode, enter it here</p>
            <div className="cartitems-promobox">
                <input id='inputpromo' type="text" placeholder='promo code'/>
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
