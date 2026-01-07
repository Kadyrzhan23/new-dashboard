import React, { useEffect, useRef, useState } from "react";
import { successMessage, warningMessage } from "../../services/show-message";
import axios from "../../services/axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const OTPInput = () => {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // защита от прямого входа
  useEffect(() => {
    if (!phone) {
      navigate("/login", { replace: true });
    }
  }, [phone, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("Text").slice(0, 4).split("");
    const newOtp = [...otp];

    paste.forEach((char, idx) => {
      if (/^\d$/.test(char)) {
        newOtp[idx] = char;
      }
    });

    setOtp(newOtp);

    const firstEmpty = newOtp.findIndex((v) => v === "");
    inputRefs.current[firstEmpty === -1 ? 3 : firstEmpty]?.focus();

    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitCode();
  };

  const submitCode = async () => {
    if (isLoading) return;
  
    const code = otp.join("");
    if (!/^\d{4}$/.test(code)) return;
    if (!phone) return;
  
    setLoading(true);
  
    try {
      const res = await axios.post("/auth/verify-code", { code, phone });
  
      if (res.status === 200) {
        successMessage(
          "Вы успешно авторизовались. Перенаправляю вас в админ-панель"
        );

        navigate("/admin", { replace: true });
      }
    } catch (error: any) {
      warningMessage(
        error.response?.data?.message || "Неверный код",
        "Ошибка"
      );
  
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };
  

  const loginFunc = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/auth/send-code", { phone });
      if (res.status === 200) {
        successMessage("Код отправлен повторно");
      }
    } catch (error: any) {
      warningMessage(
        error.response?.data?.message || "Ошибка отправки кода"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const code = otp.join("");
  
    if (code.length === 4 && /^\d{4}$/.test(code)) {
      submitCode();
    }
  }, [otp]);
  

  return (
    <div className="flex justify-center text-black">
      <form
        onSubmit={handleSubmit}
        className="mt-20 w-[420px] p-10 border border-gray-300 rounded-md bg-white"
      >
        <h1 className="mb-8 text-2xl font-semibold text-center">
          Введите код подтверждения
        </h1>

        <div className="flex justify-center gap-3">
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
              className="w-12 h-12 text-center text-xl border border-gray-400 rounded-md focus:outline-none focus:border-black"
            />
          ))}
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <span />
          <button
            type="button"
            onClick={loginFunc}
            className="text-gray-600 hover:text-black"
          >
            Запросить новый код
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-6 w-full py-2 rounded-md text-white transition
            ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }
          `}
        >
          {isLoading ? "Проверка..." : "Подтвердить"}
        </button>
      </form>
    </div>
  );
};

export default OTPInput;
