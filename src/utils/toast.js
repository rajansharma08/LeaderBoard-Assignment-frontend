import { toast } from "react-toastify";

const commonOptions = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const showSuccessToast = (message) => {
  toast.success(message, commonOptions);
};

export const showErrorToast = (message) => {
  toast.error(message, commonOptions);
};

export const showInfoToast = (message) => {
  toast.info(message, commonOptions);
};

export const showWarnToast = (message) => {
  toast.warn(message, commonOptions);
};
