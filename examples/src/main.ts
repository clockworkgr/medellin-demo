import './style.css'
import { Client } from 'medellin-demo-client-ts';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';


const client = new Client({ apiURL: "http://localhost:1317", rpcURL: "http://localhost:26657", prefix: "cosmos" });

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Ignite Client demo</h1>
    <div class="card">
      <button id="queryBalances" type="button">Query Balances</button>
    </div>    
    <div class="card">
      <button id="sendTx" type="button">Send TX</button>
    </div>    
    <div class="card">
      <button id="connectKeplr" type="button">Connect to Keplr</button>
    </div>    
    <div class="card">
      <button id="useCosmjs" type="button">Use CosmJS</button>
    </div>      
    <div class="card">
      <p>Output</p>
      <p id="output"></p>
    </div>    
  </div>
`
const queryBalances = document.querySelector<HTMLButtonElement>('#queryBalances')!;
const sendTx = document.querySelector<HTMLButtonElement>('#sendTx')!;
const connectKeplr = document.querySelector<HTMLButtonElement>('#connectKeplr')!;
const useCosmjs = document.querySelector<HTMLButtonElement>('#useCosmjs')!;
const output = document.querySelector<HTMLParagraphElement>('#output')!;
queryBalances.addEventListener('click', async () => { 
  const balances = await client.CosmosBankV1Beta1.query.queryAllBalances("cosmos1r0333ffff8a2u6dqfr77paah2tjq2zgmvewrua");
  output.innerHTML = JSON.stringify(balances.data);
});
connectKeplr.addEventListener('click', async () => {
  await client.useKeplr();
})
useCosmjs.addEventListener('click', async () => {  
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic("tackle maximum still cherry pioneer make icon maid silver liquid bubble crisp pencil rate captain skirt pudding spoil box swarm coral illegal wrong person");
  client.useSigner(wallet);
});
sendTx.addEventListener('click', async () => {
  
const tx_result = await client.CosmosBankV1Beta1.tx.sendMsgSend(
    { 
        value: {
            amount: [
                {
                    amount: '200',
                    denom: 'token',
                },
            ],
            fromAddress: 'cosmos1r0333ffff8a2u6dqfr77paah2tjq2zgmvewrua',
            toAddress: 'cosmos1qqqsyqcyq5rqwzqfys8f67'
        }
    }
);
  output.innerHTML = JSON.stringify(tx_result);
});