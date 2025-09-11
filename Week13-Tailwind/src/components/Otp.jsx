import { useRef, useState } from "react";

export function Otp() {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  const [disabled, setDisabled] = useState(true);

  return (
    <div className="flex flex-col items-center">
      {/* OTP Inputs */}
      <div className="flex justify-center">
        <SubOtpBox reference={ref1} onDone={() => ref2.current.focus()} prevRef={null}/>
        <SubOtpBox reference={ref2} onDone={() => ref3.current.focus()} prevRef={ref1}/>
        <SubOtpBox reference={ref3} onDone={() => ref4.current.focus()} prevRef={ref2}/>
        <SubOtpBox reference={ref4} onDone={() => ref5.current.focus()} prevRef={ref3}/>
        <SubOtpBox reference={ref5} onDone={() => ref6.current.focus()} prevRef={ref4}/>
        <SubOtpBox reference={ref6} onDone={() => setDisabled(false)} prevRef={ref5}/>
      </div>

      {/* Submit Button */}
      <button
        disabled={disabled}
        className={`mt-4 px-6 py-2 rounded-lg text-white font-bold ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Verify OTP
      </button>
    </div>
  );
}

function SubOtpBox({ reference, onDone,prevRef}) {
  return (
    <div>
      <input
        ref={reference}
        maxLength={1}
        onChange={(e) => {
          if (e.target.value.length === 1 && onDone) {
            onDone();
          }
        }}
          onKeyDown={(e) => {
          if (e.key === "Backspace" && !e.target.value && prevRef) {
            prevRef.current.focus();
          }
        }}
        type="text"
        className="m-2 w-[40px] h-[50px] rounded-2xl bg-blue-500 outline-none text-xl text-white text-center"
      />
    </div>
  );
}
