export function calculate({ price, cost, quantity, fixed }) {
  const contribution = price - cost;
  const revenue = price * quantity;
  const variableCost = cost * quantity;
  return {
    contribution, revenue, variableCost,
    totalCost: variableCost + fixed,
    profit: contribution * quantity - fixed,
    breakEven: fixed === 0 ? 0 : contribution > 0 ? Math.ceil(fixed / contribution) : null,
    theoretical: fixed === 0 ? 0 : contribution > 0 ? fixed / contribution : null,
  };
}

// Accept decimal input, then convert monetary values to exact integer cents.
export function parseInput(raw, money = true) {
  const value = raw.trim();
  if (!value) throw new Error('Enter a value.');
  if (!(money ? /^(?:\d+(?:\.\d{1,2})?|\.\d{1,2})$/ : /^\d+$/).test(value)) {
    throw new Error(money ? 'Use a nonnegative USD amount with up to 2 decimals.' : 'Use a nonnegative whole number of units.');
  }
  if (Number(value) > 1000000) throw new Error('Use 1,000,000 or less.');
  return money ? Math.round(Number(value) * 100) : Number(value);
}
