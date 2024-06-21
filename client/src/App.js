import './App.css';
import {useState,useEffect} from 'react';
import {ethers} from "ethers"
import abi from './contractArtifacts/Coffee.json'

import Buy from './Components/Buy';
import Memos from './Components/Memos';

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })

  useEffect(()=>
  {
    const connectWallet=async()=>
      {
        const contractAddress="0xE45CC89f095B9F8EfEBeA9a3eF6BEdD51E50f73D";
        const contractABI=abi.abi;

        try{
          const {ethereum} = window;

          if(ethereum)
            {
              const account=await ethereum.request({
                method:"eth_requestAccounts",
              });
              // console.log(account)
            }

            
            const provider=new ethers.WebSocketProvider(ethereum);
            const signer=provider.getSigner();
            const contract=new ethers.Contract(contractAddress,contractABI,signer)
            setState({provider,signer,contract})
        }catch(err)
        {
          console.log(err);
        }
      }
      connectWallet();
  },[])

  console.log(state)

  return (
    <div className="App">
     Hello Boy
     <Buy state={state}/>
     <Memos state={state}/>
    </div>
  );
}

export default App;
