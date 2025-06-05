import React from 'react';
import Link from 'next/link';
import ProfileWrapperCard from '../../Utility/ProfileWrapperCard';

/**
 * @typedef {Object} HelpSupportItem
 * @property {string} title - The title of the help support card
 * @property {string} description - The description text
 * @property {string} [url] - Optional URL for the clickable link
 * @property {string} clickable - Text for the clickable element
 * @property {Function} [onClick] - Optional click handler if no URL is provided
 */

/**
 * Help Support Card Component
 * Displays a single help and support item in a card format
 * 
 * @component
 * @example
 * ```jsx
 * const item = {
 *   title: "Getting Started",
 *   description: "Learn how to use Zintlr",
 *   url: "https://docs.zintlr.com",
 *   clickable: "Read More"
 * };
 * <HelpSupportCard item={item} />
 * ```
 * 
 * @param {Object} props
 * @param {HelpSupportItem} props.item - The help support item data
 * @returns {JSX.Element} A card displaying help and support information
 */
const HelpSupportCard = ({ item }) => {
  return (
    <ProfileWrapperCard id="helpSupport" className="flex flex-col gap-5">
      <div className={'flex flex-col gap-3 rounded-md px-3 py-4'}>
        <div className="flex flex-row gap-1">
          {/* <item.icon className="w-5 h-5" /> */}
          <div className="font-semibold text-sm leading-5 text-text-black">{item?.title}</div>
        </div>
        <div className="flex flex-col gap-2.5 p-5 rounded border  bg-white xl:w-[607px]">
          <div className="font-normal text-sm leading-4 text-black">{item?.description}</div>
          {item?.url ? (
            <Link href={item.url} passHref>
              <button
                className="font-semibold text-xs leading-4 text-black00 hover:underline cursor-pointer"
                target="_blank"
              >
                {item.clickable}
              </button>
            </Link>
          ) : (
            <div
              className="font-semibold text-xs leading-4 text-black00 hover:underline cursor-pointer"
              onClick={item?.onClick}
            >
              {item?.clickable}
            </div>
          )}
        </div>
      </div>
    </ProfileWrapperCard>
  );
};

export default HelpSupportCard;
