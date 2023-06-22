import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import data from '../data.json';
import { changeTimeUnit } from '../redux/timeUnitSlice';
import samaraGift from '../assets/images/samara.gif';

const Countdown = () => {

  const language = useSelector(state=>state.language);
  const timeUnit = useSelector(state=>state.timeUnit);

  const dispatch = useDispatch();


  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [samara, setSamara] = useState(false);

  useEffect(() => {
    const storedCountdown = localStorage.getItem('countdown');
    if (storedCountdown) {
      const parsedCountdown = JSON.parse(storedCountdown);
      const savedTimestamp = new Date(parsedCountdown.timestamp);
      const currentTimestamp = new Date();
      const timeDifference = Math.abs(currentTimestamp - savedTimestamp);

      // Calcular el tiempo transcurrido en segundos
      const totalSeconds = parsedCountdown.remainingSeconds - Math.floor(timeDifference / 1000);

      if (totalSeconds < 0) {
        // Reiniciar el contador si ya ha pasado el tiempo establecido
        resetCountdown();
      } else {
        // Calcular los días, horas, minutos y segundos restantes
        const days = Math.ceil(totalSeconds / (24 * 60 * 60));
        const hours = Math.ceil((totalSeconds / (60 * 60)));
        const minutes = Math.ceil((totalSeconds / 60));
        const seconds = totalSeconds

        setCountdown({ days, hours, minutes, seconds });
      }
    } else {
      // Configurar el contador inicial de n días si no hay valor en el localStorage
      resetCountdown();
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        const totalSeconds = prevCountdown.seconds - 1;

        if (totalSeconds < 0) {
          resetCountdown();
        } else {
          const days = Math.ceil(totalSeconds / (24 * 60 * 60));
          const hours = Math.ceil((totalSeconds / (60 * 60)));
          const minutes = Math.ceil((totalSeconds / 60));
          const seconds = totalSeconds

          updateLocalStorage({ days, hours, minutes, seconds });
          return { days, hours, minutes, seconds };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resetCountdown = () => {

    const storedCountdown = localStorage.getItem('countdown');

    if (storedCountdown) {

      setSamara(true);

      setTimeout(()=>{
        setSamara(false);
      },2400)

    }

    dispatch(changeTimeUnit('days'));

    const initialCountdown = { days: 7, hours: 168, minutes: 10080, seconds: 604800 };
    updateLocalStorage(initialCountdown);
    setCountdown(initialCountdown);
  };

  const updateLocalStorage = (countdownData) => {
    const timestamp = new Date().toISOString();
    const dataToStore = { timestamp, remainingSeconds: calculateRemainingSeconds(countdownData) };
    localStorage.setItem('countdown', JSON.stringify(dataToStore));
  };

  const calculateRemainingSeconds = (countdownData) => {
    return (
     countdownData.seconds
    );
  };


  return (
    <>
      {samara?<img className="absolute w-full h-full" src={samaraGift} alt="samara" />:
        <div className="flex flex-col items-center text-white gap-3 lightText cursor-crosshair">
          <div className="secondFont text-9xl" >{countdown&&countdown[timeUnit]}</div>
          <div className="text-8xl" >{data.language[language][timeUnit]} </div>
      </div>}
    </>

  );
};

export {Countdown};