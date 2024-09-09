import {React, useState} from 'react';
import '../Popup.css';

const ClassesColumn = ({classRequirements, classList}) => {
  const [selectedClass, setSelectedClass] = useState(null);

  // Functions to handle popup that displays minimum class requirements
  const handleClassOpen = (className, classInfo) => {
    setSelectedClass({
      className: className,
      classInfo: classInfo
    });
  };
  const handleClassClose = () => {
    setSelectedClass(null);
  };

  return (
    <div>

        {/* Classes column */}
        <div className="grid-item">
          <h2>Classes</h2>
          <ul style={{ padding: 10}}>
            {Object.keys(classList).map((className, i) => (
              <li
                style={{ listStyleType: 'none', cursor: 'pointer', color: classRequirements[i] ? 'red' : 'white'}}
                key={i}
                onClick={() => handleClassOpen(className, classList[className])}>
                {className}
              </li>
            ))}
          </ul>

          {/* Popup for class requirements */}
          {selectedClass && (
            <div className="popupOverlay" onClick={handleClassClose}>
              <div className="popup" onClick={(e) => e.stopPropagation()}>
                <h3>{selectedClass.className + " Minimum Requirements"}</h3>
                <ul style={{ padding: 10}}>
                  {Object.entries(selectedClass.classInfo).map(([key, value]) => (
                    <li style={{ listStyleType: 'none'}} key={key}>{key + ": " + value}</li>
                  ))}
                </ul>
                <button style={{ margin: '10px'}} onClick={handleClassClose}>Close</button>
              </div>
            </div>
          )}

        </div>

    </div>
  );
};

export default ClassesColumn;