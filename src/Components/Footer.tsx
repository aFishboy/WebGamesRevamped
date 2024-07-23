import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='bg-black text-white'>
      <div className='container mx-auto py-4 flex flex-col md:flex-row justify-between items-center'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-sm'>
            <p>© 2023 Games</p>
          </div>
        </div>
      </div>  
    </footer>
  )
}

export default Footer