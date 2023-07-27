import React from "react";
import { useController } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
const ImageUpload = ({
  control,
  name,
  selectedFile,
  className,
  onChangeImage,
  ...rest
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <label
      className={`cursor-pointer flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg ${className} relative group overflow-hidden`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={onChangeImage}
        {...rest}
        {...field}
      />
      {!selectedFile ? (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            srcSet="/img/img-upload.png"
            alt="upload-img"
            className="max-w-[80px] mb-5"
          />
          <p className="font-semibold">Choose photo</p>
        </div>
      ) : (
        <React.Fragment>
          <img
            src={selectedFile}
            className="w-full h-full object-cover"
            alt=""
          />
          <button
            className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer z-10  opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
            // onClick={handleDeleteImage}
            type="button"
          >
            <BsTrash className="text-red-500 text-4xl"></BsTrash>
          </button>
        </React.Fragment>
      )}
    </label>
  );
};

export default ImageUpload;
