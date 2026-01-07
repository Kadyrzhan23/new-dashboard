import Header from "./header-of-order.tsx";
import CustomerInformation from "./customer-information.tsx";
import ItemsOfOrder from "./items-of-order.tsx";
import PaymentInformation from "./payment-information.tsx";
import Actions from "./actions.tsx";
// import OrderActivity from "./order-activity.tsx";
import type Order from "./types.ts";
import Comments from "./comments.tsx";

const order: Order = {
  _id: "695a59ed4114944ec97a55a8",
  userId: "672544063f145b99d656fb55",
  user: {
    creationTime: 1767523366,
    _id: "672544063f145b99d656fb55",
    name: "kadyrzhan",
    phoneNumber: "+998999994923",
    role: "user",
    address: [
      {
        organization: "By shop",
        address: "Gulsanam 48",
      },
    ],
    city: "Ферганская область",
    telegram: "kadyrzhan_20",
    avatarUrl: "/uploads/1743711652682-IMG_0488.jpeg",
    isActive: true,
    manager: {
      _id: "66634d1c6c380dd398ca6ce3",
      name: "Сабина",
      chat_id: "",
      id: "66bde5e00d871080c71ba502",
      __v: 0,
    },
    basket: [],
    updates: "",
    regDate: "02:11:34 02.11.2024",
    identifier: "00201",
    email: "kadyrzhanpardabaev4@gmail.com",
    __v: 0,
    birthday: {
      str: "1999-08-23",
      date: 935366400000,
      day: 23,
      month: 8,
      year: 1999,
    },
  },
  userName: "kadyrzhan",
  listProducts: [
    {
      _id: "675702e0c9e1a34630455873",
      name: "Espresso №12",
      img: [
        "uploads/1733755501937.png",
        "uploads/1733755505042.png",
        "uploads/1733755508153.png",
      ],
      type: "coffe-beans",
      amount: 1,
      identifier: "151",
      price: 110000,
      weight: 0,
      roast: "Эспрессо",
      pomol: 0,
      treatment: "Бленд",
      sort: "80% арабики, 20% робусты",
    },
    {
      _id: "675702e0c9e1a34630455873",
      name: "Espresso №12",
      img: [
        "uploads/1733755501937.png",
        "uploads/1733755505042.png",
        "uploads/1733755508153.png",
      ],
      type: "coffe-beans",
      amount: 1,
      identifier: "151",
      price: 190000,
      weight: 1,
      roast: "Эспрессо",
      pomol: 0,
      treatment: "Бленд",
      sort: "80% арабики, 20% робусты",
    },
    {
      _id: "667145d2b19c821176d8b0ec",
      name: "Colombia Huila",
      img: [
        "uploads\\col-hu-1.png",
        "uploads\\1718699319219.png",
        "uploads\\1718699325738.png",
      ],
      type: "coffe-beans",
      amount: 1,
      identifier: "016",
      price: 410000,
      weight: 2,
      roast: "Фильтр",
      pomol: 0,
      treatment: "Мытая",
      sort: "100% арабика",
    },
    {
      _id: "666ca5253c3bf64d2a33973a",
      name: "Кения АБ",
      img: ["uploads/1718396157056.png"],
      type: "drip",
      amount: 1,
      identifier: "009",
      price: 75000,
    },
    {
      _id: "669a0e55fcb3c1f328cfdf99",
      name: "Кофе в капсулах №1",
      img: ["uploads/1721372095283.png"],
      type: "coffee-capsule",
      amount: 1,
      identifier: "063",
      price: 65000,
    },
    {
      _id: "669598382cfa7a57bc7d092b",
      name: "Special Gunpowder",
      img: ["uploads/1721079725208.png"],
      type: "tea",
      amount: 1,
      identifier: "030",
      price: 70000,
      package: 4,
    },
    {
      _id: "6691a43eb5646e5b5605a885",
      name: "Лимонадный бленд",
      img: ["uploads/lemonade.png", ""],
      type: "syrup",
      amount: 1,
      identifier: "024",
      price: 80000,
    },
    {
      _id: "675847c3c9e1a34630455d2c",
      name: "Темпер",
      img: ["uploads/1733838174574.png"],
      type: "accessory",
      amount: 1,
      identifier: "156",
      price: 999000,
    },
    {
      _id: "6756f574c9e1a34630455813",
      name: "CUP 3 (удаление накипи)",
      img: ["uploads/1733751775072.png"],
      type: "chemistry",
      amount: 1,
      identifier: "142",
      price: 230000,
    },
  ],
  creationDate: "04/01/2026, 17:15:41",
  departureDate: null,
  address: {
    organization: "By shop",
    address: "Gulsanam 48",
  },
  closingDate: null,
  comment: "Test",
  status: "Отказано",
  statusInfo: [],
  totalPrice: "2 229 000",
  totalPriceNumber: null,
  totalPriceTiyin: null,
  rejectedList: [],
  identifier: "005213",
  userStatus: "user",
  manager: {
    _id: "66634d1c6c380dd398ca6ce3",
    name: "Сабина",
    chat_id: "",
    id: "66bde5e00d871080c71ba502",
    __v: 0,
  },
  isActive: false,
  isPaid: false,
  paymentStatus: "Оплачен",
  paymentMethod: "PayMe",
  click: {
    state: "new",
  },
  createdAt: {
    $date: "2026-01-04T12:15:41.349Z",
  },
  updatedAt: {
    $date: "2026-01-04T12:15:41.349Z",
  },
  __v: 0,
};

export default function orderCard() {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <Header
        status={order.status}
        identifier={order.identifier}
        date={order.creationDate}
      />
      <div className="p-6 space-y-6">
        <CustomerInformation order={order} />
        <ItemsOfOrder order={order} />
        <PaymentInformation order={order} />
        <>
          {order.status !== "Отказано" && order.status !== "Доставлен" && (
            <Actions status={order.status} />
          )}
        </>
        {/* <OrderActivity /> */}
        <Comments comment={"Lorem ipsim"} />
      </div>
    </div>
  );
}
