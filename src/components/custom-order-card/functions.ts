export function getOrderCreatedDay(creationDate: string) {
  const date = creationDate.split(" ")[0];
  const [day, month, year] = date.split("/");
  const monthName = getMonthName(parseInt(month));
  console.log(date)
  return `${day} ${monthName} ${year} г.`;
}

function getMonthName(month: number) {
  const monthNames = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  return monthNames[month - 1];
}

export function getOrderCreatedTime(creationDate: string) {
  const time = creationDate.split(" ")[1];
  const [hours, minutes, _] = time.split(":");
  return `${hours}:${minutes}`;
}

export function getPackageOfCoffee(weight: string) {
  switch (weight) {
    case "0" || 0:
      return "250 г";
    case "1" || 0:
      return "500 г";
    case "2" || 2:
      return "1 кг";
    default:
      return "";
  }
}

export function getMillingOfCoffee(pomol: string) {
  switch (pomol) {
    case "0" || 0:
      return "В зёрнах";
    case "1" || 1:
      return "Под турку";
    case "2" || 2:
      return "Под Эспрессо";
    case "3" || 3:
      return "Под рожковую кофемашинку";
    case "4" || 4:
      return "Аэропресс";
    case "5" || 5:
      return "Под гейзер/Мокка";
    case "6" || 6:
      return "Сифон";
    case "7" || 7:
      return "Воронка v60";
    case "8" || 8:
      return "Капельная кофеварка";
    case "9" || 9:
      return "Кемекс";
    case "10" || 10:
      return "Под Френч-пресс";
    default:
      return "Не определено";
  }
}

export function formatNumber(value: number | string): string {
  return new Intl.NumberFormat("ru-RU").format(Number(value));
}

export function getPackageOfTea(packageType: string | number) {
  switch (packageType) {
    case "0" || 0:
      return "Крафт-пакет (40гр)";
    case "1" || 1:
      return "Крафт-пакет (3кг)";
    case "2" || 2:
      return "Крафт-пакет (5кг)";
    case "3" || 3:
      return "Картонная (100гр)";
    case "4" || 4:
      return "Алюминиевая (100гр)";
    default:
      return "Не определено";
  }
}

export function getpackageOfSyrup(volume: string | number) {
  switch (volume) {
    case "0" || 0:
      return "1000 мл";
    case "1" || 1:
      return "250 мл";
    default:
      return "Не определено";
  }
}
