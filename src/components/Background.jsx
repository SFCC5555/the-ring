import interference from '../assets/images/interference.gif'

const Background = () => {
    
  return (
        <div className={`w-full h-full top-0 -z-10 absolute background`}>
            <div className='w-full h-full' style={{backgroundImage: `url(${interference})`}} />
        </div>

  )
}

export {Background}