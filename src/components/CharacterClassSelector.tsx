import React from "react";
import { Class } from "../types";
import { CLASS_LIST } from "../consts";

interface Props {
    selectedClass: Class;
    onSelectClass: (newClass: Class) => void;
}

const CharacterClassSelector: React.FC<Props> = ({ selectedClass, onSelectClass }) => {
    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectClass(event.target.value as Class);
    };
    return (
        <div>
            <label>Class: </label>
            <select
                value={selectedClass}
                onChange={handleClassChange}
            >
                {Object.keys(CLASS_LIST).map((cls: string) => (
                    <option key={cls} value={cls}>
                        {cls}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CharacterClassSelector;