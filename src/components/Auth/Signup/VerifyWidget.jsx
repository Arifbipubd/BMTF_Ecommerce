import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import InputCom from "../../Helpers/InputCom";
import LoaderStyleOne from "../../Helpers/Loaders/LoaderStyleOne";
import languageModel from "../../../../utils/languageModel";

function VerifyWidget({ redirect = true, verifyActionPopup }) {
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  console.log(phone);
  const router = useRouter();
  const location = useRouter();
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  const doVerify = async () => {
    setLoading(true);
    await apiRequest
      .verification(
        {
          email: location.query.email,
        },
        otp
      )
      .then((res) => {
        setLoading(false);
        if (res) {
          toast.success(res.data.notification);
          if (redirect) {
            router.push("/login");
          } else {
            verifyActionPopup();
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          if (err.response.data.notification) {
            toast.error(err.response.data.notification);
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  };

  // Resent otp
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);
  let intervalId = null;

  // Function to start the timer
  const startTimer = () => {
    setIsDisabled(true);
    setTimer(30);
    intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(intervalId);
          setIsDisabled(false);
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    // Start the timer when the component mounts
    startTimer();

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleResend = async () => {
    try {
      const res = await apiRequest.resend({
        email: location.query.email,
        phone,
      });
      toast.success(res.data.notification);
      startTimer(); // Start the timer again
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="w-full">
      <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
        <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
          {langCntnt && langCntnt.Verify_You}
        </h1>
      </div>
      <div className="input-area">
        <div className="input-item mb-5">
          <InputCom
            placeholder="******"
            label={langCntnt && langCntnt.OTP + "*"}
            name="otp"
            type="text"
            inputClasses="h-[50px]"
            value={otp}
            error={errors}
            inputHandler={(e) => setOtp(e.target.value.trim())}
          />
        </div>

        <div className="signin-area mb-3">
          <div className="flex justify-center">
            <button
              disabled={otp ? false : true}
              onClick={doVerify}
              type="button"
              className="bg-qpurple rounded-full disabled:bg-opacity-60 disabled:cursor-not-allowed  w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
            >
              <span className="text-sm text-white block">
                {langCntnt && langCntnt.Verify}
              </span>
              {loading && (
                <span className="w-5 " style={{ transform: "scale(0.3)" }}>
                  <LoaderStyleOne />
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleResend}
            disabled={isDisabled}
            className="text-blue-500 text-sm hover:underline disabled:hover:no-underline disabled:text-qgray font-bold disabled:cursor-not-allowed"
          >
            Resend OTP
          </button>{" "}
          &nbsp;
          <span className="text-gray-400 text-sm">
            ({Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")})
          </span>
        </div>
      </div>
    </div>
  );
}

export default VerifyWidget;
