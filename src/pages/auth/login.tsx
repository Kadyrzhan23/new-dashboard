import { useState } from "react";
import { successMessage, warningMessage } from "../../services/show-message";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function login() {
  const [phone, setPhone] = useState("");
  
  const navigate = useNavigate();

  async function loginFunc(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const pattern = (/^\+?998(33|50|55|70|90|91|77|93|94|95|97|98|99|88)\d{7}$/)
      if (!pattern.test(phone)) {
        warningMessage("Некорректный номер телефона","Ошибка");
        return;
      }
      
      const res = await axios.post('http://localhost:4000/api/v2/auth/send-code',{phone})

      if(res?.status === 200){
        successMessage("Код успешно отправлен на ваш номер телефона","Успех");
        navigate(`/verify-code?phone=${phone}`)
      }
      return

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="text-white font-bold text-center">
      <form
        className="m-auto mt-20 w-120 p-20 border border-orange-500 rounded-md border-solid"
        onSubmit={loginFunc}
      >

        <h1 className="mb-8 text-2xl text-orange-400">Номер телефона</h1>
        <input
          type="text"
          className="w-full text-center outline-0 border  border-orange-500 border-solid focus:text-white cursor-pointer pl-1.5 text-white
          font-extralight  transition-colors ease-in-out duration-500 mb-5 bg-transparent rounded-md py-1"
          placeholder="Номер телефона"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
        />
        <button
        disabled={!phone}
        className="bg-orange-500 rounded-md cursor-pointer py-1.5 w-full text-white font-light
         hover:bg-orange-400 transition-colors ease-in-out duration-500 mb-5 disabled:opacity-50 disabled:cursor-not-allowed">
          Авторизоватся
        </button>
      </form>
    </div>
  );
}
