'use client';

import React, { useState } from 'react';

const EyeIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={`
      w-5 h-5 
      pointer-events-none 
      transition-all duration-300 ease-out
      ${active
        ? 'text-gray-700 drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]'
        : 'text-gray-400'}
    `}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639
         C3.423 7.51 7.36 4.5 12 4.5
         c4.638 0 8.573 3.007 9.963 7.178
         .07.207.07.431 0 .639
         C20.577 16.49 16.64 19.5 12 19.5
         c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-none border border-gray-200 shadow-none">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <div className="flex flex-col gap-4">
          {/* ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* PW */}
          <div className="flex flex-col relative">
            <label className="text-sm font-medium text-gray-700 mb-1">PW</label>
            <input
              type={showPw ? 'text' : 'password'}
              className="w-full border border-gray-300 px-3 py-2 pr-10 text-black focus:outline-none focus:border-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPw((prev) => !prev)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="absolute right-3 top-[38px]"
              aria-label="toggle password visibility"
            >
              <EyeIcon active={hovered || showPw} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
