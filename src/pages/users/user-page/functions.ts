export function getKeyString(count: number) {
  const arrrayOfNumbers = count.toString().split("").map(Number);
  switch (arrrayOfNumbers[arrrayOfNumbers.length - 1]) {
    case 1 :
        return "раза";
    case 2 :
        return "раза";
    case 3 :
        return "раза";
    case 4 :
        return "раза";
    default:
        return "раз";
  }
}
