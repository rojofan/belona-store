import React, {useRef} from 'react';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineRight, AiOutlineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from "react-icons/ti";
import {useStateContext} from "@/context/StateContext";
import Link from "next/link";
import {urlFor} from "@/lib/client";
import getStripe from "@/lib/getStripe";
import {toast} from "react-hot-toast";

const Cart = () => {
    const cartRef = useRef();
    const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext()

    const handleCheckOut = async () => {
        const stripe = await getStripe();
        const response = await fetch("/api/stripe",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems)
        });

        if (response.status === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');
        stripe.redirectToCheckout({sessionId: data.id});
    }
    return (
        // @ts-ignore
        <div className='cart-wrapper' ref={cartRef}>
            <div className="cart-container">
                <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineRight/>
                    <span className="heading">Your cart</span>
                    <span className="cart-num-items">({`${totalQuantities} items`})</span>
                </button>
                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <img alt={''} className="cart-empty-bag-image" src='../../shopping-bags-empty.webp'/>
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button type="button" onClick={() => setShowCart(false)} className="btn">
                                Continue Shopping
                            </button>
                        </Link>

                    </div>
                )}
                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        // @ts-ignore
                        <div className="product" key={item._id}>
                            {/*// @ts-ignore*/}
                            <img alt={item?.name} src={urlFor(item.image[0])} className="cart-product-image"/>
                            <div className="item-desc">
                                <div className="flex top">
                                    {/*// @ts-ignore*/}
                                    <h5>{item.name}</h5>
                                    {/*// @ts-ignore*/}
                                    <h4>${item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus"
                                                // @ts-ignore
                                                  onClick={() => toggleCartItemQuantity(item._id, 'decrement')}><AiOutlineMinus/></span>
                                            {/*// @ts-ignore*/}
                                            <span className="num">{item.quantity}</span>
                                            <span className="plus"
                                                // @ts-ignore
                                                  onClick={() => toggleCartItemQuantity(item._id, 'increment')}><AiOutlinePlus/></span>
                                        </p>
                                    </div>
                                    <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                                        <TiDeleteOutline/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>{`$${totalPrice}`}</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick={() => handleCheckOut()}>
                                PAY WITH STRIPE
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart