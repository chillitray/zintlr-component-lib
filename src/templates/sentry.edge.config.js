// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { PRODUCTION, current_env } from "./constant/endpoints";

if (current_env === PRODUCTION) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
		environment: process.env.NEXT_PUBLIC_ENV_LOCAL,
		integrations: [],
		tracesSampleRate: 1,
		debug: false,
		initialScope: {
			tags: {
				component: "edge",
			},
		},
		tracesSampler: (samplingContext) => {
			if (samplingContext.transactionContext.name.includes("health_check")) {
				return 0;
			}
			return 1;
		},
	});
}
