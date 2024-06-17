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
    .map(function (char) {
      return String.fromCharCode(char.charCodeAt(0) + offset);
    })
    .join("");
}

const encryptedSecret = "gdjrehuw";

export default function SearchBar({ data, onSearchResults }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(
    function () {
      if (query.trim() === "") {
        setSuggestions([]);
        setShowEasterEgg(false);
        setIsOpen(false);
        setHighlightedIndex(-1);
        onSearchResults(data);
        return;
      }

      if (encrypt(query.trim().toLowerCase()) === encryptedSecret) {
        setShowEasterEgg(true);
        setSuggestions([]);
        setIsOpen(false);
        setHighlightedIndex(-1);

        const timer = setTimeout(function () {
          setShowEasterEgg(false);
        }, 3000);

        return function () {
          return clearTimeout(timer);
        };
      } else {
        setShowEasterEgg(false);
      }

      const results = data.filter(function (item) {
        const values = Object.values(item).join(" ").toLowerCase();
        return values.includes(query.trim().toLowerCase());
      });

      const uniqueResults = Array.from(
        new Set(
          results.map(function (a) {
            return a.id;
          })
        )
      ).map(function (id) {
        return results.find(function (a) {
          return a.id === id;
        });
      });

      setSuggestions(uniqueResults.slice(0, 5));
      setIsOpen(uniqueResults.length > 0);
      setHighlightedIndex(-1);
      onSearchResults(uniqueResults);
    },
    [query, data, onSearchResults]
  );

  const handleClear = useCallback(
    function () {
      setQuery("");
      onSearchResults(data);
      setSuggestions([]);
      setShowEasterEgg(false);
      setIsOpen(false);
      setSelectedSuggestion(null);
      setHighlightedIndex(-1);
    },
    [data, onSearchResults]
  );

  function highlightMatch(text, query) {
    if (typeof text !== "string") return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map(function (part, index) {
          return part.toLowerCase() === query.toLowerCase() ? (
            <Highlight key={index}>{part}</Highlight>
          ) : (
            part
          );
        })}
      </span>
    );
  }

  const handleSuggestionClick = useCallback(
    function (suggestion) {
      setQuery(suggestion.description);
      setSelectedSuggestion(suggestion);
      setSuggestions([]);
      setIsOpen(false);
      onSearchResults([suggestion]);
    },
    [onSearchResults]
  );

  function handleInputFocus() {
    if (query.trim() !== "" && suggestions.length > 0) {
      setIsOpen(true);
    }
  }

  function handleInputBlur(event) {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget && relatedTarget.classList.contains("suggestion-item")) {
      return;
    }
    setIsOpen(false);
  }

  const handleKeyDown = useCallback(
    function (event) {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex(function (prevIndex) {
            return prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex(function (prevIndex) {
            return prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1;
          });
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
            handleSuggestionClick(suggestions[highlightedIndex]);
          }
          break;
        case "Tab":
          if (highlightedIndex === suggestions.length - 1) {
            setIsOpen(false);
          }
          break;
        default:
          break;
      }
    },
    [highlightedIndex, suggestions, handleSuggestionClick]
  );

  return (
    <SearchBarContainer>
      <SearchIcon>
        <SVGIcon iconName="search" color="var(--neutrals-dark-gray)" />
      </SearchIcon>
      <SearchInput
        type="text"
        value={query}
        onChange={function (e) {
          setQuery(e.target.value);
        }}
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
            {suggestions.map(function (suggestion, index) {
              return (
                <SuggestionItem
                  key={index}
                  onMouseDown={function () {
                    handleSuggestionClick(suggestion);
                  }}
                  className="suggestion-item"
                  aria-selected={selectedSuggestion === suggestion}
                  style={{
                    backgroundColor:
                      index === highlightedIndex ? "#bde4ff" : "",
                  }}
                >
                  {highlightMatch(suggestion.description, query)} - $
                  {suggestion.amount}
                </SuggestionItem>
              );
            })}
          </SuggestionsList>
        )
      )}
    </SearchBarContainer>
  );
}
