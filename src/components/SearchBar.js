import { useState, useEffect, useCallback } from "react";
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
    .map(char => String.fromCharCode(char.charCodeAt(0) + offset))
    .join("");
}

const encryptedSecret = "gdjrehuw";

export default function SearchBar ({ searchValue, data, onSearchResults }) {
  const [query, setQuery] = useState(searchValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const resetSearch = useCallback(() => {
    setSuggestions([]);
    setShowEasterEgg(false);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSearchResults(data);
  }, [data, onSearchResults]);

  useEffect(() => {
    if (!query) {
      resetSearch();
      return;
    }

    const trimmedQuery = query.trim().toLowerCase();

    if (encrypt(trimmedQuery) === encryptedSecret) {
      handleEasterEgg();
      return;
    }

    const results = data.filter(item => {
      const values = Object.values(item).join(" ").toLowerCase();
      return values.includes(trimmedQuery);
    });

    const uniqueResults = results.filter((value, index, self) =>
        index === self.findIndex(t => (
          t.id === value.id
        ))
    );

    setSuggestions(uniqueResults.slice(0, 5));
    setIsOpen(uniqueResults.length > 0);
    setHighlightedIndex(-1);
    onSearchResults(uniqueResults);
  }, [query, data, onSearchResults, resetSearch]);

  const handleEasterEgg = () => {
    setShowEasterEgg(true);
    setSuggestions([]);
    setIsOpen(false);
    setHighlightedIndex(-1);

    const timer = setTimeout(() => {
      setShowEasterEgg(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

  const handleClear = useCallback(() => {
    setQuery("");
    resetSearch();
    setSelectedSuggestion(null);
  }, [resetSearch]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
  }, []);

  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion.description);
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
    setIsOpen(false);
    onSearchResults([suggestion]);
  }, [onSearchResults]);

  const handleInputFocus = () => {
    if (query && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = (event) => {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget && relatedTarget.classList.contains("suggestion-item")) {
      return;
    }
    setIsOpen(false);
  };

  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex(prevIndex =>
          prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex(prevIndex =>
          prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  }, [suggestions, highlightedIndex, handleSuggestionClick]);

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

  return (
    <SearchBarContainer>
      <SearchIcon>
        <SVGIcon iconName="search" color="var(--neutrals-dark-gray)" />
      </SearchIcon>
      <SearchInput
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        aria-expanded={isOpen ? "true" : "false"}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
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
                onMouseDown={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
                aria-selected={selectedSuggestion === suggestion}
                style={{
                  backgroundColor: index === highlightedIndex ? "#bde4ff" : "",
                }}
              >
                {highlightMatch(suggestion.description, query)} {suggestion.amount}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )
      )}
    </SearchBarContainer>
  );
};
