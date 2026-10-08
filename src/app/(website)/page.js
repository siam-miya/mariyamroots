import Banner from '@/components/website/Banner'
import ProductsSection from '@/components/website/ProductsSection'
import React from 'react'
import ChooseUs from '@/components/website/ChooseUs'
import ProductDetails from '@/components/website/productDetails'
import HowItWorks from '@/components/website/HowItWorks'
import Testimonials from '@/components/website/Testimonials'
import FAQ from '@/components/website/FAQ'
import Checkout from '@/components/website/Checkout'

const page = () => {
  return (
    <>
    <Banner/>
    <ProductsSection/>
    <ProductDetails/>
    <ChooseUs/>
    <HowItWorks/>
    <Testimonials/>
    <FAQ/>
    <Checkout/>
    </>
  )
}

export default page
