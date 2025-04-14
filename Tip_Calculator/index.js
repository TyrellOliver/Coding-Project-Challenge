function tipCalculator(bill, tip) {
  let tipNum = 0;
  if (typeof tip === "string") {
    tipNum = Number(tip);
  }
  if (tip[tip.length - 1] === "%") {
    let removeLast = tip.slice(0, tip.length - 1);
    tipNum = Number(removeLast);
  }
  if (typeof tip === "number") {
    tipNum = tip;
  }
  // console.log(bill - bill * (tipNum / 100));
  // console.log(tip)
  return bill - bill * (tipNum / 100);
}

// console.log(tipCalculator(bill, tip))
// console.log(tipCalculator(25, "30"));
// console.log(tipCalculator(30, "50%"));
// console.log(tipCalculator(30, "100%"));
console.log(tipCalculator(369, "36%"));
console.log(tipCalculator(963, 69));
