import React from "react";

export default function SweetfullBanner() {
  return (
    <div className="relative w-full h-[160px] md:h-[220px] overflow-hidden flex items-stretch bg-[#EDD6DA]">
      {/* Left Text Section */}
      <div className="w-1/2 h-full flex items-center justify-center pl-6 pr-4 z-10">
        <h2 className="text-[#2E2E38] text-lg md:text-2xl font-semibold italic text-center">
          Enriching Relationships<br />
          Through Sweetfull Cakes..!!
        </h2>
      </div>

      {/* Diagonal Divider */}
      <div className="absolute left-1/2 top-0 h-full w-2 rotate-[10deg] bg-[#A87A58] z-20" />

      {/* Right Image Section */}
      <div className="left-1/2 w-1/2 h-full z-0">
        <img
          src="/assets/images/sweetcakes.jpg"
          alt="Celebration with cake"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
