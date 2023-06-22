import './App.css';
import { Countdown } from './components/Countdown';
import { Background } from './components/Background';
import { Button } from './components/Button';
import { Ring } from './components/Ring';
import { useEffect, useState } from 'react';

function App() {

  const [ringStatus,setRingStatus] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setRingStatus(false);
    },2000)
  },[])

  return (
    <>
      <section className='absolute top-12  w-full px-5 sm:px-20 flex justify-between'>
        <Button concept='language' list={['english','spanish','german','french','italian']} />
        <Button concept='timeUnit' list={['days','hours','minutes','seconds']} />
      </section>
      {!ringStatus?<Countdown />
      :<Ring />}
      <Background />
    </>
  )
}

export default App
