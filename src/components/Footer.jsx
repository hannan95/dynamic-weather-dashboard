import '../css/footer.css'
export default function Footer({ weather }) {
  return (
    <footer className="footer">
      <p>
        Weather data by{" "}
        <a href="https://www.weatherapi.com/" target="_blank" rel="noreferrer">
          WeatherAPI.com
        </a>
      </p>
      {weather && <p>Updated {weather.current.last_updated.slice(11, 16)}</p>}
      <p>
        © {new Date().getFullYear()} Hannan ·{" "}
        <a href="https://github.com/hannan95/dynamic-weather-dashboard" target="_blank" rel="noreferrer">
          Source code
        </a>
      </p>
    </footer>
  );
}