import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Layout from "../components/layout/layout.tsx";

const Login = lazy(() => import("../pages/auth/login"));
const VerifyCode = lazy(() => import("../pages/auth/verify-code"));
const Dashboard = lazy(() => import("../pages/main/main"));
const NotFound = lazy(() => import("../pages/errors/notfound"));

//Заказы
const Pending = lazy(() => import("../pages/orders/pending"));
const Placed = lazy(() => import("../pages/orders/placed"));
const Shipped = lazy(() => import("../pages/orders/shipped"));
const Delivered = lazy(() => import("../pages/orders/delivered"));
const Cancelled = lazy(() => import("../pages/orders/cancelled"));

//Пользователи
const Retiales = lazy(() => import("../pages/users/retails.tsx"));
const Wholesales = lazy(() => import("../pages/users/wholesales.tsx"));
const UserPageTemplate = lazy(() => import("../pages/users/user-page/user-page-template.tsx"));
const UserPage = lazy(() => import("../pages/users/user-page/user-page.tsx"));


//Товары
const Stoplist = lazy(() => import("../pages/goods/stopList.tsx"));
const Toplist = lazy(() => import("../pages/goods/topList.tsx"));
const Coffee = lazy(() => import("../pages/goods/coffee.tsx"));
const Tea = lazy(() => import("../pages/goods/tea.tsx"));
const Syrup = lazy(() => import("../pages/goods/syrup.tsx"));
const Capsule = lazy(() => import("../pages/goods/capsule.tsx"));
const Drip = lazy(() => import("../pages/goods/drip.tsx"));
const Accessorys = lazy(() => import("../pages/goods/accessory.tsx"));
const Chemistry = lazy(() => import("../pages/goods/chemistry.tsx"));
const Set = lazy(() => import("../pages/goods/set.tsx"));
export default function App() {

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <FadeLoader color="red" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-code" element={<VerifyCode />} />
          <Route element={<Layout />}>
            <Route path="/admin" element={<Dashboard />} />
            {/* Заказы */}
            <Route path="/admin/orders/pending" element={<Pending />} />
            <Route path="/admin/orders/placed" element={<Placed />} />
            <Route path="/admin/orders/shipped" element={<Shipped />} />
            <Route path="/admin/orders/delivered" element={<Delivered />} />
            <Route path="/admin/orders/cancelled" element={<Cancelled />} />

            {/* Пользователи */}
            <Route path="/admin/users/retail" element={<Retiales />} />
            <Route path="/admin/users/wholesales" element={<Wholesales />} />
            <Route path="/admin/user/:id" element={<UserPage />} />
            <Route path="/admin/user/template" element={<UserPageTemplate />} />

            {/* Товары */}
            <Route path="/admin/goods/stoplist" element={<Stoplist />} />
            <Route path="/admin/goods/toplist" element={<Toplist />} />
            <Route path="/admin/goods/coffee" element={<Coffee />} />
            <Route path="/admin/goods/tea" element={<Tea />} />
            <Route path="/admin/goods/syrup" element={<Syrup />} />
            <Route path="/admin/goods/capsule" element={<Capsule />} />
            <Route path="/admin/goods/drip" element={<Drip />} />
            <Route path="/admin/goods/accessory" element={<Accessorys />} />
            <Route path="/admin/goods/chemistry" element={<Chemistry />} />
            <Route path="/admin/goods/set" element={<Set />} />
          </Route>
        <Route path="*" element={ <NotFound />} />
      </Routes>
    </Suspense>
  );
}
