import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { warningMessage } from "../../services/show-message";

export default function Login() {
  const [phone, setPhone] = useState("+998");
  const [loading, setLoading] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(true);
  const navigate = useNavigate();

  async function getMe() {
    setLoading(true);
    try {
      const res = await axios.get("/auth/me");
      if (res.status === 200 && res.data.role === "admin") {
        navigate("/admin");
      }
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  async function loginFunc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsActiveBtn(false);

    try {
      const pattern =
        /^\+?998(33|50|55|70|90|91|77|93|94|95|97|98|99|88)\d{7}$/;

      if (!pattern.test(phone)) {
        warningMessage("Некорректный номер телефона", "Ошибка");
        return;
      }

      const res = await axios.post("/auth/send-code", { phone });

      if (res.status === 200) {
        navigate(`/verify-code?phone=%2B${phone.slice(1)}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActiveBtn(true);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <FadeLoader color="#000000" />
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white text-black">
      <form
        onSubmit={loginFunc}
        className="w-full max-w-sm rounded-xl border border-black/10 p-8 shadow-sm"
      >
        <h1 className="mb-6 text-center text-xl font-semibold">
          Вход в систему
        </h1>

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+998 XX XXX XX XX"
          className="
            w-full rounded-md border border-black/20 bg-white px-3 py-2
            text-center text-sm outline-none
            transition
            focus:border-black focus:ring-1 focus:ring-black
          "
        />

        <button
          disabled={!isActiveBtn}
          className={`
            mt-6 w-full rounded-md py-2 text-sm font-medium
            transition
            ${
              isActiveBtn
                ? "bg-black text-white hover:bg-black/90"
                : "cursor-not-allowed bg-black/40 text-white"
            }
          `}
        >
          {isActiveBtn ? "Получить код" : "Загрузка..."}
        </button>
      </form>
    </div>
  );
}
