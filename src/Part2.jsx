import React from "react";

export default function Partr2() {
  return (
    <div>
      <h1 className="text-center font-bold text-xl mt-10 after:content-[':Red\_Group']">
        Channel
      </h1>
      <input
        type="text"
        placeholder="Your email"
        className="outline-0 border border-white/50 border-solid rounded-md border-transparent transition-colors ease-in-out duration-300
         focus:border-orange-500 border-transparent mx-auto block mt-10 px-3 py-1"
      />
      <button
        className="rounded bg-orange-500 hover:bg-orange-700 focus transition-colors ease-in-out
      duration-300 mt-10 mx-auto block px-2 border border-white/50 border solid "
      >
        Click me
      </button>
      <div
        className="mx-auto mt-10 w-30 h-30 text-center bg-orange-400 flex justify-center items-center font-bolt
      md:bg-blue-400 transition-colors ease-in-out duration-500 lg:bg-red-500 xl:bg:green-500 2xl:bg-purple-500"
      >
        ADAPTIVE
      </div>
    </div>
  );
}
