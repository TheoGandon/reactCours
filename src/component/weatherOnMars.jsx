import React, { useEffect, useState } from "react";
import '../css/weatherOnMars.css'
import { motion } from "motion/react"

const WeatherOnMars = () => {
    const [weather, setWeather] = useState([]);
    const [solKeys, setSolKeys] = useState([]);

    const fetchWeather = async () => {
        fetch("https://api.nasa.gov/insight_weather/?api_key=f4gt34OOnaT6A4ea4Wd4ez2AAIyukOtFfVKkTeV6&feedtype=json&ver=1.0")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setWeather(data);
                setSolKeys(data.sol_keys);
            });
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="cardW">
            <h2 className="titleW">Météo sur mars</h2>
            {solKeys.map((sol) => (
                <motion.div className="statsW" animate={{y: 30}} whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <div className="" key={sol}>
                    <h2 className="dayW">Sol {sol}</h2>
                    <p>Séson : {weather[sol].Season}</p>
                    <p>Moy : {weather[sol].AT.av} °C</p>
                    <p>Max : {weather[sol].AT.mx} °C</p>
                    <p>Min : {weather[sol].AT.mn} °C</p>
                    <p>Vitesse du vent : {weather[sol].HWS.av} m/s</p>
                </div>
                </motion.div>
            ))}
        </div>
    );
};

export default WeatherOnMars;