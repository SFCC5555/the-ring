import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import data from '../data.json';

const Countdown = () => {

  const language = useSelector(state=>state.language);
  const timeUnit = useSelector(state=>state.timeUnit);


  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const storedCountdown = localStorage.getItem('countdown');
    if (storedCountdown) {
      const parsedCountdown = JSON.parse(storedCountdown);
      const savedTimestamp = new Date(parsedCountdown.timestamp);
      const currentTimestamp = new Date();
      const timeDifference = Math.abs(currentTimestamp - savedTimestamp);

      // Calcular el tiempo transcurrido en segundos
      const totalSeconds = parsedCountdown.remainingSeconds - Math.floor(timeDifference / 1000);

      if (totalSeconds <= 0) {
        // Reiniciar el contador si ya ha pasado el tiempo establecido
        resetCountdown();
      } else {
        // Calcular los días, horas, minutos y segundos restantes
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = Math.floor(totalSeconds % 60);

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
        const totalSeconds =
          prevCountdown.days * 24 * 60 * 60 +
          prevCountdown.hours * 60 * 60 +
          prevCountdown.minutes * 60 +
          prevCountdown.seconds -
          1;

        if (totalSeconds <= 0) {
          resetCountdown();
        } else {
          const days = Math.floor(totalSeconds / (24 * 60 * 60));
          const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
          const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
          const seconds = Math.floor(totalSeconds % 60);

          updateLocalStorage({ days, hours, minutes, seconds });
          return { days, hours, minutes, seconds };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resetCountdown = () => {
    const initialCountdown = { days: 7, hours: 0, minutes: 0, seconds: 0 };
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
      countdownData.days * 24 * 60 * 60 +
      countdownData.hours * 60 * 60 +
      countdownData.minutes * 60 +
      countdownData.seconds
    );
  };

  console.log(timeUnit);
  console.log(language);

  return (
    <div className="flex items-center text-red-500">
        {countdown.days} {data.language[language][timeUnit]} 
    </div>
  );
};

export {Countdown};