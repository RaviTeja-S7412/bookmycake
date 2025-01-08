import React from 'react'
import FrontHeader from '../components/front/FrontHeader'
import FrontContent from '../components/front/FrontContent'
import FrontFooter from '../components/front/FrontFooter'

const DefaultFrontLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-500">
        <FrontHeader />
        <div className="body flex-grow-1">
          <FrontContent />
        </div>
        <FrontFooter />
      </div>
    </div>
  )
}

export default DefaultFrontLayout
