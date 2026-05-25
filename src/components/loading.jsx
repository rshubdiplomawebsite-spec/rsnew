import React from "react";

const Loading = () => {
  return (
    <div className="rs-shell flex min-h-screen items-center justify-center px-5">
      <div className="rs-card flex flex-col items-center gap-5 p-8 text-center">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#f59e0b] border-r-[#1a56ff]"></div>
        </div>
        <div>
          <p className="font-display text-xl font-bold text-white">
            RS Hub Study Material
          </p>
          <p className="mt-1 text-sm text-gray-400">Loading study material...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
