import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'

const Memos = ({state}) => {
  const {contract}=state;
  const [memos,setMemos]=useState([])

  
  useEffect(()=>
  {
    try
    {
      const fetch=async()=>
        {
          const fetchMemos = await contract.viewMemos();
          setMemos(fetchMemos)
        }
        contract && fetch()
    }catch(err)
    {
      console.log(err)
    }
  },[contract])


  return (
    <div className="flex justify-center items-center">
      <table className='justify-center text-center'>
        <thead>
          <tr>
              <th className='px-4 py-2 border-b border-gray-200 bg-blue-100 text-center w-48'>Name</th>
              <th className='px-4 py-2 border-b border-gray-200 bg-blue-100 text-center w-80'>Timestamp</th>
              <th className='px-4 py-2 border-b border-gray-200 bg-blue-100 text-center w-48'>Amount (in ETH)</th>
              <th className='px-4 py-2 border-b border-gray-200 bg-blue-100 text-center w-96'>Message</th>
              <th className='px-4 py-2 border-b border-gray-200 bg-blue-100 text-center w-96'>Account Address</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo)=>
            {
              return (
                <tr className="bg-blue-50" key={memo.timestamp}>
                  <td className="px-4 py-2 border-b border-gray-200">{memo.name}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{Date(memo.timestamp)}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{ethers.formatEther(memo.value)}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{memo.memo}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{memo.from}</td>
              </tr>
              )
            })}
          </tbody>
      </table>
    </div>
  )
}

export default Memos