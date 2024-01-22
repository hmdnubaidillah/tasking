"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  function handleArrowVisible() {
    const scroll = document.documentElement.scrollTop;

    if (scroll < 100) {
      setIsArrowVisible(false);
      return;
    }
    setIsArrowVisible(true);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleArrowVisible);
  }, []);

  function handleToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div
        onClick={handleToTop}
        className={`w-[50px] h-[50px] bg-secondaryBlue rounded-full grid place-content-center fixed ${
          isArrowVisible ? "bottom-10" : "-bottom-[200px]"
        }  right-10 shadow-md transition-all cursor-pointer hover:bg-slate-500`}
      >
        <i className="uil uil-arrow-up text-4xl text-white"></i>
      </div>
    </>
  );
}
