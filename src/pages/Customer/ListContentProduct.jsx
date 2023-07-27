import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Card, IconButton, Tooltip } from "@mui/material";
import { isNull } from "lodash";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Label from "../../components/labelStatus/Label";
const ListContentProduct = (props) => {

  const [newProduct, setNewProduct] = React.useState([]);
  console.log(props.data);
  useEffect(() => {
    if (!isNull(props?.data)) {
      const tamp = props?.data?.filter(item => item.status === true)
      setNewProduct(tamp);
    }
  }, [props?.data])
  return (
    <div className="h-full relative ">
      <div className="h-full col-lg-3 col-md-3 col-sm-3 col-xs-6 item">
        <div className="px-4 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {newProduct?.map((product) => (
            <Card
              key={product._id}
              sx={{ padding: "4px", position: "relative" }}>
              <Link to={`/product/${product._id}`}>
                <img
                  className="cursor-pointer w-full h-[250px] object-fill rounded-lg"
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
              <Tooltip title="Thêm vào giỏ hàng">
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    backgroundColor: "#F24C3D",
                  }}
                  className="hover:bg-red-600">
                  <AddShoppingCartIcon className="text-white" />
                </IconButton>
              </Tooltip>
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

              </div>
            </Card>
          ))}
        </div>


      </div>
    </div>
  );
};
export default ListContentProduct;
