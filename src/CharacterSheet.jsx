import {React, useState, useEffect} from 'react';
import './ThreeColumnLayout.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import AttributesColumn from "./Components/AttributesColumn";
import ClassesColumn from "./Components/ClassesColumn";
import SkillsColumn from "./Components/SkillsColumn";

const CharacterSheet = () => {
  const MAX_ATTIBUTES = 70; // Max number of points that can be used on attributes
  const [maxPoints, setMaxPoints] = useState(10); // Starting skill points available to use
  const [skillPoints, setSkillPoints] = useState(0); // Skill points used so far
  const [attributePoints, setAttributePoints] = useState(60); // Starting amount of attribute points

  // Create character attributes based on ATTRIBUTE_LIST and initialize starting values to 10
  const initializeCharacterAttributes = () => {
    const attributes = {};
    for (let i = 0; i < ATTRIBUTE_LIST.length; i++) {
      attributes[ATTRIBUTE_LIST[i]] = 10;
    }
    return attributes;
  }
  const [attributes, setAttributes] = useState(initializeCharacterAttributes())

  // Initialize array to keep track of which classes have minimum requirements met
  const initializeClassRequirements = () => {
    const requirements = [];
    for (let i = 0; i < Object.keys(CLASS_LIST).length; i++) {
      requirements.push(false);
    }
    return requirements;
  }
  const [classRequirements, setClassRequirements] = useState(initializeClassRequirements());

  // Create character skills based on SKILL_LIST and initialize starting values to 0
  const initializeSkills = () => {
    const skills = {};
    for (let i = 0; i < SKILL_LIST.length; i++) {
      skills[SKILL_LIST[i].name] = 0;
    }
    return skills;
  }
  const [skills, setSkills] = useState(initializeSkills());

  // Formula to calculate modifier based on the attribute value
  const calculateModifier = (attributeValue) => {
    return Math.floor((attributeValue - 10) / 2);
  }

  // Function that handles increment/decrement of character attributes
  const updateCharacterAttribute = (attribute, value, isIncrement) => {
    // Don't want attribute to go into negatives
    if (value < 0) return;

    // If incrementing an attribute, check if max attributes is reached
    if (isIncrement) {
      if (attributePoints == MAX_ATTIBUTES) {
        alert("A Character can have up to " + MAX_ATTIBUTES + " Delegated Attribute Points");
        return;
      }

      setAttributePoints(prevAttributePoints => prevAttributePoints + 1);
    }
    else {
      setAttributePoints(prevAttributePoints => prevAttributePoints - 1);
    }

    setAttributes(prevAttributes => ({
      ...prevAttributes,
      [attribute]: value
    }));
  };

  // Function that handles increment/decrement of character skills
  const updateCharacterSkill = (skill, value, isIncrement) => {
    // Don't want skill to go into negatives
    if (value < 0) return;

    // If incrementing a skill, check if any points left to spend
    if (isIncrement) {
      if (skillPoints == maxPoints) return;

      setSkillPoints(prevSkillPoints => prevSkillPoints + 1);
    }
    else {
      setSkillPoints(prevSkillPoints => prevSkillPoints - 1);
    }


    setSkills(prevSkills => ({
      ...prevSkills,
      [skill]: value
    }));
  };

  // Check if minimum requirements for a class are met when character attributes are modified
  useEffect(() => {

    let newRequirements = [];

    for (const key in CLASS_LIST) {
      const classInfo = CLASS_LIST[key];
      
      let requirementMet = true;

      for (const attribute in classInfo) {
        if (attributes[attribute] < classInfo[attribute]) {
          requirementMet = false;
          break;
        }
      }
      
      if (requirementMet) {
        newRequirements.push(true);
      }
      else {
        newRequirements.push(false)
      }
    }

    setClassRequirements(newRequirements);
  }, [attributes]);

  // Update max points when intelligence modifier is changed
  useEffect(() => {

    setMaxPoints(Math.max(0, 10 + 4 * calculateModifier(attributes['Intelligence'])));
    
  }, [attributes['Intelligence']]);

  

  // TODO: Function to add a new character
  const addCharacter = () => {
    
  };

  // TODO: Function to reset all characters
  const resetCharacters = () => {
    
  };

  // Function to save all characters
  const saveCharacters = () => {
    const url = 'https://recruiting.verylongdomaintotestwith.ca/api/simonbard4/character';

    // all character data that needs to be saved
    const formData = {
      attributes: attributes,
      skills: skills,
      classRequirements: classRequirements,
      maxPoints: maxPoints,
      skillPoints: skillPoints,
      attributePoints: attributePoints
    };

    // POST request to submit form data
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error saving characters');
      }
      return response.json();
    })
    .then(responseData => {
      console.log('Success:', responseData);
    })
    .catch(error => {
      console.error('Error saving characters:', error);
    });
  };

  // TODO: Retrieve saved character on page load
  useEffect(() => {
    
  }, []);

  return (
    <div>
      <div>
        <button onClick={addCharacter}>Add New Character</button>
        <button onClick={resetCharacters}>Reset All Characters</button>
        <button onClick={saveCharacters}>Save All Characters</button>
      </div>
      <li style={{ listStyleType: 'none', padding: '10px', margin: '10px' }}>{"Character: 1"}</li>
      <div className="grid-container">

        <AttributesColumn attributes={attributes} updateCharacterAttribute={updateCharacterAttribute} calculateModifier={calculateModifier}/>

        <ClassesColumn classRequirements={classRequirements} classList={CLASS_LIST} />

        <SkillsColumn skills={skills} updateCharacterSkill={updateCharacterSkill} calculateModifier={calculateModifier} maxPoints={maxPoints} skillPoints={skillPoints} attributes={attributes} skillList={SKILL_LIST}/>

      </div>
    </div>
  );
};

export default CharacterSheet;