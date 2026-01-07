import { useEffect, useState } from "react";
import SidebarGroup from "./SideBarGroupe";
import SidebarLink from "./SidebarLink";
import axios from "../../services/axios";
import { Outlet } from "react-router-dom";
import { useStore } from "../../store/useStore.ts";
import { FadeLoader } from "react-spinners";
import Swal from "sweetalert2";

export default function SidebarLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [_, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const setUser = useStore((state) => state.setUser);

  async function getMe() {
    setLoading(true);
    try {
      const res = await axios.get("/auth/me");
      if (res.status === 200 && res.data.role === "admin") {
        setIsAdmin(true);
        setUser(res.data);
      } else {
        setIsAdmin(false);
      }
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    const confirmed = await confirmAction();

    if (!confirmed) return;

    logout();
  };

  async function logout() {
    try {
      setUser(null);
      const res = await axios.post("/auth/logout");

      if (res.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="relative flex w-full flex-col md:flex-row text-black">
      {/* skip link */}
      <a className="sr-only" href="#main-content">
        skip to the main content
      </a>

      {/* overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-10 bg-white/80 backdrop-blur-xs md:hidden"
          aria-hidden="true"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* sidebar */}
      <nav
        aria-label="sidebar navigation"
        className={`
          fixed left-0 z-20 flex h-svh w-60 shrink-0 flex-col
          border-r border-gray-200 bg-white p-4
          transition-transform duration-300
          md:relative md:w-64 md:translate-x-0
          ${showSidebar ? "translate-x-0" : "-translate-x-60"}
        `}
      >
        {/* logo */}
        <a href="/admin" className="ml-2 w-fit text-2xl font-bold text-black">
          <span className="sr-only">homepage</span>
          <img
            src="/cataleya-tshirt-logo.cb2aea47.png"
            className="w-36 self-с"
            alt=""
          />
        </a>

        {/* sidebar links */}
        <div className="flex flex-col gap-2 overflow-y-auto pb-6">
          <SidebarLink label="Главная" href="/admin" />

          <SidebarGroup
            title="Заказы"
            items={[
              { label: "В ожидании", href: "/admin/orders/pending" },
              { label: "Оформленные", href: "/admin/orders/placed" },
              { label: "Отправленные", href: "/admin/orders/shipped" },
              { label: "Доставленные", href: "/admin/orders/delivered" },
              { label: "Отказанные", href: "/admin/orders/cancelled" },
            ]}
          />

          <SidebarGroup
            title="Пользователи"
            items={[
              { label: "Розничные", href: "/admin/users/retail" },
              { label: "Оптовики", href: "/admin/users/wholesales" },
              // { label: "Дилеры", href:"dealer"},
            ]}
          />

          <SidebarGroup
            title="Товары"
            items={[
              { label: "Стоплист", href: "/admin/goods/stoplist" },
              { label: "Топлист", href: "/admin/goods/toplist" },
              { label: "Зёрна", href: "/admin/goods/coffee" },
              { label: "Чаи", href: "/admin/goods/tea" },
              { label: "Дрипы", href: "/admin/goods/drip" },
              { label: "Сиропы", href: "/admin/goods/syrup" },
              { label: "Капсулы", href: "/admin/goods/capsule" },
              { label: "Аксессуары", href: "/admin/goods/accessory" },
              { label: "Химия", href: "/admin/goods/chemistry" },
              { label: "Наборы", href: "/admin/goods/set" },
            ]}
          />

          <button
            onClick={handleLogout}
            className="self-start text-red-600 text-md cursor-pointer ml-2.5"
          >
            Выйти
          </button>
        </div>
      </nav>

      {/* main content */}
      <div
        id="main-content"
        className="h-svh w-full overflow-y-auto bg-white p-4 text-black"
      >
        <>
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <FadeLoader />
            </div>
          ) : (
            <Outlet />
          )}
        </>
      </div>

      {/* toggle button */}
      <button
        onClick={() => setShowSidebar((v) => !v)}
        className="fixed right-4 top-4 z-20 rounded-full bg-black p-4 text-white md:hidden"
      >
        {showSidebar ? (
          <svg viewBox="0 0 16 16" className="size-5" fill="currentColor">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="size-5" fill="currentColor">
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z" />
          </svg>
        )}
        <span className="sr-only">sidebar toggle</span>
      </button>
    </div>
  );
}

async function confirmAction(): Promise<boolean> {
  const result = await Swal.fire({
    title: "Вы действительно хотите выйти из профиля?",
    icon: "warning",
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: "Да, я хочу выйти",
    denyButtonText: "Нет, я хочу остаться",
    cancelButtonText: "Отмена",
  });

  return result.isConfirmed;
}
