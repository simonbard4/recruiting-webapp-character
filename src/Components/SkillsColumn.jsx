import {React} from 'react';

const SkillsColumn = ({skills, updateCharacterSkill, calculateModifier, maxPoints, skillPoints, attributes, skillList}) => {

  return (
    <div>

        {/* Skills column */}
        <div className="grid-item">
          <h2>Skills</h2>
          <p>{"Total skill points available: " + (maxPoints - skillPoints)}</p>
          <ul style={{ padding: 10}}>
            {skillList.map((item, i) => (
              <li
                style={{ listStyleType: 'none'}}
                key={i}>
                {item.name + ": " + skills[item.name] + " (Modifier: " + item.attributeModifier + "): " + calculateModifier(attributes[item.attributeModifier]) + " "}
                <button onClick={() => updateCharacterSkill(item.name, skills[item.name] + 1, true)}>+</button>
                <button onClick={() => updateCharacterSkill(item.name, skills[item.name] - 1, false)}>-</button>
                {" total: " + (skills[item.name] + calculateModifier(attributes[item.attributeModifier]))}
              </li>
            ))}
          </ul>
        </div>

    </div>
  );
};

export default SkillsColumn;