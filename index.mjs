import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib({ REACH_NO_WARN: 'Y' });
const sbal = stdlib.parseCurrency(100);
const accAlice = await stdlib.newTestAccount(sbal);

const ctcAlice = accAlice.contract(backend);

const users = await stdlib.newTestAccounts(10, sbal);
const ctcWho = (whoi) =>
  users[whoi].contract(backend, ctcAlice.getInfo());
const users1 =[];
const userAdd = async (whoi) => {
  const who = users[whoi];
  const ctc = ctcWho(whoi);
  const y = await ctc.apis.User.addUsers();
 
 if (y<5) {
  console.log('Counter: ',parseInt(y));
  console.log('New Bob User', stdlib.formatAddress(who), ' has attached to the contract ');
  users1.push(who.getAddress());
}
  
  else{
    console.log('Counter: ',parseInt(y));
    console.log(stdlib.formatAddress(who), ' sorry the limit of users has been exceded ');
  } 
}
await Promise.all([
  backend.Alice(ctcAlice, {
    ready : () => {
        console.log('Alice is ready for the attachers')
    },

  }),

await userAdd(0),
await userAdd(1),
await userAdd(2),
await userAdd(3),
await userAdd(4),
await userAdd(5),
await userAdd(6),
await userAdd(7),
await userAdd(8),
await userAdd(9),
process.exit()
]);
