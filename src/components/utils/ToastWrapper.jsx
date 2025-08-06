import { Toaster, toast } from 'sonner';
// Toast component that provides the Toaster container
const ToastWrapper = ({ ToasterProps }) => {
  return <Toaster position="top-right" richColors {...ToasterProps} />;
};

export { toast, ToastWrapper };
