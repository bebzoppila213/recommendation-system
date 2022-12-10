import { Swiper, SwiperSlide } from "swiper/react";

export default function MainSlider() {
  return (
    <div className="slider movie-items">
      <div className="container">
        <div className="row">
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              {" "}
              <div className="movie-item">
                <div className="mv-img">
                  <a href="#">
                    <img
                      src="images/uploads/slider1.jpg"
                      alt=""
                      width="285"
                      height="437"
                    />
                  </a>
                </div>
                <div className="title-in">
                  <div className="cate">
                    <span className="blue">
                      <a href="#">Научно-фантастический</a>
                    </span>
                  </div>
                  <h6>
                    <a href="#">Интерстеллар</a>
                  </h6>
                  <p>
                    <i className="ion-android-star"></i>
                    <span>7.4</span> /10
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="movie-item">
                <div className="mv-img">
                  <a href="#">
                    <img
                      src="images/uploads/slider2.jpg"
                      alt=""
                      width="285"
                      height="437"
                    />
                  </a>
                </div>
                <div className="title-in">
                  <div className="cate">
                    <span className="yell">
                      <a href="#">Экшен</a>
                    </span>
                  </div>
                  <h6>
                    <a href="#">Ревенант</a>
                  </h6>
                  <p>
                    <i className="ion-android-star"></i>
                    <span>7.4</span> /10
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="movie-item">
                <div className="mv-img">
                  <a href="#">
                    <img
                      src="images/uploads/slider3.jpg"
                      alt=""
                      width="285"
                      height="437"
                    />
                  </a>
                </div>
                <div className="title-in">
                  <div className="cate">
                    <span className="green">
                      <a href="#">Комедия</a>
                    </span>
                  </div>
                  <h6>
                    <a href="#">Крепкий орешек</a>
                  </h6>
                  <p>
                    <i className="ion-android-star"></i>
                    <span>7.4</span> /10
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="movie-item">
                <div className="mv-img">
                  <a href="#">
                    <img
                      src="images/uploads/slider4.jpg"
                      alt=""
                      width="285"
                      height="437"
                    />
                  </a>
                </div>
                <div className="title-in">
                  <div className="cate">
                    <span className="blue">
                      <a href="#">Научно-фантастический</a>
                    </span>{" "}
                    <span className="orange">
                      <a href="#">Приключение</a>
                    </span>
                  </div>
                  <h6>
                    <a href="#">Прогулка</a>
                  </h6>
                  <p>
                    <i className="ion-android-star"></i>
                    <span>7.4</span> /10
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
