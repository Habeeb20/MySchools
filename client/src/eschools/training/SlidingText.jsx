import React from "react";


const SlidingText = () => {
  return (
    <div className="relative w-full overflow-hidden whitespace-nowrap">
      <div className="text-red-500  font-semibold mt-5 inline-block animate-marquee">
        You can only edit your profile when you have a tutorial Name
      </div>
    </div>
  );
};

export default SlidingText;
