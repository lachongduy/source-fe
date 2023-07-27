import { Button, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/header/Heading";
import Label from "../../components/labelStatus/Label";
import { isNull } from "lodash";
const ProductList = (props) => {
  //const navigate = useNavigate();
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [index, setIndex] = useState(8);
  const [isCompleted, setIsCompleted] = useState(false);
  const [newProduct, setNewProduct] = React.useState([]);
  useEffect(() => {
    const initialData = props?.data?.slice(0, index);
    setVisibleProducts(initialData);
  }, [props?.data, index]);

  const handleLoadMore = () => {
    const newIndex = index + 10;
    const newData = props?.data?.slice(0, newIndex);
    setVisibleProducts(newData);
    setIndex(newIndex);
    if (newData.length >= props?.data?.length) {
      setIsCompleted(true);
    }
  };
  useEffect(() => {
    if (!isNull(visibleProducts)) {
      const tamp = visibleProducts?.filter(item => item.status === true)
      setNewProduct(tamp);
    }
  }, [visibleProducts])
  return (
    <div ref={props.scrollRef} className="py-4 max-w-[1200px] w-full mx-auto">
      <div className=" px-4 text-center">
        <Heading>
          <span className="hover:no-underline cursor-pointer text-black">
            Sản phẩm nổi bật
          </span>
        </Heading>
      </div>
      <div className="h-full relative ">
        <div className="h-full col-lg-3 col-md-3 col-sm-3 col-xs-6 item">
          <div className="px-4 grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {newProduct?.map((product) => (
              <Card
                key={product._id}
                sx={{ padding: "4px", position: "relative" }}>
                <Link to={`/product/${product._id}`}>
                  <img
                    className="cursor-pointer w-full h-[210px] object-fill rounded-lg"
                    src={product.imageProduct}
                    alt="productimage"
                  />
                </Link>
                {product?.discount && (
                  <Label
                    variant="filled"
                    color="error"
                    sx={{ position: "absolute", top: "16px", right: "16px" }}>
                    {product.discount}%
                  </Label>
                )}
                <div className="mt-2 flex flex-col flex-1 px-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="hover:text-blue-500 text-slate-600 no-underline cursor-pointer">
                    <h5 className="text-lg font-semibold ">{product.name}</h5>
                  </Link>

                  <div className="flex gap-x-2 mt-2">
                    {product?.discount ? (
                      <span className="text-md font-semibold mb-4 text-gray-900 dark:text-white line-through">
                        {product.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    ) : (
                      <span className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        {product?.price?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    )}
                    {product?.discount && (
                      <span className="text-lg font-semibold mb-4 text-red-600 dark:text-white">
                        {product?.price_discount?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    )}
                  </div>
                  {/* <div>
                    <h5> Màu: {product.colors.length}</h5>

                    {product.colors.map((color) => (

                      <div className="flex gap-1 items-center" >
                        {color.sizes.map((size) => (
                          <>
                            <div className="flex gap-1 items-center" >
                              <h6 > {size.size.name}</h6>
                            </div>

                          </>
                        ))}
                        <div>
                          <h6> Số lượng size:{color.sizes.length}</h6>
                        </div>
                      </div>
                    ))}
                  </div> */}

                </div>


              </Card>
            ))}
          </div>

          {!isCompleted && (
            <div className="flex items-center justify-center mt-5">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleLoadMore}>
                Xem thêm
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductList;
