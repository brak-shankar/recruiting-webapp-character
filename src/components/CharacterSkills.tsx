import React from "react";
import { Attributes } from "../types";
import {SKILL_LIST} from "../consts";

interface CharacterSkillsProps {
    attributes: Attributes;
    skillPoints: Record<string, number>;
    onUpdateSkillPoints: (skill: string, delta: number) => void;
}

const CharacterSkills: React.FC<CharacterSkillsProps> = ({
                                                             attributes,
                                                             skillPoints,
                                                             onUpdateSkillPoints,
                                                         }) => {
    const handleSkillPointChange = (skill: string, delta: number) => {
        onUpdateSkillPoints(skill, delta);
    };

    const getSkillValue = (skill: string) => {
        const attributeModifier = SKILL_LIST.find((s) => s.name === skill)?.attributeModifier;
        const attributeValue = attributes[attributeModifier as keyof Attributes];
        const abilityModifier = Math.floor((attributeValue - 10) / 2);
        const pointsSpent = skillPoints[skill] || 0;

        return abilityModifier + pointsSpent;
    };

    return (
        <div>
            <h3>Skills</h3>
            {SKILL_LIST.map((skill) => (
                <div key={skill.name}  className="skill-container">
                    <span>{skill.name} - points: {skillPoints[skill.name] || 0}</span>
                    <button onClick={() => handleSkillPointChange(skill.name, 1)}>+</button>
                    <button onClick={() => handleSkillPointChange(skill.name, -1)}>-</button>
                    <span> modifier ({skill.attributeModifier}): {Math.floor((attributes[skill.attributeModifier as keyof Attributes] - 10) / 2)}</span>
                    <span> total: {getSkillValue(skill.name)}</span>
                </div>
            ))}
        </div>
    );
};

export default CharacterSkills;