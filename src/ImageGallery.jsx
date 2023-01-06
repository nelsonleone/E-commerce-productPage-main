import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import OrderSection from "./OrderSection";
import data from "./galleryData";


export default function ImageGallery(props){
   const [productsImages,setProductsImages] = useState(data)
   const [imageIndex,setImageIndex] = useState(0)
   const [fullImage,setFullImage] = useState(productsImages[imageIndex].images.productImage)

   useEffect(() => {
      setFullImage(productsImages[imageIndex].images.productImage)
   },[imageIndex])


   function checkIndex(index){
      if(index > productsImages.length - 1){
         return 0;
      }
      if(index < 0){
         return productsImages.length -1;
      }
      return index;
   }
   function scrollImages(e){
     e.target.dataset.next  ? 
       setImageIndex(prevIndex => {
         let newIndex = prevIndex + 1;
         return checkIndex(newIndex)
       }) 
      : 
        e.target.dataset.prev ? 
        setImageIndex(prevIndex => {
         let newIndex = prevIndex + 1;
         return checkIndex(newIndex)
       }) 
      : "";

      props.selectedProduct(prevState => {
         return prevState.map(values => {
            return {...values,chosenImageView:fullImage}
         })
      })
   }


   function handleFullImageDisplay(image,e){
      setFullImage(image)
      document.querySelectorAll('.active').forEach(activeImage => {
         activeImage.classList.remove('active')
      })
      e.target.classList.add('active')

      props.selectedProduct(prevState => {
         return prevState.map(values => {
            return {...values,chosenImageView:image}
         })
      })
   }


  


   const imageElement = productsImages.map(value => {
      return <img 
      src={value.images.thumbNail} 
      key={value.id}
      alt="Shoe Image"
      aria-controls="full-image"
      onClick={(e) => handleFullImageDisplay(value.images.productImage,e)}
      />
   })
   return(
      <div className="image-section">
         <div className="product-full-image">
            <button className="scroll-btn"  onClick={scrollImages} data-prev>
               <img 
               src="/images/icon-previous.svg"
               aria-controls="full-image"
               />
            </button>

           <img src={fullImage} id="full-image" className="full-image" onClick={() =>props.setLighboxDisplay(true)}/>
          
           <button className="scroll-btn" onClick={scrollImages} data-next>
               <img 
               src="/images/icon-next.svg"
               aria-controls="full-image"
               />
            </button>
         </div>
        <div className="image-thumbnails">
          {imageElement}
        </div>
      </div>
   )
}