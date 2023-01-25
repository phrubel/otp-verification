import OtpInput, { ResendOTP } from 'otp-input-react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth } from './firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { ImSpinner9 } from 'react-icons/im';
import { SiAdguard } from 'react-icons/si';

const VerifyPage = () => {
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const verifyCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            signUp();
          },
          'expired-callback': () => {},
        },
        auth
      );
    }
  };

  const signUp = () => {
    setLoading(true);
    verifyCaptcha();

    const appVerifier = window.recaptchaVerifier;

    const formatPhone = '+' + phone;

    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sended successfully!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('please use Correct Phone Number');
        setLoading(false);
      });
  };

  const verifyOTP = () => {
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
        toast.error('Your OTP does not exist...!!');
        setLoading(false);
      });
  };

  const resendOtp = () => {
    toast.success('OTP Send Successfully!');
  };

  return (
    <section className="bg-[#111A2B] h-screen flex justify-center items-center">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Successfully
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center text-white leading-normal font-semibold text-3xl">
              OTP Verification Powered By Firebase
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <SiAdguard size={25} />
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
                <ResendOTP
                  className="text-white justify-center items-center"
                  onResendClick={() => resendOtp()}
                />
                <button
                  onClick={verifyOTP}
                  className="bg-green-700 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <ImSpinner9 size={22} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillTelephoneFill size={25} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={'bd'} value={phone} onChange={setPhone} />
                <button
                  onClick={signUp}
                  className="bg-green-700 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <ImSpinner9 size={22} className="mt-1 animate-spin" />
                  )}
                  <span className="font-semibold">Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifyPage;
