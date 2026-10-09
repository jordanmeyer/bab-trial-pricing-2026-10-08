import { calculate, parseInput } from './model.js?v=4';

const form = document.querySelector('form');
const status = document.querySelector('#status');
const output = document.querySelector('#output');
const fields = ['price', 'cost', 'quantity', 'fixed'];
let current;
let appliedRaw = {};
let reference = { price: 2000, cost: 1200, quantity: 100, fixed: 50000 };
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

function update(focusError = false) {
  document.querySelector('#copy-status').replaceChildren();
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
  current = firstError ? null : values;
  document.querySelector("#pending").hidden = !firstError;
  document.querySelector("#save").disabled = Boolean(firstError);
  if (firstError) {
    status.textContent = 'Check the highlighted inputs. No result calculated.';
    if (focusError) firstError.focus();
    return;
  }
  appliedRaw=Object.fromEntries(fields.map(name=>[name,form.elements[name].value]));
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
  document.querySelector('#derivation').textContent = `${currency.format(result.contribution / 100)} contribution × ${number.format(values.quantity)} units − ${currency.format(values.fixed / 100)} fixed cost = ${currency.format(result.profit / 100)}.`;
  document.querySelector('#safety').textContent = result.contribution > 0
    ? `Assumed sales are ${number.format(Math.abs(values.quantity - result.breakEven))} units ${values.quantity >= result.breakEven ? 'above' : 'below'} minimum whole-unit cost coverage. This sales cushion is an assumption, not predicted demand.`
    : 'A sales cushion is not meaningful with nonpositive contribution. More sales cannot improve cost coverage.';
  renderComparison();
  status.textContent = `Calculated: ${currency.format(result.profit / 100)} after entered costs for ${number.format(values.quantity)} assumed units. Use View scenario result to inspect the answer.`;
}

form.addEventListener('submit', event => { event.preventDefault(); update(true); });
function invalidate() {
  document.querySelector('#copy-status').replaceChildren();
  current = null;
  output.hidden = true;
  document.querySelector('#pending').hidden = false;
  document.querySelector('#save').disabled = true;
  renderComparison();
  status.textContent = 'Inputs changed. Calculate to update the result.';
}
form.addEventListener('input',invalidate);
window.addEventListener('pageshow',()=>setTimeout(()=>{if(fields.some(name=>form.elements[name].value!==appliedRaw[name]))invalidate();},0));
form.addEventListener('reset', () => { setTimeout(() => update(), 0); });
document.querySelector('#decimal-example').addEventListener('click', () => {
  for (const [name, value] of Object.entries({ price: '19.90', cost: '19.80', quantity: '1000', fixed: '100.00' })) {
    form.elements[name].value = value;
  }
  update();
});

function renderComparison() {
  document.querySelector('#comparison').replaceChildren(...[['Reference',reference],['Current',current]].map(([label, value]) => {
    const tr = document.createElement('tr');
    const cells = value ? [label,currency.format(value.price/100),currency.format(value.cost/100),number.format(value.quantity),currency.format(value.fixed/100),currency.format(calculate(value).profit/100)] : [label,'Pending','Pending','Pending','Pending','Calculate to update'];
    for (const text of cells) { const td=document.createElement('td'); td.textContent=text; tr.append(td); }
    return tr;
  }));
}
document.querySelector('#save').addEventListener('click', () => { reference={...current}; renderComparison(); status.textContent='Calculated assumptions saved as the reference for this tab. Copy the record to keep it after reload.'; });
document.querySelector('#copy').addEventListener('click', async () => {
  if (!current) return;
  const copiedInput=current;
  const result=calculate(current);
  const record=`Notebook cost-coverage scenario (USD, one sales period)
Price/unit: ${currency.format(current.price/100)}; variable cost/unit: ${currency.format(current.cost/100)}; assumed sold: ${current.quantity}; fixed costs: ${currency.format(current.fixed/100)}
${document.querySelector('#derivation').textContent}
Minimum non-loss whole quantity: ${result.breakEven ?? 'none'}
${document.querySelector('#break-note').textContent}
${document.querySelector('#safety').textContent}
No demand response, taxes, unsold inventory or capacity modeled. Not a price recommendation.
Source: ${location.href}`;
  try { await navigator.clipboard.writeText(record); if(current!==copiedInput)return; document.querySelector('#copy-status').textContent='Scenario copied. Save it in your assignment notes.'; }
  catch { if(current!==copiedInput)return; document.querySelector('#copy-status').textContent='Clipboard unavailable. Select and copy this record:'; const pre=document.createElement('pre'); pre.textContent=record; document.querySelector('#copy-status').append(pre); }
});
update();
