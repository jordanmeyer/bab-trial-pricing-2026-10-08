import { calculate, parseInput } from './model.js';

const form = document.querySelector('form');
const status = document.querySelector('#status');
const output = document.querySelector('#output');
const fields = ['price', 'cost', 'quantity', 'fixed'];
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

function update(focusError = false) {
  const values = {};
  let firstError;
  for (const name of fields) {
    const field = form.elements[name];
    const error = document.querySelector(`#${name}-error`);
    error.textContent = '';
    field.removeAttribute('aria-invalid');
    try {
      values[name] = parseInput(field.value, name !== 'quantity');
    } catch (problem) {
      error.textContent = problem.message;
      field.setAttribute('aria-invalid', 'true');
      firstError ||= field;
    }
  }
  output.hidden = Boolean(firstError);
  if (firstError) {
    status.textContent = 'Check the highlighted inputs. No result calculated.';
    if (focusError) firstError.focus();
    return;
  }
  const result = calculate(values);
  for (const name of ['profit', 'revenue', 'variableCost', 'totalCost', 'contribution']) {
    document.querySelector(`#${name}`).textContent = currency.format(result[name] / 100);
  }
  document.querySelector('#outcome').textContent = result.profit > 0 ? 'Profit after all entered costs.' : result.profit < 0 ? 'Loss after all entered costs.' : 'Revenue exactly covers entered costs.';
  document.querySelector('#breakEven').textContent = result.breakEven === null ? 'No break-even at this price' : `${number.format(result.breakEven)} units`;
  document.querySelector('#break-note').textContent = values.fixed === 0
    ? `Zero units already covers zero fixed costs.${result.contribution < 0 ? ' Every additional sale loses money.' : result.contribution === 0 ? ' Every quantity has zero profit.' : ' Each additional sale adds profit.'}`
    : result.breakEven === null
      ? 'Each sale contributes zero or less toward positive fixed costs. Selling more cannot cover them.'
      : `Theoretical break-even: ${result.theoretical.toFixed(2)} units. Round up to cover costs with whole units.${result.breakEven > 1000000 ? ' This exceeds the 1,000,000-unit scenario limit.' : ''}`;
  status.textContent = `Calculated for ${number.format(values.quantity)} units sold.`;
}

form.addEventListener('submit', event => { event.preventDefault(); update(true); });
form.addEventListener('input', () => {
  output.hidden = true;
  status.textContent = 'Inputs changed. Calculate to update the result.';
});
form.addEventListener('reset', () => { setTimeout(() => update(), 0); });
document.querySelector('#decimal-example').addEventListener('click', () => {
  for (const [name, value] of Object.entries({ price: '19.90', cost: '19.80', quantity: '1000', fixed: '100.00' })) {
    form.elements[name].value = value;
  }
  update();
});
update();
