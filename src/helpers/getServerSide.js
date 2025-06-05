import convertPrice from './converPrice';

/**
 * Fetches the conversion rate and subscription data for server-side rendering.
 * @param {Object} context - The Next.js server-side context object.
 * @param {Function} request_caller - Function to make API requests.
 * @param {Object} urlsHandler - Object containing API endpoint URLs.
 * @param {Object} axios - Axios instance provided by the parent.
 * @returns {Object} - Server-side props object.
 */
const getServerSide = async (context, request_caller, urlsHandler, axios) => {
  const response = {};
  const date = new Date().toISOString().slice(0, 10);

  try {
    // Fetch the conversion rate and subscriptions in parallel
    const [conversion_rate_min_promise, subscriptions_promise] = await Promise.allSettled([
      axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/usd/inr.min.json`
      ),
      request_caller({
        endpoint: urlsHandler.apis.subscription.all,
        errorToast: false,
        successToast: false,
        headers: context.req.headers,
      }),
    ]);

    // Handle conversion rate
    let conversion_rate_value = {};
    if (conversion_rate_min_promise.status === 'fulfilled') {
      conversion_rate_value = conversion_rate_min_promise.value.data;
    } else {
      try {
        // Fallback to normal JSON if minified fails
        const normal_rate_res = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/usd/inr.json`
        );
        conversion_rate_value = normal_rate_res.data;
      } catch (_error) {
        conversion_rate_value = {};
      }
    }

    // Handle subscriptions
    if (subscriptions_promise.status === 'fulfilled') {
      const packs = subscriptions_promise.value.data;
      if (packs) {
        packs.custom = (packs?.custom || []).map((pack) =>
          convertPrice(pack, conversion_rate_value)
        );
        packs.generic = (packs?.generic || []).map((pack) =>
          convertPrice(pack, conversion_rate_value)
        );
      }
      response.packs = packs;
    } else {
      response.packs = null;
    }
  } catch (error) {
    console.error('Error in getServerSide:', error);
    response.packs = null;
  }

  return {
    props: {
      ...response,
    },
  };
};

export default getServerSide;
