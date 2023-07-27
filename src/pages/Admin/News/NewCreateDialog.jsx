import { yupResolver } from "@hookform/resolvers/yup";
import {
  Slide,
  Button,
  Drawer,
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../../components/field";
import * as Yup from "yup";
import InputAdmin from "../../../components/input/InputAdmin";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import * as actions from "./api/newAction";
import Label from "../../../components/label/Label";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import slugify from "slugify";
import { isUndefined } from "lodash";
Quill.register("modules/imageUploader", ImageUploader);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const NewsCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const [typeFile, setTypeFile] = useState("");
  const [content, setContent] = useState("");
  const [thumb, setThumb] = useState("");
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tên bài viết"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const watchTitle = watch("title");

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
  const handleSumitNews = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const formData = new FormData();
      const imageFile = document.getElementById("imageNew");
      formData.append("image", imageFile.files[0]);
      const { imageNew, imagePublicId, title } = values;
      const converSlug =
        values.slug === ""
          ? slugify(values.title, { locale: "vi", lower: true })
          : values.slug;
      const newValues = {
        imageNew,
        imagePublicId,
        slug: converSlug,
        title,
      };
      const cloneValueUpdate = {
        ...newValues,
        content: content,
        id: props.data._id,
      };
      formData.append("data", JSON.stringify(cloneValueUpdate));
      dispatch(actions.updateNew(formData));
    } else {
      const formData = new FormData();
      const imageFile = document.getElementById("imageNew");
      formData.append("image", imageFile.files[0]);
      const converSlug =
        values.slug === ""
          ? slugify(values.title, { locale: "vi", lower: true })
          : values.slug;

      const cloneValue = {
        ...values,
        slug: converSlug,
        content: content,
      };
      const parseJsonValue = JSON.stringify(cloneValue);
      formData.append("data", parseJsonValue);
      dispatch(actions.createNew(formData));
    }
    props.closeCreateDialog(false);
  };
  useEffect(() => {
    if (props.isEdit) {
      reset(props.data);
      setContent(props.data.content);
      setThumb(props.data.imageNew);
    } else if (!props.isEdit) {
      reset({
        title: "",
        slug: "",
      });
      setThumb("");
      setContent("");
    }
  }, [props.data, props.isEdit, reset]);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/api/image/upload-photo`,
            data: bodyFormData,
          });
          return response.data.image.image;
        },
      },
    }),
    []
  );
  useEffect(() => {
    if (!isUndefined(watchTitle)) {
      const slug = slugify(watchTitle, { locale: "vi", lower: true });
      setValue("slug", slug);
    }
  }, [watchTitle]);

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
              {props.isEdit ? "Cập nhật bài viết" : "Thêm bài viết"}
            </Typography>
            <IconButton title="Đóng" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit(handleSumitNews)}>


            <div className="flex flex-col gap-y-5 mb-5">
              <Stack direction="column" spacing={1} mb={3} sx={{ width: "530px" }}>
                <Label>Tiêu đề bài viết:</Label>
                <InputAdmin
                  type="text"
                  control={control}
                  name="title" />
                {errors && <p className="text-red-600">{errors.title?.message}</p>}
              </Stack>
              <Stack direction="column" spacing={1} mb={3} sx={{ width: "530px" }}>
                <Label>Đường dẫn bài viết:</Label>
                <InputAdmin
                  type="text"
                  control={control}
                  name="slug" />
                {errors && <p className="text-red-600">{errors.title?.message}</p>}
              </Stack>
            </div>
            <div className="flex gap-x-5">
              <Stack direction="column" spacing={1} mb={3} >
                <Label>Ảnh bài viết:</Label>
                <label
                  className={`cursor-pointer w-[530px] h-[250px] flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden border border-dotted border-green-500`}>
                  <input
                    type="file"
                    name="image"
                    id="imageNew"
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
              </Stack>
            </div>
            <Stack direction="column" spacing={1} mb={3} sx={{ width: "530px" }}>
              <Field>
                <Label>Nội dung bài viết</Label>
                <div className="w-full entry-content quill">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    modules={modules}
                    onChange={setContent}
                  />
                </div>
              </Field>
            </Stack>

            <div className="flex items-center justify-end gap-x-3 mt-5 ">
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseDialog}
                type="button">
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary">
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default NewsCreateDialog;
