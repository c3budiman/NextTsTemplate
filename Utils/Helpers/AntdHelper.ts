import { notification } from "antd";

export const showError = (message: string, desription: string) => {
  notification.error({
    message,
    description: desription,
  });
};

export const showSuccess = (message: string, desription: string) => {
  notification.success({
    message,
    description: desription,
  });
};
