import {React} from 'react';

const AttributesColumn = ({attributes, updateCharacterAttribute, calculateModifier}) => {

  return (
    <div>

        {/* Attributes column */}
        <div className="grid-item">
          <h2>Attributes</h2>
          <ul style={{ padding: 10}}>
            {Object.keys(attributes).map((name, i) => (
                <li style={{ listStyleType: 'none'}} key={i}>
                  {name + ": " + attributes[name] + " (Modifier: " + calculateModifier(attributes[name]) + ") "}
                  <button onClick={() => updateCharacterAttribute(name, attributes[name] + 1, true)}>+</button>
                  <button onClick={() => updateCharacterAttribute(name, attributes[name] - 1, false)}>-</button>
                </li>
            ))}
          </ul>
        </div>

    </div>
  );
};

export default AttributesColumn;