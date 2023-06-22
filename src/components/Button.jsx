import { useState } from 'react';
import data from '../data.json';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../redux/languageSlice';
import { changeTimeUnit } from '../redux/timeUnitSlice';
import PropTypes from 'prop-types';

const Button = ({concept,list}) => {

    const [menu,setMenu] = useState(false);

    const language = useSelector(state=>state.language);
    
    const dispatch = useDispatch();

    function handleClick(e) {

        if (concept==='language') {
            dispatch(changeLanguage(e.target.id));
        } else if (concept==='timeUnit') {
            dispatch(changeTimeUnit(e.target.id));
        }

        setMenu(prev=>!prev);

    }

  return (
    <div className='flex flex-col items-center gap-2 '>
        <button onClick={()=>setMenu(prev=>!prev)} className='w-32 px-3 py-1 rounded-md text-white text-2xl font-bold bg-white/5  flex items-center justify-center gap-2 lightTextHover'>
            {data.language[language][concept]}
        </button>
        {menu&&<section className="menu flex flex-col gap-1 text-2xl text-white text-start bg-white/5 hover:bg-white/10 w-32 rounded-md p-2">
            {
            list.map(i=><div onClick={handleClick} id={i} className='lightTextHover cursor-pointer flex items-center justify-between' key={i}>{data.language[language][i].toLowerCase()}</div>)
            }

        </section>}
    </div>

  )
}

Button.propTypes = {concept:PropTypes.string,list:PropTypes.array};

export {Button}