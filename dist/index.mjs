import React from 'react';
import { Toaster, toast } from 'sonner';
export { toast } from 'sonner';

// src/index.js
var ToastWrapper = ({
  position = "bottom-right",
  expand = false,
  richColors = true,
  closeButton = true,
  ...props
}) => {
  return /* @__PURE__ */ React.createElement(
    Toaster,
    {
      position,
      expand,
      richColors,
      closeButton,
      ...props
    }
  );
};

// src/helpers/isBrowser.js
function isBrowser() {
  return typeof window !== "undefined";
}

// src/helpers/copy_to_clipboard.js
var copy_to_clipboard = (text, type = "Email") => {
  if (isBrowser()) {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  }
};
var copy_to_clipboard_default = copy_to_clipboard;

// src/index.js
var Example = () => {
  return /* @__PURE__ */ React.createElement("div", null, "Example Component");
};

export { Example, ToastWrapper, copy_to_clipboard_default as copy_to_clipboard };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map