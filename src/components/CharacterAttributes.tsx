import React from "react";
import { Attributes } from "../types";
import { ATTRIBUTE_LIST } from "../consts";
interface Props {
    attributes: Attributes;
    onUpdateAttribute: (attr: keyof Attributes, delta: number) => void;
}
const calculateModifier = (attribute: number): number => Math.floor((attribute - 10) / 2);
const CharacterAttributes: React.FC<Props> = ({ attributes, onUpdateAttribute }) => {
    const handleAttributeChange = (attr: keyof Attributes, delta: number) => {
        const totalAttributes = Object.values(attributes).reduce((acc, value) => acc + value, 0);
        if (totalAttributes + delta > 70) {
            // If the total attributes exceeds 70, don't update the attribute
            return;
        }
        onUpdateAttribute(attr, delta);
    };
    return (
        <div>
            <h3>Attributes</h3>
            {ATTRIBUTE_LIST.map((attr: keyof Attributes) => (
                <div key={attr}>
                    <span> {attr}: {attributes[attr]} (Modifier: {calculateModifier(attributes[attr])}) </span>
                    <button onClick={() => handleAttributeChange(attr, 1)}>+</button>
                    <button onClick={() => handleAttributeChange(attr, -1)}>-</button>
                </div>
            ))}
        </div>
    );
};
export default CharacterAttributes;