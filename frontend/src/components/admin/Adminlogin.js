import React from "react";

const AdminLogin = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0a1a33] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-row items-center justify-center py-5">
        <div className="layout-content-container flex w-full max-w-[960px] flex-1 justify-between items-center gap-10 px-10">
          {/* Image Section */}
          <div className="flex-shrink-0 w-[350px] h-[350px] bg-center bg-no-repeat bg-cover rounded-xl"
            style={{
              backgroundImage:
              'url("https://cdn.usegalileo.ai/sdxl10/ccd187b0-2b78-45fc-b3ee-ac10a18ff94b.png")',
            }}
          ></div>

          {/* Login Form Section */}
          <div className="flex flex-col w-full max-w-[480px]">
            <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center pb-5">
              Admin Login
            </h1>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Email ID
                </p>
                <input
                  placeholder="example@domain.com"
                  className="form-input flex w-full resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#344d65] bg-[#1a2632] focus:border-[#344d65] h-14 placeholder:text-[#93adc8] p-[15px] text-base font-normal leading-normal"
                />
              </label>

              <label className="flex flex-col">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Password
                </p>
                <input
                  type="password"
                  placeholder="********"
                  className="form-input flex w-full resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#344d65] bg-[#1a2632] focus:border-[#344d65] h-14 placeholder:text-[#93adc8] p-[15px] text-base font-normal leading-normal"
                />
              </label>

              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#156bc1] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log in</span>
              </button>
            </div>

            <p className="text-[#93adc8] text-sm font-normal leading-normal pt-3 text-center">
              Admin cannot signup. Contact developer for ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
