import React from 'react';
import Link from 'next/link';

const HelpSupportCard = ({ item }) => {
  return (
    <div>
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
    </div>
  );
};

export default HelpSupportCard;
