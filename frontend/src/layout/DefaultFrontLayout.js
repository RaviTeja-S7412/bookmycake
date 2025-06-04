import React from 'react'
import FrontHeader from '../components/front/FrontHeader'
import FrontContent from '../components/front/FrontContent'
import FrontFooter from '../components/front/FrontFooter'

const DefaultFrontLayout = () => {
  return (
    <div>
        <FrontHeader />
        <div>
          <FrontContent />
        </div>
        <FrontFooter />
    </div>
  )
}

export default DefaultFrontLayout
