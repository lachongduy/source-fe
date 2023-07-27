import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../Admin/News/api/newAction";
import Heading from "../../../components/header/Heading";
import { useLocation } from "react-router-dom";
import LayoutCustomer from "../../../layouts/LayoutCustomer";

const BaiVietDetail = (props) => {

    const location = useLocation();
    console.log(location);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchNewById(location?.state));
    }, [dispatch, location?.state]);
    const { currentState } = useSelector(
        (state) => ({ currentState: state.new }),
        shallowEqual
    );
    const {
        dataDetail
    } = currentState;

    return (
        <LayoutCustomer>
            <div className="p-4 mx-auto w-full max-w-[1200px] pt-[88px]">
                <div className="  text-center ">
                    <Heading>
                        <span
                            className="hover:no-underline cursor-pointer text-black">
                            Tin tức
                        </span>
                    </Heading>
                </div>
                <div className=" max-w-[1200px] w-full mx-auto shadow-lg">
                    <div className=" items-center">
                        {dataDetail && (
                            <div>
                                <h3 className="text-center">{dataDetail.title}</h3>
                            </div>
                        )}
                    </div>
                    <div >
                        {dataDetail && (
                            <div >
                                <img
                                    src={dataDetail?.imageNew}
                                    alt=""
                                    className="w-full p-20 object-fill rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                    <div >
                        {dataDetail && (
                            <div
                                className=" px-10"
                                dangerouslySetInnerHTML={{ __html: `${dataDetail?.content}` }}
                            ></div>
                        )}
                    </div>

                </div>
            </div>
        </LayoutCustomer>
    );
}
export default BaiVietDetail
