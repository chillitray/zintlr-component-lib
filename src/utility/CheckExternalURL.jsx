import React from 'react';
import Link from 'next/link';
import { get_formated_url } from '../helpers/get_formated_url';

/**
 * This component represents a link to an external URL.
 * url The URL to which the link points.
 * className Additional CSS class name(s) for styling the link.
 * children The content inside the link component.
 * @returns {React.ReactNode}
 */
function CheckExternalURL({ url, children, className }) {
  return (
    // Use Next.js Link component to wrap the link for client-side navigation.
    // The 'href' attribute will be set to the formatted URL using the 'get_formated_url' helper function.
    // The 'prefetch' prop is set to 'false' to prevent preloading the linked page.
    // The 'passHref' prop ensures that the 'a' tag receives the 'href' attribute properly.
    <Link href={get_formated_url(url)} passHref prefetch={false}>
      {/* The link opens in a new tab using 'target="_blank"'. */}
      {/* The 'className' prop is applied to the 'a' tag for custom styling. */}
      {/* The 'rel' attribute is set to 'noopener noreferrer' for security reasons when opening in a new tab. */}
      <a className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Link>
  );
}

export default CheckExternalURL;
