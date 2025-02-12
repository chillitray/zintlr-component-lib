export const AVG_CONVERSION_RATE = 82.1507;

/**
 * Converts the default price of a pack to INR.
 */
export const convert_price = (pack, conversion_rate) => {
  const price = pack.meta_info?.[0].default_price?.[0].price;
  if (!isNaN(price)) {
    pack.meta_info?.[0].default_price.push({
      currency: "INR",
      price: Math.round(price * (conversion_rate?.inr || AVG_CONVERSION_RATE)),
      country: "India"
    });
  }
  return pack;
};