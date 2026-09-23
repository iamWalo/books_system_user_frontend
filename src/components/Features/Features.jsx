import React from 'react'
import amazon_img from '../../assets/amazon_img.svg'
import amazon_kindl_img from '../../assets/amazon_kindl_img.svg'





import "./Features.css"
const Features = () => {
    return (
        <section className='features'>
            <h2>Featured On</h2>
            <div className='freatures_img_container'>
                <img src={amazon_kindl_img} alt="" />
                <img src={amazon_img} alt="" />
            </div>
        </section>
    )
}

export default Features