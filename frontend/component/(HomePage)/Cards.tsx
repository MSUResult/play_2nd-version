"use client"
import React from 'react'
import {motion} from 'framer-motion'


const cards = [
    {
        title:'Customer Identity Trend report 20205: BLAm ghuki ',
        para:'    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, dignissimos!     Lorem ipsum dolor sit amet, consectetur adipisicing - AI Agents'
    },
        {
        title:'Introducing Auth For Gen Ai: BLAm ghuki ',
        para:'    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, dignissimos!     Lorem ipsum dolor sit amet, consectetur adipisicing - AI Agents'
    },
        {
        title:'Securing Your Ai Agents : BLAm ghuki ',
        para:'    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, dignissimos!     Lorem ipsum dolor sit amet, consectetur adipisicing - AI Agents'
    },
        {
        title:'Unlock The Futurew of Ai: BLAm ghuki ',
        para:'    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, dignissimos!     Lorem ipsum dolor sit amet, consectetur adipisicing - AI Agents'
    }
]

const Cards = () => {
  return (
    <main className='mt-24 bg-black/50 h-screen w-full flex  items-center  '>

        <motion.section whileHover={{}} className='    px-10 flex gap-8 py-2 cursor-pointer' 
        
        >
            {
                cards.map((card , index)=> (
                    <motion.div 
                    initial="initial"
                    whileHover="hover"
                    
                
                     key={index} className='  relative border h-fit border-white border-tl-2 rounded-xl p-6 '>
                        <img src="/assetsIcons/madame.jpg" alt="See thise image" className='rounded-[10px]' />



{/* glassy look */}
            <motion.div
  variants={{
    initial: { scaleY: 0.4 },
    hover: { scaleY: 1 }
  }}
  transition={{ duration: 0.45}}
  style={{ originY: 1 }}
  className='absolute bottom-0 flex flex-col px-4 py-6 w-full backdrop-blur-lg shadow-lg border border-white/10 rounded-t-2xl bg-white/30 h-full'
>

                        </motion.div>

                    </motion.div>

                ))
            }
        </motion.section>
    

    </main>
  )
}

export default Cards
