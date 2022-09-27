import React, { useEffect, useState } from 'react'
import "./style.css"

const Cart = ({ cart, setCart, cartIsOpen, setCartIsOpen, cartHasUpdated, setCartHasUpdated }) => {

    const [ total, setTotal ] = useState(100)

    useEffect(()=>{
        if(cart.length === 0){
            setTotal(0)
        }if(cart.length === 1){
            setTotal(cart[0].price)
        }if(cart.length > 1){
            let newTotal = cart.reduce((acc, total) => acc + total.price, 0)
            setTotal(newTotal)
        }
    },[cart])

    const fees = 1000 * cart.length
    const tax = Math.floor((total + fees) * 0.07)


  return (
    <div className='cartContainer'
         style={{ 
            //  transform: cartIsOpen && 'translate(70vw)'
            left: cartIsOpen && '-90vw'

        }}
         >
        <h1 className='cartTitle'>Cart</h1>
        <div 
            onClick={() => setCartIsOpen(false)}
            className='closeCart'
        >x</div>
        {
        cart.length ? 
        <div className='cartItems'>
            {cart.map(item => <CartItem item={item} cart={cart} setCart={setCart} cartHasUpdated={cartHasUpdated} setCartHasUpdated={setCartHasUpdated}/>)}
        </div>
        :
        <div className='emptyCart'>Cart is Empty</div>}
        
        {cart.length > 0 && 
        <div className='checkout'>
            <div className='checkoutContent'>
                <h4 className='total'>Fees: ${fees.toLocaleString("en-US")} +</h4>
                <h4 className='total'>Tax: ${tax.toLocaleString("en-US")} + </h4>
                <h4 className='total'>Cost: ${total.toLocaleString("en-US")}</h4>
            </div>
            <h3 className='total'>Total: ${(total + fees + tax).toLocaleString("en-US")}</h3>
            <button>Checkout</button>
        </div>}

    </div>
  )
}

export default Cart

const CartItem = ({ item, cart, setCart, cartHasUpdated, setCartHasUpdated }) => {

    const unavailable =
    "https://media.istockphoto.com/vectors/no-camera-icon-vector-id1202407074?k=20&m=1202407074&s=170667a&w=0&h=vk73jggd8Aq5QdQOYdH35vXYE3fkj4plVRkQV4ibHSo=";

    function removeFromCart(){
        let filtered = cart.filter(cartItem => cartItem !== item)
        setCart(filtered)
        setCartHasUpdated(!cartHasUpdated)
    }

    const { url, year, make, model, price } = item

    return (
        <div className='cartItem'>
            <h3>{`${year} ${make} ${model}`}</h3>
            <div className='cartItemContent'>
                <img src={url ? url : unavailable} alt=''/>
                <p>${price}</p>
            </div>
            <button onClick={removeFromCart}>Remove From Cart</button>
        </div>

    )
}

