import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Buy = ({ state }) => {
  const [loading, setLoading] = useState(false);
  const reloadRef = useRef(null);

  const handlePay = async (e) => {
    e.preventDefault();
    const { contract } = state;
    console.log(contract);

    const nameInput = document.querySelector("#name").value;
    const memoInput = document.querySelector("#memo").value;
    const valueInput = document.querySelector("#value").value;

    const amount = { value: ethers.parseEther(valueInput) };
    console.log(nameInput, memoInput, amount);

    setLoading(true);

    try {
      const tx = await contract.buyCoffee(nameInput, memoInput, amount);
      await tx.wait();
      toast.success('Transaction Successful');
      console.log("Transaction Successful");

  
      reloadRef.current = setTimeout(() => {
        window.location.reload();
      }, 5000);

    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error('Transaction Failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (reloadRef.current) {
        clearTimeout(reloadRef.current);
      }
    };
  }, []);

  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={handlePay} className='w-2/5'>
        <label className='block font-bold font-sans mb-2'>Name</label>
        <input type="text" placeholder="Enter your name" id="name" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block mb-3' />
        <label className='block font-bold font-sans mb-2'>Message</label>
        <input type="text" placeholder="Enter your message/memo" id="memo" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block mb-3' />
        <label className='block font-bold font-sans mb-2'>Amount (Not enough ETH ?🤔
          <a href='https://cloud.google.com/application/web3/faucet/ethereum/holesky' className='text-blue-700 underline' target='_blank'>Visit Faucet</a> )</label>
        <input type="text" placeholder="Enter amount you wish to donate in ETH" id="value" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block mb-3' />
        <button type="submit" className='block bg-sky-500 hover:bg-sky-700 px-8 py-3 rounded-3xl text-2xl font-xl text-white'>{loading ? 'Processing...' : 'Pay'}</button>
      </form>
    </div>
  );
};

export default Buy;
