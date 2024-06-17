import { useState, useEffect } from "react";
import SVGIcon from "@/src/components/SVGIcon";

import {
  SearchBarContainer,
  SearchIcon,
  SearchInput,
  ClearButton,
  SuggestionsList,
  SuggestionItem,
  Highlight,
} from "@/src/components/styles/SearchBar";

import {
  EasterEgg,
  EasterHeads,
  EasterTails,
} from "@/src/components/styles/EasterEgg";

function encrypt(text) {
  const offset = 3;
  return text
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + offset))
    .join("");
}

const encryptedSecret = "gdjrehuw";

export default function SearchBar({ data, onSearchResults }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      onSearchResults(data);
      setSuggestions([]);
      setShowEasterEgg(false);
      setIsOpen(false);
      return;
    }

    // Check if the query matches the encrypted Easter Egg value
    if (encrypt(query.trim().toLowerCase()) === encryptedSecret) {
      setShowEasterEgg(true);
      setSuggestions([]);
      onSearchResults([]);
      setIsOpen(false);

      // Set a timeout to hide the Easter egg after 3 seconds
      const timer = setTimeout(() => {
        setShowEasterEgg(false);
      }, 3000);

      // Cleanup the timer on component unmount or when Easter egg is hidden
      return () => clearTimeout(timer);
    } else {
      setShowEasterEgg(false);
    }

    // Filter results based on the query
    const results = data.filter(function (item) {
      const values = Object.values(item).join(" ").toLowerCase();
      return values.includes(query.trim().toLowerCase());
    });
    onSearchResults(results);

    setSuggestions(results.slice(0, 5));
    setIsOpen(results.length > 0);
  }, [query]); // Only depend on query

  // Clear the search input and reset the state
  function handleClear() {
    setQuery("");
    onSearchResults(data);
    setSuggestions([]);
    setShowEasterEgg(false);
    setIsOpen(false);
  }

  // Highlight the matching parts of the text in the suggestions
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

  // Handle the click event on a suggestion
  function handleSuggestionClick(suggestion) {
    setQuery(suggestion.description);
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
    setIsOpen(false);
    onSearchResults([suggestion]);
  }

  // Handle focus event on the input
  function handleInputFocus() {
    if (query.trim() !== "" && suggestions.length > 0) {
      setIsOpen(true);
    }
  }

  // Handle blur event on the input
  function handleInputBlur(event) {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget && relatedTarget.classList.contains("suggestion-item")) {
      return;
    }
    setIsOpen(false);
  }

  return (
    <SearchBarContainer>
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
        onBlur={handleInputBlur}
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
        <EasterEgg>
          <EasterTails />
          <EasterHeads />
        </EasterEgg>
      ) : (
        isOpen && (
          <SuggestionsList>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
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
