import RequestLogger from "./logger";
import { generateRequestId } from "./generateRequestId";
import isBrowser from "../../helpers/Subitems/isBrowser";

export function withServerSideLogging(getServerSidePropsFunction) {
	return async (context) => {
		// Skip logging on client-side
		if (isBrowser()) {
			return await getServerSidePropsFunction(context);
		}

		// Create request data for server-side rendering
		const requestData = {
			requestId: `ssr_${generateRequestId()}`,
			url: context.resolvedUrl || context.req?.url || "unknown",
			method: context.req?.method || "SSR",
			userAgent: context.req?.headers?.["user-agent"] || "unknown",
			ip:
				context.req?.headers?.["x-forwarded-for"] ||
				context.req?.headers?.["x-real-ip"] ||
				context.req?.connection?.remoteAddress ||
				"unknown",
			timestamp: new Date().toISOString(),
		};

		const logger = new RequestLogger(requestData);

		try {
			logger.startCapturing();

			// Execute function (user console.log statements will be captured silently)
			const result = await getServerSidePropsFunction(context);

			// Stop capturing and show results
			logger.stopCapturing();

			// Print summary
			logger.printSummary();

			return result;
		} catch (error) {
			logger.stopCapturing();
			logger.printSummary(error);
			throw error;
		}
	};
}

// ==========================================
// getInitialProps WRAPPER
// ==========================================

/**
 * Wrapper for getInitialProps with logging
 * Usage: YourComponent.getInitialProps = withInitialPropsLogging(yourFunction);
 */
export function withInitialPropsLogging(getInitialPropsFunction) {
	return async (context) => {
		if (isBrowser()) {
			// On client side, just log and run normally
			console.log(`🖥️ getInitialProps (client-side) for: ${context.pathname}`);
			return await getInitialPropsFunction(context);
		}

		// Server-side: use full logging
		const requestData = {
			requestId: `initial_${generateRequestId()}`,
			url: context.pathname || context.req?.url || "unknown",
			method: context.req?.method || "INITIAL",
			userAgent: context.req?.headers?.["user-agent"] || "unknown",
			ip:
				context.req?.headers?.["x-forwarded-for"] ||
				context.req?.headers?.["x-real-ip"] ||
				context.req?.connection?.remoteAddress ||
				"unknown",
			timestamp: new Date().toISOString(),
		};

		const logger = new RequestLogger(requestData);

		try {
			logger.startCapturing();

			const result = await getInitialPropsFunction(context);

			// Stop capturing and show completion
			logger.stopCapturing();

			// Print summary
			logger.printSummary();

			return result;
		} catch (error) {
			logger.stopCapturing();
			logger.printSummary(error);
			throw error;
		}
	};
}

// ==========================================
// getStaticProps WRAPPER
// ==========================================

/**
 * Wrapper for getStaticProps (runs at build time)
 * Usage: export const getStaticProps = withStaticPropsLogging(yourFunction);
 */
export function withStaticPropsLogging(getStaticPropsFunction) {
	return async (context) => {
		// Build-time logging
		const requestData = {
			requestId: `static_${generateRequestId()}`,
			url: context.params ? JSON.stringify(context.params) : "index",
			method: "STATIC",
			userAgent: "Next.js Build",
			ip: "build-time",
			timestamp: new Date().toISOString(),
		};

		const logger = new RequestLogger(requestData);

		try {
			logger.startCapturing();

			const result = await getStaticPropsFunction(context);

			// Stop capturing and show results
			logger.stopCapturing();

			// Print summary
			logger.printSummary();

			return result;
		} catch (error) {
			logger.stopCapturing();
			logger.printSummary(error);
			throw error;
		}
	};
}

// Advanced: Automatic wrapper that detects the function type
export function withPageLogging(pageFunction, functionType = "getServerSideProps") {
	switch (functionType) {
		case "getServerSideProps":
			return withServerSideLogging(pageFunction);
		case "getInitialProps":
			return withInitialPropsLogging(pageFunction);
		case "getStaticProps":
			return withStaticPropsLogging(pageFunction);
		default:
			throw new Error(`Unknown function type: ${functionType}`);
	}
}
