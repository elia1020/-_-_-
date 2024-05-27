import React, { useState, useEffect } from 'react';
import './App.css';



function FlightMonitor() {
  const [altitude, setAltitude] = useState(0);
  const [heading, setHeading] = useState(0);
  const [adiAngle, setAdiAngle] = useState(0);
  const [initialAdiAngle, setInitialAdiAngle] = useState(0);
  const [adiColor, setAdiColor] = useState('yellow');
  useEffect(() => {
    setInitialAdiAngle(adiAngle);
  }, []);
  const handleAltitudeChange = (event) => {
    const newAltitude = parseInt(event.target.value);
    setAltitude(newAltitude);
  };
  const handleHeadingChange = (event) => {
    const newHeading = parseInt(event.target.value);
    setHeading(newHeading);
  };
  const handleAdiAngleChange = (event) => {
    const newAdiAngle = parseInt(event.target.value);
    setAdiAngle(newAdiAngle);

    if (newAdiAngle === 100) {
      setAdiColor('blue');
    } else {
      setAdiColor('yellow');
    }
  };
  return (
   <div className='bak'>
      <table >  
          <div className='absolute' style={{ position: 'absolute', top: `${altitude}px`, transform: 'translateX(-50%)' }}><img src='/חץ.png' id='b12'/></div>
      <tr>
      <td>0</td>
  </tr>
  <tr>
    <td>
      1,500
    </td>
  </tr>
  <tr>
    <td>
      3,000
    </td>
  </tr>
         </table>
        <img src="/הורדה.jpg" alt="compass" style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(${heading}deg)` }} />
        <div className="adi-indicator" style={{ backgroundColor: adiColor, bottom: `${initialAdiAngle}%` }}></div>
        <form>
          <div id='a1'>
            <label>ALTITUDE:</label>
            <input className='l1' type="number" min="0" max="520" value={altitude} onChange={handleAltitudeChange} />
          </div>
          <div id='a2'>
            <label>HIS:</label>
            <input type="number" min="0" max="360" value={heading} onChange={handleHeadingChange} />
          </div>
          <div id='a3'>
            <label>ADI:</label>
            <input className='r1' type="number" min="0" max="100" value={adiAngle} onChange={handleAdiAngleChange} />
          </div>
            <button className='button'>איפוס</button>
       </form>
    </div>
  );
}
export default FlightMonitor;
