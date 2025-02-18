import React, { useState, useEffect } from "react";

interface CharacterSaverProps {
    selectedClass: string;
    attributes: any;
    skillPoints: any;
}

const CharacterSaver: React.FC<CharacterSaverProps> = ({
                                                           selectedClass,
                                                           attributes,
                                                           skillPoints,
                                                       }) => {
    const [savedCharacters, setSavedCharacters] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSavedCharacters = async () => {
            try {
                const response = await fetch("https://recruiting.verylongdomaintotestwith.ca/api/{brak-shankar}/character");
                const data = await response.json();
                setSavedCharacters(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSavedCharacters();
    }, []);

    const handleSaveCharacter = async () => {
        setIsSaving(true);
        try {
            const characterData = {
                class: selectedClass,
                attributes,
                skillPoints,
            };
            const response = await fetch("https://recruiting.verylongdomaintotestwith.ca/api/{brak-shankar}/character", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(characterData),
            });
            const data = await response.json();
            setSavedCharacters((prev) => [...prev, data]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <button onClick={handleSaveCharacter} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Character"}
            </button>
            <h2>Saved Characters:</h2>
            <ul>
                {savedCharacters.map((character, index) => (
                    <li key={index}>
                        <h3>{character.class}</h3>
                        <p>Attributes: {JSON.stringify(character.attributes)}</p>
                        <p>Skill Points: {JSON.stringify(character.skillPoints)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterSaver;