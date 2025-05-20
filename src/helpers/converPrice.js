const AVG_CONVERSION_RATE = 82.1507;

/**
 * Converts the default price of each pack to Indian Rupees (INR) based on the provided conversion rate.
 * @param {Object} pack - The pack object containing meta_info and default_price.
 * @param {Object} conversion_rate - The conversion rate object containing currency conversion rates.
 * @returns {Object} - The modified pack object with converted price in INR added.
 */
const convertPrice = (pack, conversion_rate) => {
  if (!pack?.meta_info?.[0]?.default_price) return pack;

  const price = pack.meta_info[0].default_price[0]?.price;

  if (!isNaN(price)) {
    pack.meta_info[0].default_price.push({
      currency: "INR",
      price: Math.round(price * (conversion_rate?.inr || AVG_CONVERSION_RATE)),
      country: "India",
    });
  }

  return pack;
};

export default convertPrice;
