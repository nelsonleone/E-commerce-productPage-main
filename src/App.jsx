import { useState } from 'react';
import { useEffect } from 'react';
import Header from './Header';
import OrderSection from './OrderSection';
import ImageGallery from './ImageGallery';
import LightBox from './LightBox';

function App() {
  // WORKING WITH A SINGLE  PRODUCT, THE DATA(PRICE ...NAME....)ARE FIXED 
  const [selectedProduct,setSelectedProduct] = useState([
    {
    name: "Autumn Limited Edition",
    price:125,
    chosenImageView:"/images/image-product-1.jpg"
    }
  ])

  const [orderCountValue,setOrderCountValue] = useState(0)
  const [addToCart,setAddToCart] = useState(false)
  const [inputValue,setInputValue] = useState(0)
  const [lightboxDisplay,setLighboxDisplay] = useState(false)

  return (
    <>
      <Header 
        selectedProduct={selectedProduct}
        setSelectedProduct={value => setSelectedProduct(value)}
        orderCount={orderCountValue}
        setOrderCount={value => setOrderCountValue(value)}
        addToCart={addToCart}
      />
      <main>
        <ImageGallery 
          selectedProduct={value => setSelectedProduct(value)}
          lightboxDisplay={lightboxDisplay}
          setLighboxDisplay={value => setLighboxDisplay(value)}
        />
        <OrderSection 
          setOrderCount={value => setOrderCountValue(value)}
          inputValue={inputValue}
          setInputValue={value => setInputValue(value)}
          orderCount={orderCountValue}
          addToCart={value => setAddToCart(value)}
        />
        {lightboxDisplay ?
          <LightBox 
            setLighboxDisplay={value => setLighboxDisplay(value)}
            selectedProductImage={selectedProduct[0].chosenImageView}
          />
          :
          ""
        }
      </main>
    </>
  )
}

export default App
