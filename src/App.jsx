import './App.css';
import { Countdown } from './components/Countdown';
import { Background } from './components/Background';
import { Button } from './components/Button';

function App() {

  return (
    <>
      <section className='absolute top-12  w-full px-5 sm:px-20 flex justify-between'>
        <Button concept='language' list={['english','spanish','german','french','italian']} />
        <Button concept='timeUnit' list={['days','hours','minutes','seconds']} />
      </section>
      <Countdown />
      <Background />
    </>
  )
}

export default App
