import { useState } from "react"

export default function Header(props){

   // delete cart item functionality
   const [deletedItemMessage,setDeletedItemMessage] = useState(false)
   const deletedMessageStyle = {
      right: deletedItemMessage ? ".3em"  : "-1000px",
   }
   function handleItemDelete(index){
      cartArray.splice(0,index)
      // HARDCODED AS 0 BECAUSE AM JUST WORKING WITH A SINGLE PRODUCT
      props.setOrderCount(0)
      setDeletedItemMessage(true)

      setTimeout(() => {
         setDeletedItemMessage(false)
      }, 1500);
   }
   

   
   //  mobile nav toggle functionality
   const [menuDisplay,setMenuDisplay]  = useState(false)
   const menuDisplayStyle = {
      width : menuDisplay ? "100%" : "0",
      top:    menuDisplay ? "0" : "-20000px"
   }

   function toggleMenuDisplay(){
      setMenuDisplay(prevState => prevState = !prevState)
   }
   //

   // cart display functionality
   const [cartDisplay,setCartDisplay] = useState(false)
   const cartDisplayStyle = {
      display: cartDisplay ? "block" : "none"
   }
   const cartCountDisplayStyle = {
      display:  props.addToCart ? "block" : "none"
   }

   function toggleCartDisplay(){
      setCartDisplay(prevState  => prevState = !prevState)
   }

   // the cart content
   const  cartArray = props.addToCart ? props.selectedProduct : [];
   const cartElement =  props.orderCount > 0  && cartArray.length ?
     cartArray.map((product,index) => {
      return <div key={index}>
         <div className="cart-product-details">
         <img src={product.chosenImageView} alt="product image"/>
         <div>
            <span>{product.name}...</span>
            <br></br>
            <span>${product.price} x {props.orderCount} <strong>${product.price * props.orderCount}</strong></span>
         </div>
         <img 
           src="/images/icon-delete.svg" 
           alt="Delete item" 
           onClick={() => handleItemDelete(index)}
           className="delete-item"
         />
         </div>
         <button className="checkout-btn">Checkout</button>
     </div>
     })
   :
   <p className="empty-cartPara">Your Cart is empty</p>

   //


   return(
      <header>
         <div className="header-content">
            <nav>
               <img 
               src={menuDisplay ? "/images/icon-close.svg" :  "/images/icon-menu.svg"} 
               alt="Open Menu"
               aria-controls="top-nav"
               aria-expanded={menuDisplay ? "true" : "false"}
               className="toggle-menu"
               onClick={toggleMenuDisplay}
               />
               <img 
                 src="/images/logo.svg" 
                 alt="Page Logo"
                 className="logo"
               />
               <div className="top-nav" id="top-nav" style={menuDisplayStyle}>
                  <ul>
                     <li><a href="">Collections</a></li>
                     <li><a href="">Men</a></li>
                     <li><a href="">Women</a></li>
                     <li><a href="">About</a></li>
                     <li><a href="">Contact</a></li>
                  </ul>
               </div>
            </nav>

            <div className="cart__user-image">
               <div className="cart-content">
                  <div className="cart__icon__count">
                     <img 
                        src="/images/icon-cart.svg" 
                        alt="Your Cart"
                        aria-controls="cart-menu"
                        aria-expanded={cartDisplay ? "true" : "false"}
                        className="cart-icon"
                        onClick={toggleCartDisplay}
                     />
                    <span className="cart-count" style={cartCountDisplayStyle}>{props.orderCount}</span>
                  </div>

                  <div className="cart-menu" id="cart-menu"  style={cartDisplayStyle}>
                     <h4>Cart</h4>
                     {cartElement}
                  </div>

               </div>
               <img src="/images/image-avatar.png" alt="User Image" className="user-image"/>
            </div>
         </div>

         <div className="delete-message" style={deletedMessageStyle}>
            <p>Item(s) Deleted</p>
         </div>
      </header>
   )
}

  
  
  
  
