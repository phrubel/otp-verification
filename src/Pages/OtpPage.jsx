import React, { useState } from 'react';
import { SiAdguard } from 'react-icons/si';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { ImSpinner9 } from 'react-icons/im';
// import package
import OtpInput, { ResendOTP } from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { auth } from './firebase.config';
import { RecaptchaVerifier } from 'firebase/auth';

const OtpPage = () => {
  const [OTP, setOTP] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(true);
  const [user, setUser] = useState(null);

  const verifyCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  };

  return (
    <section className="bg-[#111A2B] h-screen flex justify-center items-center">
      <div>
        {user ? (
          <h1 className="text-center font-semibold text-white  text-2xl">
            Yay..!!!
            <br /> Login Successfully
          </h1>
        ) : (
          <div className="w-90 flex flex-col rounded-lg p-4 gap-4">
            <h1 className="text-center text-green-700 leading-normal font-semibold text-3xl">
              OTP Verification Powered By Firebase
            </h1>
            {showOtp ? (
              <>
                <div className="bg-white w-fit text-emerald-500 mx-auto p-4 rounded-full ">
                  <SiAdguard size={25} />
                </div>
                <label
                  htmlFor="phone"
                  className="font-bold m-4 text-white text-center"
                >
                  Enter Your OTP
                </label>
                {/* import otp-input from package */}
                <OtpInput
                  value={OTP}
                  onChange={setOTP}
                  otpType={Number}
                  disabled={false}
                  OTPLength={6}
                  autoFocus
                  className="justify-center items-center"
                />
                <ResendOTP
                  className="text-white justify-center items-center"
                  onResendClick={() => console.log('Resend clicked')}
                />
                <button className="bg-green-700 w-full flex gap-2 justify-center items-center text-white py-3 rounded">
                  {loading && (
                    <ImSpinner9 size={22} className="mt-1 animate-spin" />
                  )}
                  <span className="font-semibold">Verify Otp</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white w-fit text-emerald-500 mx-auto p-4 rounded-full ">
                  <BsFillTelephoneFill size={25} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold m-4 text-white text-center"
                >
                  Verify Your Phone
                </label>
                {/* import phone-input from package  */}
                <PhoneInput
                  country={'bd'}
                  value={phone}
                  onChange={setPhone}
                  className=""
                ></PhoneInput>
                <button className="bg-green-700 w-full flex gap-2 justify-center items-center text-white py-3 rounded">
                  {loading && (
                    <ImSpinner9 size={22} className="mt-1 animate-spin" />
                  )}
                  <span className="font-semibold">Send Otp</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OtpPage;
