// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { PRODUCTION, current_env } from "./constant/endpoints";

if (current_env === PRODUCTION) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
		environment: process.env.NEXT_PUBLIC_ENV_LOCAL,
		integrations: [
			new Sentry.Integrations.Http(),
			new Sentry.Integrations.Console(),
			new Sentry.Integrations.LocalVariables({
				captureAllExceptions: false,
			}),
		],
		tracesSampleRate: 1,
		debug: false,
		beforeSend(event) {
			// Server-side filtering
			if (event.exception) {
				const error = event.exception.values?.[0];
				if (error?.type === "AbortError" || error?.value?.includes("ECONNRESET")) {
					return null; // Filter out connection aborts
				}
			}
			return event;
		},
		tracesSampler: (samplingContext) => {
			if (samplingContext.transactionContext.name.includes("health_check")) {
				return 0;
			}
			return 1;
		},
		initialScope: {
			tags: {
				component: "server",
				version: process.env.npm_package_version,
			},
		},
	});
}
