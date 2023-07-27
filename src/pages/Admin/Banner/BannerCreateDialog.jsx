
import {
  Box,
  Button,
  DialogActions,
  Drawer,
  IconButton,
  Slide,
  Stack,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import * as actions from "./api/bannerAction";
import { useDispatch } from "react-redux";
import Label from "../../../components/label/Label";
import InputAdmin from "../../../components/input/InputAdmin";
import { yupResolver } from "@hookform/resolvers/yup";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BannerCreateDialog = (props) => {
  const schemaValidation = Yup.object().shape({
    image: Yup.string().required("Vui lòng chọn ảnh"),
    name: Yup.string().required("Vui lòng nhập thứ tự ảnh bìa"),
  });

  const [typeFile, setTypeFile] = useState("");
  const [thumb, setThumb] = useState("");
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const dispatch = useDispatch();


  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    //resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  useEffect(() => {
    if (props.isEdit) {
      setThumb(props.data?.imageBanner);
      setValue("doUuTien", props.data?.doUuTien)
    } else if (!props.isEdit) {
      setThumb(null);
    }
  }, [props.data, props.isEdit, setValue]);
  const handleChangeImage = (e) => {
    if (
      e.target.files[0]?.type === "image/jpeg" ||
      e.target.files[0]?.type === "image/png" ||
      e.target.files[0]?.type === "image/jpg"
    ) {
      if (e.target && e.target.files[0]) {
        setTypeFile("image");
        setThumb(URL?.createObjectURL(e.target.files[0]));
      } else {
        toast.warning("Please choose file");
      }
    }
  };
  const handleResetFileChoosen = () => {
    setThumb(null);
  };
  const handleSubmitCreateBanner = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const formData = new FormData();
      const imageFile = document.getElementById("bannerImage");
      formData.append("image", imageFile.files[0]);
      const { doUuTien } = values;
      const cloneValueUpdate = {
        doUuTien,
        //imageToDeletePublicId: props.data?.imagePublicId,
        id: props.data._id,
      };
      formData.append("data", JSON.stringify(cloneValueUpdate));
      dispatch(actions.updateBanner(formData));
    } else {
      const formData = new FormData();
      const imageFile = document.getElementById("bannerImage");
      formData.append("image", imageFile.files[0]);
      formData.append("data", JSON.stringify(values));
      dispatch(actions.createBanner(formData));
    }
    reset();
    setThumb("");

    handleCloseDialog();
  };

  return (
    <>
      <Drawer
        open={props.open}
        TransitionComponent={Transition}
        anchor="right"
        sx={{ maxWidth: "450px !important" }}
        disableEscapeKeyDown
        aria-describedby="alert-dialog-slide-description">
        <Box sx={{ paddingX: "24px", paddingY: "24px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}>
            <Typography variant="h5">
              {props.isEdit ? "Cập nhật ảnh bìa" : "Thêm ảnh bìa"}
            </Typography>
            <IconButton title="Đóng" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <div className="p-1">
            <form onSubmit={handleSubmit(handleSubmitCreateBanner)}>
              <Stack direction="column" spacing={1} mb={3}>
                <label
                  className={`cursor-pointer w-[530px] h-[250px] flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden border border-dotted border-green-500`}>
                  <input
                    type="file"
                    name="image"
                    id="bannerImage"
                    className="hidden-input"
                    onChange={handleChangeImage}

                  />
                  {!thumb ? (
                    <div className="flex flex-col items-center text-center pointer-events-none py-4">
                      <img
                        srcSet="/img/upload-img.jpg"
                        alt="upload-img"
                        className="w-[200px] h-full mb-1 object-cover"
                      />
                      <p className="font-semibold">Chọn ảnh</p>
                    </div>
                  ) : (
                    <React.Fragment>
                      <img
                        src={thumb}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <button
                        className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer z-10  opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
                        onClick={handleResetFileChoosen}
                        type="button">
                        <BsTrash className="text-red-500 text-4xl"></BsTrash>
                      </button>
                    </React.Fragment>
                  )}
                </label>
                <Stack direction="column" spacing={1} mb={3}>
                  <Label>Thứ tự ưu tiên:</Label>
                  <InputAdmin
                    type="number" control={control} name="doUuTien"
                    placeholder="Nhập thứ tự ưu tiên"
                  />
                  {errors && <p className="text-red-600">{errors.name?.message}</p>}
                </Stack>
              </Stack>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCloseDialog}
                  startIcon={<HighlightOffIcon />}
                  type="button">
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveAltIcon />}>
                  {props.isEdit ? "Cập nhật" : "Thêm"}
                </Button>

              </DialogActions>


            </form>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default BannerCreateDialog;