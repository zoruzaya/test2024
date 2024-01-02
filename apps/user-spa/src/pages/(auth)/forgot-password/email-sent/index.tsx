import React from "react";

const VerifyOtp = () => (
  <div className="flex w-full max-w-md flex-1 flex-col justify-center gap-2 px-8">
    <a
      href="/login"
      className="bg-btn-background hover:bg-btn-background-hover text-foreground group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>{" "}
      Back
    </a>

    <div className="center-normal text-md text-center text-white">
      Email sent
    </div>
    <a
      href="/login"
      className="bg-btn-background hover:bg-btn-background-hover  text-foreground group  items-center rounded-md px-4 py-2 text-center text-sm no-underline"
    >
      Go to Top
    </a>
  </div>
);
export default VerifyOtp;
