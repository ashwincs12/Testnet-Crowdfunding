import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from './contractArtifacts/Coffee.json';
import Buy from './Components/Buy';
import Memos from './Components/Memos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [devaccBalance,setDevaccBalance] = useState(0)

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xCb20C364212aaBCeA22C11212739c1E03Dca710C";
      const contractABI = abi.abi;
      
      const holeskyChainId = '0x4268'; 
      const holeskyNetwork = {
        chainId: holeskyChainId,
        chainName: "Holesky",
        nativeCurrency: {
          name: "Holesky Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ["https://rpc.holesky.ethpandaops.io"], 
        blockExplorerUrls: ["https://holesky.etherscan.io/"] 
      };

      try {
        const { ethereum } = window;

        if (ethereum) {
          // Check if the user is connected to Holesky
          const currentChainId = await ethereum.request({ method: 'eth_chainId' });
          if (currentChainId !== holeskyChainId) {
            try {
              // Attempt to switch to Holesky network
              await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: holeskyChainId }],
              });
            } catch (switchError) {
              // This error code indicates that the chain has not been added to MetaMask
              if (switchError.code === 4902) {
                try {
                  // Add Holesky network to MetaMask
                  await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [holeskyNetwork],
                  });
                } catch (addError) {
                  if(addError.code==4001)
                    {
                      toast.error('😖 Oops! Failed to add Holesky network', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                        console.error("Failed to add Holesky network to MetaMask:", addError);
                    }
                  return;
                }
              } else {
                console.error("Failed to switch to Holesky network:", switchError);
                if(switchError.code==4001)
                  {
                    toast.error('😖 Oops! Failed to switch to Holesky network', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      });
                  }
                return;
              }
            }
          }
          
          toast.success('🔗 Connection to Holešky Successful!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }); 
          const account = await ethereum.request({ method: "eth_requestAccounts" });
          setCurrentAccount(account[0]);

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setState({ provider, signer, contract });
          setDevaccBalance(await provider.getBalance('0xd0e47cf5cE72a33AC8bDc26aeABfDC15d7747aB9'))
        }
      } catch (err) {
        console.log(err);
      }
    };
    connectWallet();
  }, []);

  return (
    <div>
      <img src="banner.png" className='w-full' alt="Banner"></img>
      <div className='flex justify-between'>
        <p className='text-blue-800 font-mono font-extrabold p-3'>Connected Account : {currentAccount}</p>
        <p className='text-blue-800 font-mono font-extrabold p-3 text-right'>Developer Account Balance :{parseFloat(ethers.formatEther(devaccBalance)).toFixed(3)} ETH</p>
      </div>
      <h1 className="text-4xl font-bold text-blue-400 mb-4 text-center">Donate Ether</h1>
      <Buy state={state} />
      <h1 className="text-4xl font-bold text-blue-400 mb-4 text-center mt-6">Memos</h1>
      <Memos state={state} />
      <ToastContainer />
    </div>
  );
}

export default App;
