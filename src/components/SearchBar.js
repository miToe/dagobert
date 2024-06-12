// components/SearchBar.js
import { useState, useEffect, useRef } from "react";
import SVGIcon from "./SVGIcon";

import {
  SearchBarContainer,
  SearchIcon,
  SearchInput,
  ClearButton,
  SuggestionsList,
  SuggestionItem,
  Highlight,
  EasterEggIcon,
} from "@/src/components/styles/SearchBar";

// Verschlüsselungs- und Entschlüsselungsfunktion
const encrypt = (text) => {
  const offset = 3; // einfacher Verschlüsselungs-Offset
  return text
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + offset))
    .join("");
};

const decrypt = (text) => {
  const offset = 3; // einfacher Entschlüsselungs-Offset
  return text
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) - offset))
    .join("");
};

// Der verschlüsselte Wert von 'dagobert', aber nicht im Klartext im Code
const encryptedSecret = "gdjrehuw";

export default function SearchBar({ data, onSearchResults }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      onSearchResults(data);
      setSuggestions([]);
      setShowEasterEgg(false);
      setIsOpen(false);
      return;
    }

    if (encrypt(query.trim().toLowerCase()) === encryptedSecret) {
      setShowEasterEgg(true);
      setSuggestions([]);
      onSearchResults([]);
      setIsOpen(false);
      return;
    } else {
      setShowEasterEgg(false);
    }

    const results = data.filter((item) => {
      const values = Object.values(item).join(" ").toLowerCase();
      return values.includes(query.trim().toLowerCase());
    });
    onSearchResults(results);

    const uniqueSuggestions = [
      ...new Set(
        results.flatMap((item) =>
          Object.values(item).filter((value) => typeof value === "string")
        )
      ),
    ].slice(0, 5);
    setSuggestions(uniqueSuggestions);
    setIsOpen(uniqueSuggestions.length > 0);
  }, [query, data, onSearchResults]);

  const handleClear = () => {
    setQuery("");
    onSearchResults(data);
    setSuggestions([]);
    setShowEasterEgg(false);
    setIsOpen(false);
  };

  const highlightMatch = (text, query) => {
    if (typeof text !== "string") return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Highlight key={index}>{part}</Highlight>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSelectedSuggestion(suggestion);
    setIsOpen(false);
  };

  return (
    <SearchBarContainer ref={searchBarRef}>
      <SearchIcon>
        <SVGIcon iconName="search" color="var(--neutrals-dark-gray)" />
      </SearchIcon>
      <SearchInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-expanded={isOpen}
        onFocus={() => setIsOpen(suggestions.length > 0)}
      />
      {query && (
        <ClearButton onClick={handleClear}>
          <SVGIcon
            iconName="close"
            color="var(--neutrals-dark-gray)"
            size="16"
          />
        </ClearButton>
      )}
      {showEasterEgg ? (
        <EasterEggIcon />
      ) : (
        isOpen && (
          <SuggestionsList>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                aria-selected={selectedSuggestion === suggestion}
              >
                {highlightMatch(suggestion, query)}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )
      )}
    </SearchBarContainer>
  );
}
