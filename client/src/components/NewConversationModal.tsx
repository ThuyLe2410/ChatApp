import React from 'react'

export default function NewConversationModal({closeModal} : {closeModal: () => void}) {
  return (
    <div className='bg-white rounded-lg border-2 border-gray-200 p-6' style={{width: '384px', height:'50%'}}>
        <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'> New conversation</h2>
            <button onClick={closeModal} className='text-gray-500 hover:text-gray-700 text-xl font-bold'> x </button>

        </div>
    </div>
  )
}
