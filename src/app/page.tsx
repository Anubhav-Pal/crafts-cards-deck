"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { colors, headingsArray } from "../../constants";

const MainComponent = () => {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const userScrollFunction = useCallback(() => {
    const threshold = 100;
    cardRefs.current.map((cardRef, index) => {
      const cardTop = cardRef.getBoundingClientRect().top;
      if (cardTop <= threshold + index * 10) {
        cardRef.style.position = "sticky";
        cardRef.style.top = `${threshold + index * 10}px`;
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(userScrollFunction);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-2 pt-[100.9px] bg-[#FAFAFA] scroll-smooth	 px-3 md:px-0">
      {headingsArray.map((box, index) => {
        return box.heading !== "" ? (
          <div
            ref={(ref) => {
              if (ref) {
                cardRefs.current[index] = ref;
              }
            }}
            key={box.heading}
            className="flex items-center justify-center text-2xl rounded-3xl border-[1px]  border-zinc-300 h-[300px] md:h-[450px] w-full md:w-4/5 xl:w-2/3 md:mx-0 transition-transform scroll-smooth	 duration-300 px-3 md:px-0"
            style={{
              zIndex: index,
              backgroundColor: colors[index],
            }}
          >
            <div className="flex flex-col items-center justify-between text-center gap-10">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-semibold">{box.heading}</div>
                <div className="text-sm font-normal text-gray-600">
                  {box.subheading}
                </div>
              </div>
              <div className="text-sm rounded-full px-4 py-2 bg-black text-white cursor-pointer">
                {box.ctaText}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center text-2xl rounded-md h-[450px] w-2/3"></div>
        );
      })}
    </div>
  );
};

export default MainComponent;
