import React from "react";

const MinimalLoading = () => {
  return (
    <div className="flex justify-center">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#f59e0b] border-r-[#1a56ff]"></div>
      </div>
    </div>
  );
};

export default MinimalLoading;
