import './slider.css'

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"



const Slider = ({items}) => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }

  return (
    <section className="skills">
        <div className="skills__container">
            <h2>Habilidades:</h2>
            <Carousel 
                responsive={responsive} 
                infinite={false}
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                draggable
                focusOnSelect={false}
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                className='skills__slider'
            >
                {items.map((language, index) => (
            <div className='skills__item' key={index}>
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/trans-coders.appspot.com/o/logos%2F${language.value}?alt=media`}
                alt={language.label}
              />
              <h5>{language.label}</h5>
            </div>
          ))}
                
            </Carousel>
        </div>
    </section>
  )
}

export default Slider