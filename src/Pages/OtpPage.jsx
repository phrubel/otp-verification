import React from 'react';
import { SiAdguard } from 'react-icons/si';
// import OTPInput, { ResendOTP } from "otp-input-react";

const OtpPage = () => {
  return (
    <section className="bg-[#111A2B] h-screen flex justify-center items-center">
      <div>
        <div className="w-90 flex flex-col rounded-lg p-4 gap-4">
          <h1 className="text-center text-green-700 leading-normal font-semibold text-3xl">
            OTP Verification Powered By Firebase
          </h1>

          <div className="bg-white w-fit text-emerald-500 mx-auto p-4 rounded-full ">
            <SiAdguard size={25} />
          </div>
          <label
            htmlFor="phone"
            className="font-bold m-4 text-white text-center"
          >
            Enter Your OTP
          </label>
          {/* import otp-input from package  */}
          {/* <OtpInput/> */}
        </div>
      </div>
    </section>
  );
};

export default OtpPage;
