import { calculate, parseInput } from '../app/model.js';

// Expected values were derived in PLAN.md before running the implementation.
export function runCases() {
  const results = [];
  function check(name, actual, expected) {
    results.push({ name, expected, actual, pass: JSON.stringify(actual) === JSON.stringify(expected) });
  }
  const baseline = { price: 2000, cost: 1200, quantity: 100, fixed: 50000 };
  check('Baseline cents and unit counts', calculate(baseline), { contribution: 800, revenue: 200000, variableCost: 120000, totalCost: 170000, profit: 30000, breakEven: 63, theoretical: 62.5 });
  check('62 whole units still lose $4', calculate({ ...baseline, quantity: 62 }).profit, -400);
  check('63 whole units earn $4', calculate({ ...baseline, quantity: 63 }).profit, 400);
  check('One extra sale adds $8 contribution', calculate({ ...baseline, quantity: 101 }).profit - calculate(baseline).profit, 800);
  check('Higher fixed cost reduces profit dollar for dollar', calculate({ ...baseline, fixed: 50100 }).profit, 29900);
  const equal = calculate({ ...baseline, price: 1200 });
  check('Zero margin, positive fixed cost', [equal.profit, equal.breakEven], [-50000, null]);
  const loss = calculate({ price: 1000, cost: 1200, quantity: 100, fixed: 0 });
  check('Negative contribution and zero fixed cost', [loss.profit, loss.breakEven], [-20000, 0]);
  check('Negative contribution, positive fixed cost', calculate({ price: 1000, cost: 1200, quantity: 100, fixed: 50000 }).breakEven, null);
  const zero = calculate({ price: 0, cost: 0, quantity: 0, fixed: 0 });
  check('All zero', [zero.profit, zero.breakEven], [0, 0]);
  const cents = calculate({ price: parseInput('.30'), cost: parseInput('.20'), quantity: 3, fixed: parseInput('.30') });
  check('Exact cents avoid a false fourth break-even unit', [cents.profit, cents.breakEven], [0, 3]);
  const large = calculate({ price: 100000000, cost: 0, quantity: 1000000, fixed: 100000000 });
  check('Large allowed scenario', [large.profit, large.breakEven], [99999900000000, 1]);
  check('Break-even can exceed quantity cap', calculate({ price: 1, cost: 0, quantity: 1, fixed: 100000000 }).breakEven, 100000000);
  check('Parse maximum USD', parseInput('1000000.00'), 100000000);
  check('Parse whole quantity', parseInput('100', false), 100);
  for (const [raw, money] of [['', true], ['-1', true], ['1.001', true], ['1e2', true], ['Infinity', true], ['NaN', true], ['1,000', true], ['$20', true], ['1000000.01', true], ['1.5', false], ['1000001', false]]) {
    let rejected = false;
    try { parseInput(raw, money); } catch { rejected = true; }
    check(`Reject ${JSON.stringify(raw)} (${money ? 'USD' : 'units'})`, rejected, true);
  }
  check('Ten-cent contribution covers $100 at exactly 1000 units', calculate({price:1990,cost:1980,quantity:1000,fixed:10000}).breakEven,1000);
  check('One more cent of fixed cost requires the next whole unit', calculate({price:1990,cost:1980,quantity:1000,fixed:10001}).breakEven,1001);
  return results;
}
