import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import kloud from '../../src/assets/kloud.png'
import sun from '../../src/assets/sun.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const WeatherApi = () => {
    const [city, setCity] = useState({})
  // const [weather, setWeather ] = useState({})
  const [country, setCountry ] = useState({})
  const [search, setSearch ] = useState('');
  const [loading, setLoading ] = useState(false)
  const [error, setError ] = useState(false)
  const [cityName, setCityName] = useState('')
  const [pastSearches, setPastSearches] = useState([]);

  const [isCelsius, setIsCelsius] = useState(true);

  const convertToFahrenheit = (celsius) => {
    return Math.round((celsius * 9 / 5) + 32);
  };

  const convertToCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5 / 9);
  };

  const handleClick = () => {
    setIsCelsius(!isCelsius);
  };
  

  const API_KEY = '258f7661dbcca89e642aa1a544110364'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`

    const fetchWeatherData = async(e) => {
      
      try {
        if (!search.trim()) {
          return; // Do nothing if search input is empty
        }
        e.preventDefault();
        setLoading(true)
        const res = await fetch(url);
        const data = await res.json();
        console.log("data fetched ", data)
        setCity(data.main)
        setCountry(data.sys)
        setCityName(data.name)
        setLoading(false)
        setError(false)
        if (search.trim() !== '' && !pastSearches.includes(search.trim())) {
            setPastSearches(prevSearches => [search.trim(), ...prevSearches.slice(0, 4)]);
          }
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

  useEffect(()=>{  
      
    fetchWeatherData();
    
  }, [])

  return (
    <div className='text-white '>
        <div>
            <img src={kloud} alt="cloud image" className='absolute bottom-0 left-0' />
            <img src={sun} alt="sun image" className=' hidden md:block md:absolute md:top-0 md:right-0 md:w-28  ' />
        </div>
        
            <div>
                <h1 className='uppercase text-white font-bold text-4xl' >weather api</h1>
            </div>
                <form onSubmit={fetchWeatherData} className='flex gap-2  mt-8 justify-center ' >
                <div>
                    <input type="search"
                        placeholder='Search for your city...'
                        onChange={(e) => {setSearch(e.target.value)}}
                        defaultValue={search}
                        className='border-none rounded-md p-2 bg-slate-50 text-black' 
                    />
                </div>
                {/* search icon */}
                <div className='bg-white font-bold border-none rounded-full pl-3  pr-3 pt-2 cursor-pointer' >
                    <button>
                        <IoSearchSharp className='text-black' />
                    </button>
                </div>
                </form>
            
          
          <div className='mt-14' >
            {
              loading ? (<div>Loading</div>): ("")
            }
            {
              error ? (<div className='text-red-500 font-bold text-2xl uppercase' >Something went wrong</div>): ("")
            }
            {
              !city && <p  className='text-red-500 font-bold text-2xl uppercase ' >No data found</p>
            }
            {
              city && !loading && !error && 
              <div className='flex flex-col gap-2' >
                <p className='text-5xl font-semibold ' > {cityName} <sup className='text-sm' >{country.country}</sup> </p>
                <p className='text-2xl text-orange-400  cursor-pointer' onClick={handleClick}> 
                {isCelsius ? `${city.temp} °C` : `${convertToFahrenheit(city.temp)} °F`}
                </p>
                <p className='text-xl' >Humidity - {city.humidity} g/m<sup>3</sup></p>
                
                <div className='flex flex-row gap-3 justify-center ' >
                  <span className='text-green-500' >Min temp: {city.temp_min} °C</span>
                  <span className='text-red-500' >Max temp: {city.temp_max} °C</span>
                </div>
              </div> 
            }
          </div>

          <div className='border-b-8 w-7 text-center mx-auto mt-7' ></div>

          <div className='mx-auto text-center  flex ' >
                <div className='flex mt-5 mx-auto ' >
                <h2 className='uppercase text-yellow-500 font-semibold' >Past Searches -  </h2>
                <ul >
                {pastSearches.map((pastSearch, index) => (
                    <li key={index} className='uppercase' >{pastSearch}</li>
                ))}
                </ul>
            </div>
                
          </div>
          <Link to={'/assign2'} className='text-blue-400  pointer font-serif text-sm font-light underline ' >
                    Link to assignment 2
                </Link>
    </div>
  )
}

export default WeatherApi