import { Label } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React from "react";
import InputAdmin from "../input/InputAdmin";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import * as actions from "../../pages/Admin/Order/api/oderAction";
const ConfirmLyDoHuy = (props) => {

    const handleClose = (status) => {
        props.closeDialog(status);
    };
    const dispatch = useDispatch();
    const schemaValidation = Yup.object().shape({
        lyDoHuy: Yup.string().required("Vui lòng nhập lý do"),

    });
    const {
        control,
        handleSubmit,
        formState: { isValid, errors }
    } = useForm({
        resolver: yupResolver(schemaValidation),
        mode: "onChange",
    });


    const handleSumitLyDoHuy = async (values) => {

        dispatch(actions.deleteOrder(props.selectOrderId, values));
        handleClose(false);
    };
    return (
        <>
            <Dialog
                open={props.openDialog}
                onClose={(e) => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title p-4">Thông báo!</DialogTitle>
                <form onSubmit={handleSubmit(handleSumitLyDoHuy)}>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {props.description}
                        </DialogContentText>

                        <InputAdmin
                            type="text" name="lyDoHuy" control={control}
                            placeholder="Nhập lý do hủy"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={(e) => handleClose(false)}
                            color="error"
                            variant="outlined">
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            color="secondary"
                            autoFocus
                            variant="contained">
                            Đồng ý
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ConfirmLyDoHuy;
