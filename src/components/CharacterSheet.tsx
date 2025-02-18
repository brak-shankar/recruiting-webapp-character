import React, { useState } from "react";
import { Class, Attributes } from "../types";
import { CLASS_LIST } from "../consts";
import CharacterClassSelector from "./CharacterClassSelector";
import CharacterAttributes from "./CharacterAttributes";
import CharacterSkills from "./CharacterSkills";
import CharacterSaver from "./CharacterSaver";
const CharacterSheet: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState<Class>("Barbarian");
    const [attributes, setAttributes] = useState<Attributes>(CLASS_LIST[selectedClass]);
    const [skillPoints, setSkillPoints] = useState<Record<string, number>>({});

    const handleClassChange = (newClass: Class) => {
        setSelectedClass(newClass);
        setAttributes(CLASS_LIST[newClass]);
        setSkillPoints({});
    };

    const handleAttributeChange = (attr: keyof Attributes, delta: number) => {
        setAttributes((prev: Attributes) => ({ ...prev, [attr]: prev[attr] + delta }));
    };

    const handleSkillPointChange = (skill: string, delta: number) => {
        const intelligenceModifier = Math.floor((attributes.Intelligence - 10) / 2);
        const totalPointsAvailable = 10 + 4 * intelligenceModifier;
        const currentPointsSpent = Object.values(skillPoints).reduce((acc: number, points: number) => acc + points, 0);
        const newPointsSpent = currentPointsSpent + delta;

        if (newPointsSpent <= totalPointsAvailable && newPointsSpent >= 0) {
            setSkillPoints((prev) => ({ ...prev, [skill]: (prev[skill] || 0) + delta }));
        }
    };

    return (
        <div>
            <h2>Character Sheet</h2>
            <CharacterClassSelector
                selectedClass={selectedClass}
                onSelectClass={handleClassChange}
            />
            <CharacterAttributes
                attributes={attributes}
                onUpdateAttribute={handleAttributeChange}
            />
            <CharacterSkills
                attributes={attributes}
                skillPoints={skillPoints}
                onUpdateSkillPoints={handleSkillPointChange}
            />
            {/*API call not working, comment the chacter saver component*/}
            {/*<CharacterSaver*/}
            {/*    selectedClass={selectedClass}*/}
            {/*    attributes={attributes}*/}
            {/*    skillPoints={skillPoints}*/}
            {/*/>*/}
        </div>
    );
};

export default CharacterSheet;