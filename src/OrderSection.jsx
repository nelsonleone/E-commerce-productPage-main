import { useState } from "react"

export default function OrderSection(props){
   const [orderMessage,setOrderMessage] = useState(false)

   const orderMessageStyle = {
      right: orderMessage ? "10%"  : "-1000px",
   }

   function handleAddToCart(){
      props.addToCart(true)
      props.setInputValue(0)
      setOrderMessage(true)
      setTimeout(() => {
         setOrderMessage(false)
         props.setOrderCount(props.inputValue)
      }, 1500);
   }  

   function checkInput(input){
      if(input < 0){
         return 0;
      }
      return input;
   }
   function handleOrderCount(e){
      if(e.target.dataset.increment){
         props.setInputValue(prev => checkInput(prev + 1))
      }
      if(e.target.dataset.decrement){
         props.setInputValue(prev => checkInput(prev - 1))
      }
   }

   return(
      <section className="order-section">
         <h3 className="company-name">Sneaker Company</h3>
         <h1>Fall Limited Edition Sneakers</h1>
         <p>
            These low-profile sneakers are your perfect casual wear companion. Featuring a 
            durable rubber outer sole, they’ll withstand everything the weather can offer.
         </p>
         <div className="price-details">
            <div>
               <span className="price">$125.00</span>
               <span className="discount-percentage">50%</span>
            </div>
            <del>$250.00</del>
         </div>

         <div className="cart-buttons">
            <div className="count-buttons">
               <button onClick={handleOrderCount} data-decrement>-</button>
               <input type="button" value={props.inputValue}/>
               <button onClick={handleOrderCount} data-increment>+</button>
            </div>

            <button 
              className="addToCart-btn" 
              disabled={props.inputValue === 0 ? true :  false}
              onClick={handleAddToCart}
              >
                  <img src="/images/icon-cart.svg" alt="" aria-hidden="true"/>
                  Add to cart
            </button>
         </div>

         <div className="order-message" style={orderMessageStyle}>
            <p>Your Order have been added</p>
         </div>
      </section>
   )
}