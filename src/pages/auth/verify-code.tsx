import React, { useRef, useState } from "react";
import { successMessage, warningMessage } from "../../services/show-message";
import axios from "axios";
import { useParams } from "react-router-dom";

const OTPInput = () => {
  const params = useParams();
  console.log(params);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // разрешаем только цифры
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // переход на следующий input
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // возвращаемся к предыдущему input
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("Text").slice(0, 4).split("");
    const newOtp = [...otp];
    paste.forEach((char, idx) => {
      if (/^\d$/.test(char) && idx < 4) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);

    // ставим фокус на первый пустой input
    const firstEmpty = newOtp.findIndex((v) => v === "");
    if (firstEmpty !== -1) {
      inputRefs.current[firstEmpty]?.focus();
    }
    e.preventDefault();
  };

  async function handleSubmit() {
    const code = otp.join("");
    const pattern = /^\d{4}$/;
    if (!pattern.test(code)) {
      warningMessage("Пожалуйста, введите корректный 4-значный код.");
      return;
    }

    const res = await axios.post(
      "http://localhost:4000/api/v2/auth/verify-code",
      { code }
    );
    if (res?.status === 200) {
      successMessage("Вы успешно авторизовались", "Успех");
      // navigate('/verify-code')
    }
    return;

    // тут отправка на сервер
  }

  return (
    <div className="text-white font-bold text-center">
      <div className="m-auto mt-20 w-120 p-20 border border-orange-500 rounded-md border-solid">
        <h1 className="mb-8 text-2xl text-orange-400">
          Введите код авторизации
        </h1>
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:border-orange-500 focus:outline-none"
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-400 transition-colors"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
