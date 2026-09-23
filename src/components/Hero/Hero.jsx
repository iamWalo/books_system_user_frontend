import React from 'react'
import './Hero.css'
import hero_btn_icon_1 from "../../assets/hero_btn_icon_1.svg"
import hero_btn_icon_2 from "../../assets/hero_btn_icon_2.svg"

const Hero = () => {
  return (
    <section className="hero">

      <div className="btn_container">

        <div className="shop_btn">
          <i className="line top"></i>
          <i className="line bottom"></i>
          <i className="line left"></i>
          <i className="line right"></i>

          <img src={hero_btn_icon_1} alt="Shop on Amazon" />
          <span>Shop on Amazon</span>
        </div>

        <div className="explore_btn">
          <i className="line top"></i>
          <i className="line bottom"></i>
          <i className="line left"></i>
          <i className="line right"></i>

          <img src={hero_btn_icon_2} alt="Explore More" />
          <span>Explore More</span>
        </div>

      </div>

    </section>
  )
}

export default Hero