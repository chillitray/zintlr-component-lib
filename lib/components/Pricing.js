import { useContext } from "react";
import { PricingContext } from "../helpers/PricingContext.js";
const Pricing = () => {
  const {
    packs
  } = useContext(PricingContext);
  if (!packs) return /*#__PURE__*/React.createElement("p", null, "Loading...");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Pricing Plans"), packs.generic?.map(pack => /*#__PURE__*/React.createElement("div", {
    key: pack.id
  }, /*#__PURE__*/React.createElement("h2", null, pack.name), /*#__PURE__*/React.createElement("p", null, "Price:", " ", pack.meta_info?.[0].default_price?.find(p => p.currency === "INR")?.price, " ", "INR"))));
};
export default Pricing;