// import React, { useState } from 'react';
// import { SiAdguard } from 'react-icons/si';
// import { BsFillTelephoneFill } from 'react-icons/bs';
// import { ImSpinner9 } from 'react-icons/im';
// // import package
// import OtpInput, { ResendOTP } from 'otp-input-react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// import { auth } from './firebase.config';
// // import { RecaptchaVerifier } from 'firebase/auth';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// import { Toaster } from 'react-hot-toast';

// const OtpPage = () => {
//   const [OTP, setOTP] = useState();
//   const [phone, setPhone] = useState();
//   const [loading, setLoading] = useState(false);
//   const [showOtp, setShowOtp] = useState(true);
//   const [user, setUser] = useState(null);

//   function verifyCaptcha() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         'recaptcha-container',
//         {
//           size: 'invisible',
//           callback: (response) => {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             signUp();
//           },
//           'expired-callback': () => {
//             // Response expired. Ask user to solve reCAPTCHA again.
//             // ...
//           },
//         },
//         auth
//       );
//     }
//   }

//   function signUp() {
//     setLoading(true);
//     verifyCaptcha();

//     const appVerifier = window.recaptchaVerifier;

//     const formatPhone = '+' + phone;
//     signInWithPhoneNumber(auth, formatPhone, appVerifier)
//       .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOtp(true);
//         toast.success('OTP send Successfully!');
//       })
//       .catch((error) => {
//         // Error; SMS not sent
//         console.log(error, 'Sms not sent');
//         setLoading(false);
//       });
//   }

//   function onOTPVerify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(async (res) => {
//         console.log(res);
//         setUser(res.user);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }

//   return (
//     <section className="bg-[#111A2B] h-screen flex justify-center items-center">
//       <div>
//         <Toaster toastOptions={{ duration: 4000 }} />
//         <div id="recaptcha-container"></div>
//         {user ? (
//           <h1 className="text-center font-semibold text-white  text-2xl">
//             Yay..!!!
//             <br /> Login Successfully
//           </h1>
//         ) : (
//           <div className="w-90 flex flex-col rounded-lg p-4 gap-4">
//             <h1 className="text-center text-green-700 leading-normal font-semibold text-3xl">
//               OTP Verification Powered By Firebase
//             </h1>
//             {showOtp ? (
//               <>
//                 <div className="bg-white w-fit text-emerald-500 mx-auto p-4 rounded-full ">
//                   <SiAdguard size={25} />
//                 </div>
//                 <label
//                   htmlFor="phone"
//                   className="font-bold m-4 text-white text-center"
//                 >
//                   Enter Your OTP
//                 </label>
//                 {/* import otp-input from package */}
//                 <OtpInput
//                   value={OTP}
//                   onChange={setOTP}
//                   otpType={Number}
//                   disabled={false}
//                   OTPLength={6}
//                   autoFocus
//                   className="justify-center items-center"
//                 />
//                 <ResendOTP
//                   className="text-white justify-center items-center"
//                   onResendClick={() => console.log('Resend clicked')}
//                 />
//                 <button className="bg-green-700 w-full flex gap-2 justify-center items-center text-white py-3 rounded">
//                   {loading && (
//                     <ImSpinner9 size={22} className="mt-1 animate-spin" />
//                   )}
//                   <span className="font-semibold">Verify Otp</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="bg-white w-fit text-emerald-500 mx-auto p-4 rounded-full ">
//                   <BsFillTelephoneFill size={25} />
//                 </div>
//                 <label
//                   htmlFor=""
//                   className="font-bold m-4 text-white text-center"
//                 >
//                   Verify Your Phone
//                 </label>
//                 {/* import phone-input from package  */}
//                 <PhoneInput
//                   country={'bd'}
//                   value={phone}
//                   onChange={setPhone}
//                   className=""
//                 ></PhoneInput>
//                 <button
//                   onClick={signUp}
//                   className="bg-green-700 w-full flex gap-2 justify-center items-center text-white py-3 rounded"
//                 >
//                   {loading && (
//                     <ImSpinner9 size={22} className="mt-1 animate-spin" />
//                   )}
//                   <span className="font-semibold">Send Otp</span>
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default OtpPage;

import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

import OtpInput from 'otp-input-react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth } from './firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignup();
          },
          'expired-callback': () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = '+' + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sended successfully!');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={'in'} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
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
