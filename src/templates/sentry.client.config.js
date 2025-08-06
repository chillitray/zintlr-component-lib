// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';
import { PRODUCTION, current_env } from './constant/endpoints';

if (current_env === PRODUCTION) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_ENV_LOCAL,
    integrations: [
      new Sentry.Replay({
        maskAllText: true,
        maskAllInputs: true,
        blockAllMedia: false,
      }),
      new Sentry.Integrations.Breadcrumbs({
        console: true,
        dom: true,
        fetch: true,
        history: true,
        sentry: true,
        xhr: true,
      }),
      new Sentry.Integrations.GlobalHandlers({
        onerror: true,
        onunhandledrejection: true,
      }),
      new Sentry.Integrations.Dedupe(),
      new Sentry.Integrations.HttpContext(),
      new Sentry.Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: false,
    tracesSampler: samplingContext => {
      if (samplingContext.transactionContext.name.includes('health_check')) {
        return 0;
      }
      return 1;
    },
    initialScope: {
      tags: {
        component: 'client',
        version: process.env.npm_package_version,
      },
    },
  });
}
