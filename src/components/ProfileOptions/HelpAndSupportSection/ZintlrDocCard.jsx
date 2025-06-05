import React from 'react';
import Link from 'next/link';
import ProfileWrapperCard from '../../Utility/ProfileWrapperCard';

const ZintlrDocCard = ({ data }) => {
  return (
    <ProfileWrapperCard id="helpSupport" className="flex flex-col w-full gap-5">
      <div className="font-semibold text-base text-text-black">ZINTLR DOCUMENTATION</div>
      {data?.map((item, index) => (
        <div key={index} className="rounded border p-5 flex gap-5 items-center">
          {/* <ImageComponent
            src={item.img.url}
            height={100}
            width={100}
            objectFit="contain"
            alt={item.img.alt}
          /> */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2.5">
              <div className="font-semibold text-sm leading-3  text-text-black">{item?.title}</div>
              <div className="font-normal text-sm leading-3">{item?.description}</div>
            </div>
            <Link href={item?.url} passHref>
              <button
                className="flex gap-1 font-medium text-sm leading-3 text-iris cursor-pointer hover:underline items-center"
                target="_blank"
              >
                <span>{item?.clickable} </span>
                {/* <FaArrowRightLong className="h-4 w-4 mt-0.5" /> */}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </ProfileWrapperCard>
  );
};
export default ZintlrDocCard;
