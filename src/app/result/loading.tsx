'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import '../../styles/loading.css'

const images = ['/cloud1.png', '/cloud2.png', '/cloud3.png', '/cloud4.png']

const Loading = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="image-container">
      <div className="images">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`fade-image ${index === currentIndex ? 'visible' : ''}`}
            width={300}
            height={300}
            priority
          />
        ))}
      </div>
      <div className="loading-container">
        <span className="loader" />
      </div>
    </div>
  )
}

export default Loading
