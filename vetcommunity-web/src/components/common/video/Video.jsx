import React from 'react'
import ReactPlayer from 'react-player'

export const Video = ({ url, control, play, width, height }) => {

  return (
    <ReactPlayer 
        className="react-player"
        url={require('../../../img/Veterinary.mp4')}
        width={width}
        height={height}
        controls={control}
        playing={play}
        playbackRate={0.75}
    />
  )
}
