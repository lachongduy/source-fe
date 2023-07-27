import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import * as actions from "../../pages/Admin/Banner/api/bannerAction";
import { isNull } from "lodash";
import { Box } from "@mui/material";

const HomeBanner = (props) => {

  const [newBanner, setNewBanner] = React.useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchBanners({
        params: { current_page: 1, per_page: 10 },
      })
    );
  }, [dispatch]);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.banners }),
    shallowEqual
  );
  const {
    data
  } = currentState;
  useEffect(() => {
    if (!isNull(data)) {
      const tamp = data.filter(item => item.status === true)
      tamp.sort((a, b) => a.doUuTien - b.doUuTien);
      setNewBanner(tamp);
    }
  }, [data])
  return (
    <Box>
      <Swiper
        spaceBetween={40}
        slidesPerView={"auto"}
        grabCursor={true}
        navigation={{ clickable: true }}
        modules={[Autoplay, Navigation, A11y]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {newBanner?.map((item) => (
          <SwiperSlide key={item._id}>
            <img src={item.imageBanner} alt="" className="w-full h-[710px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeBanner;
