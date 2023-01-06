import { useState } from "react";
import { useEffect } from "react";
import data from "./galleryData";
import styles from "./lightbox.module.css";

export default function LightBox(props){
   const lighboxImages = data;
   const [imageIndex,setImageIndex] = useState(0)
   const [productNames,setProductNames] = useState(
      lighboxImages[imageIndex].name
   )
   const [currentImage,setCurrentImage] = useState(lighboxImages[imageIndex].images.productImage)



   // HANDLING THE IMAGE SCROLL
   function checkIndex(index){
      if(index > lighboxImages.length - 1){
         return 0;
      }
      if(index < 0){
         return lighboxImages.length -1;
      }
      return index;
   }
   function handleImageIndex(e){
     setCurrentImage(lighboxImages[imageIndex].images.productImage)

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
   }


   function handleThumbImageClicks(thumbFullImage,e){
      setCurrentImage(thumbFullImage)
      document.querySelectorAll(`.${styles.active}`).forEach(activeThumb => {
         activeThumb.classList.remove(styles.active)
      })
      e.target.classList.add(styles.active)
   }


   // although they are all the same name(one product) , in case another needs to be added
   useEffect(() => {
      setProductNames(lighboxImages[imageIndex].name)
   },[imageIndex])

   useEffect(()  => {
      setCurrentImage(props.selectedProductImage)
   },[props.selectedProductImage])


   return(
      <div className={styles.lightBox} id="lightbox">
         <div className={styles.lightboxContent}>

         <svg 
           width="14" 
           height="15" 
           xmlns="http://www.w3.org/2000/svg"
           aria-labelledby="close-modal"
           aria-controls="lightbox"
           className={styles.closeLightbox}
           onClick={() => props.setLighboxDisplay(false)}
           >
            <title id="close-modal">Close Lightbox</title>
          <path 
             d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
             fill="#69707D" 
             fillRule="evenodd"
            />
         </svg>

            <div className={styles.lightboxImages}>
               <button className={styles.changeImageBtn} data-next onClick={handleImageIndex}>
                  <img src="/images/icon-next.svg" alt="see next image"/>
               </button>
               <img src={currentImage} alt={productNames} className={styles.currentImage}/>
               <button className={styles.changeImageBtn} data-prev onClick={handleImageIndex}>
                  <img src="/images/icon-previous.svg" alt="see previous image"/>
               </button>
            </div>

            <div className={styles.thumbnailsContainer}>
               {lighboxImages.map(values => {
                  return(
                     <img 
                        src={values.images.thumbNail}
                        alt={values.name}
                        key={values.id}
                        onClick={(e) => handleThumbImageClicks(values.images.productImage,e)}
                     />
                  )
               })}
            </div>
         </div>
      </div>
   )
}