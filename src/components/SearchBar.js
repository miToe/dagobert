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

function encrypt(text) {
  const offset = 3;
  return text
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + offset))
    .join("");
}

function decrypt(text) {
  const offset = 3;
  return text
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) - offset))
    .join("");
}

const encryptedSecret = "gdjrehuw";

export default function SearchBar({ data, onSearchResults }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSuggestions([]); // Vorschläge leeren
      }
    }

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
    } else {
      setShowEasterEgg(false);
    }

    const results = data.filter(function (item) {
      const values = Object.values(item).join(" ").toLowerCase();
      return values.includes(query.trim().toLowerCase());
    });
    onSearchResults(results);

    setSuggestions(results.slice(0, 5));
    setIsOpen(results.length > 0);
  }, [query, data, onSearchResults]);

  function handleClear() {
    setQuery("");
    onSearchResults(data);
    setSuggestions([]);
    setShowEasterEgg(false);
    setIsOpen(false);
  }

  function highlightMatch(text, query) {
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
  }

  function handleSuggestionClick(suggestion) {
    setQuery(suggestion.description);
    setSuggestions([]);
    setIsOpen(false);
  }

  function handleInputFocus() {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  }

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
        aria-expanded={isOpen ? "true" : "false"}
        onFocus={handleInputFocus}
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
                {highlightMatch(suggestion.description, query)} - $
                {suggestion.amount}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )
      )}
    </SearchBarContainer>
  );
}
