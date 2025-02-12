import React from "react";
import { createContext, useContext } from "react";
/**
 * This code defines a context and a custom hook for the pricing pages.
 * The PricingContext is a React context that provides
 * a default value containing different properties which can be used for pricing
 */
export const PricingContext = /*#__PURE__*/createContext({
  packs: null
});
export const usePricingContext = () => useContext(PricingContext);