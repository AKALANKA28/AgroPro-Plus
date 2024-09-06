import React from 'react'
import './body/main.css'

// import Header from'./Components/'
import Sidebar from './sidebar/Sidebar'
import Stock from './body/stockDetails/Stock'
import Footer from './footer/Footer'



const StockDetails = () => {
  return (
    <div>
      {/* <Header /> */}
      <Sidebar />
      <Stock />
      <Footer />
    </div>
  )
}

export default StockDetails