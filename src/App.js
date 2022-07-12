import React, { useState } from 'react';

const api = {
    key: "6d4ed33b6664ad84d1c0b6ce933c6aa2",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App(){

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === 'Enter'){
            fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
                setQuery('');
                console.log(result);
            });
        }
    }

    let dates = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return(
        <div className={(typeof weather.main != 'undefined')? ((weather.main.temp > 60) ? 'App warm' : 'App') : 'App'}>
            <main>
                <div className="searchDiv">
                    <input type="text"
                            className="searchBar"
                            placeholder="Your location..."
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                            onKeyPress={search}
                            />
                </div>
                {(typeof weather.main !='undefined') ? (
                    <div>
                    <div className="locationDiv">
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{dates(new Date())}</div>
                    </div>
                    <div className="weatherDiv">
                        <div className="temp">{Math.round(weather.main.temp)}°</div>
                        <div className="weather">{weather.weather[0].main}</div>
                    </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    );
}
export default App;