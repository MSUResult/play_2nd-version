import LiveGame from '@/component/(play)/(live)/liveGame'
import React from 'react'

const page = async({params}) => {

    const {slug} = await params
    // const slice = 

  return (
    <div>
      <LiveGame roomId = {slug} />
        

      
    </div>
  )
}

export default page
