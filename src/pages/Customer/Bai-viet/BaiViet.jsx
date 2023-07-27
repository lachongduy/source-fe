import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../Admin/News/api/newAction";
import moment from "moment";
import Heading from "../../../components/header/Heading";
import { useNavigate } from "react-router-dom";
import { isNull } from "lodash";


const BaiViet = (props) => {

  const navigate = useNavigate();
  const [newData, setNewData] = React.useState([]);
  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.new }),
    shallowEqual
  );
  const { data } = currentState;
  console.log(data);
  useEffect(() => {
    dispatch(
      actions.fetchNews({
        params: { name: "", current_page: 1, per_page: 10 },
      })
    );
  }, [dispatch]);

  const handleDetailBaiViet = (item) => {
    navigate(`/bai-viet/${item.slug}`, { state: item._id })
  }
  useEffect(() => {
    if (!isNull(data)) {
      const tamp = data?.filter(item => item?.status === true)
      setNewData(tamp);
    }
  }, [data])

  return (
    <div
      ref={props.scrollRef}
      className="py-4 my-5 max-w-[1200px] w-full mx-auto">
      <div className="mt-2 px-4 text-center pt-5">

        <Heading>
          <span className="hover:no-underline cursor-pointer text-black">
            Tin tức
          </span>
        </Heading>
      </div>

      <div className="bg-slate-100 p-2 rounded-lg shadow-lg pb-36">
        <div className="grid grid-cols-3 gap-5">
          {newData?.length > 0 &&
            newData?.map((item, index) => (
              <div className="col-span-1" key={index}>

                <div onClick={() => handleDetailBaiViet(item)}>
                  <img src={item.imageNew} alt="" className="h-[250px] w-full cursor-pointer" />
                </div>

                <div className="mt-4">
                  <h4>{item.title}</h4>
                </div>
                <div>
                  <div className="mt-3">
                    <span>{moment(item.updatedAt).format("LLLL")}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BaiViet;
