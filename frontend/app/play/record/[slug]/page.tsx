import RecoredGame from '@/component/(play)/(record)/RecordGame'
import React from 'react'

const page = async({params}) => {

    const {slug} = await params

  return (
    <div>
      
      <RecoredGame opponentId={slug} />
      
    </div>
  )
}

export default page
