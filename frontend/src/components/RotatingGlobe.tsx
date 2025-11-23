import './RotatingGlobe.css';

export default function RotatingGlobe() {
  return (
    <div className="globe-container">
      <div className="globe">
        <div className="globe-sphere">
          <div className="globe-grid"></div>
        </div>
        
        {/* Orbiting rings */}
        <div className="orbit">
          <div className="orbit-dot"></div>
        </div>
        <div className="orbit">
          <div className="orbit-dot"></div>
        </div>
        <div className="orbit">
          <div className="orbit-dot"></div>
        </div>
      </div>
      
      {/* Text overlay */}
      <div className="globe-text">
        <h2>QUIZ<br/>MASTER</h2>
      </div>
    </div>
  );
}
