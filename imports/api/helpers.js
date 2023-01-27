import React from "react";
import { useState, useEffect } from "react"

export const isAdmin = (user) => {
  return user && user.admin;
};


export const useResize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isResponsive: false
  })

  const updateSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 768,
      isResponsive: window.innerWidth < 1320
    })
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize)
    updateSize()

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return screenSize;
}


export const Logo =()=>{
  const boxStyle = {
    borderRadius: '50%',
    boxShadow: '0 5px 7px 5px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'lightgray',
    padding: '15px'
  }
  
  style = {
    textShadow: '2px 5px 2px rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    fontWidth: '600'
  }

  return(
    <div style={boxStyle}>
      <div style={style}>
        EA-Social
      </div>
    </div>
  )
}