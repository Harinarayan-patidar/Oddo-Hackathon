import React from 'react'
import signupImage from '../assets/item1.jpg'
import Template from '../components/core/Auth/Template'

function Signup() {
  return (
    <Template
      title ="reWear"
    description1="ReWear is a community-driven platform to swap or redeem unused clothes, promoting sustainable fashion and reducing textile waste."
     description2 = "Join us in making a positive impact on the environment by giving your clothes a second life."
     image ={signupImage}
     formType = "signup"
    
    />
  )
}

export default Signup
