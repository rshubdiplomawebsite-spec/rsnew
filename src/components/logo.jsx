import React from "react";

const Logo = ({ logo }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src="https://i.ibb.co/mrDvHHXY/logo.jpg"
        alt="RS Hub Study Material"
        className="h-10 w-10 rounded-full border-2 border-[#f59e0b] object-cover"
      />
      {!logo && (
        <div>
          <h1 className="font-display text-xl font-extrabold text-white">
            RS Hub Study Material
          </h1>
          <p className="text-xs text-gray-400">Notes, PYQs & Exam Prep</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
