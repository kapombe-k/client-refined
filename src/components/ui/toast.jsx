import { toast } from 'react-toastify';

export const showToast = (message, type = 'info') => {
    toast[type](message);
};
