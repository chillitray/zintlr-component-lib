'use strict';

var React = require('react');
var sonner = require('sonner');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

// src/index.js
var ToastWrapper = ({
  position = "bottom-right",
  expand = false,
  richColors = true,
  closeButton = true,
  ...props
}) => {
  return /* @__PURE__ */ React__default.default.createElement(
    sonner.Toaster,
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
    sonner.toast.success(`${type} copied to clipboard`);
  }
};
var copy_to_clipboard_default = copy_to_clipboard;

// src/index.js
var Example = () => {
  return /* @__PURE__ */ React__default.default.createElement("div", null, "Example Component");
};

Object.defineProperty(exports, "toast", {
  enumerable: true,
  get: function () { return sonner.toast; }
});
exports.Example = Example;
exports.ToastWrapper = ToastWrapper;
exports.copy_to_clipboard = copy_to_clipboard_default;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map