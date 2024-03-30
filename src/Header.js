import React, { useContext } from 'react'
import { GiLaptop } from "react-icons/gi";
import { FaMobile } from "react-icons/fa6";
import { IoIosTabletPortrait } from "react-icons/io";
import DataContext from './context/DataContext';

const Header = ({title}) => {
  const {width} = useContext(DataContext
    )
  return (
    <header className='Header'>
        <h1>
            {title}
        </h1>
        {width < 768 ? <FaMobile /> 
          : width < 992 ?<IoIosTabletPortrait />
            : <GiLaptop />}
    </header>
  )
}

export default Header