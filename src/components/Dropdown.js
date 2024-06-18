import { useState, useEffect, useCallback } from "react";
import SVGIcon from "@/src/components/SVGIcon";
import {
  DropdownContainer,
  DropdownLabel,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  ErrorMessage,
  IconWrapper,
} from "@/src/components/styles/Dropdown";

export default function Dropdown({
  label,
  name,
  options,
  buttonText,
  onOptionClick,
  required,
  errorMessage,
  defaultSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultSelected || "");
  const [focusedIndex, setFocusedIndex] = useState(
    defaultSelected
      ? options.findIndex((option) => option === defaultSelected)
      : -1
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest(".dropdown-container")) {
        setIsOpen(false);
        setFocusedIndex(
          options.findIndex((option) => option === selectedOption)
        );
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, selectedOption, options]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const optionElement = document.getElementById(`option-${focusedIndex}`);
      optionElement?.focus();
    }
  }, [focusedIndex, isOpen]);

  const toggleDropdown = useCallback(
    (event) => {
      event.preventDefault();
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setFocusedIndex(
          options.findIndex((option) => option === selectedOption) >= 0
            ? options.findIndex((option) => option === selectedOption)
            : 0
        ); // Focus on the selected option or the first option when opening
      } else {
        setFocusedIndex(-1); // Reset focus when closing the dropdown
      }
    },
    [isOpen, selectedOption, options]
  );

  const handleOptionClick = useCallback(
    (option, index) => {
      setSelectedOption(option);
      setIsOpen(false);
      setFocusedIndex(index); // Set focus to the selected option
      onOptionClick(option);
    },
    [onOptionClick]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (["Enter", " ", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(
          options.findIndex((option) => option === selectedOption) >= 0
            ? options.findIndex((option) => option === selectedOption)
            : 0
        ); // Focus on the selected option or the first option when opening
      } else if (event.key === "Escape") {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    },
    [selectedOption, options]
  );

  const handleMenuKeyDown = useCallback(
    (event) => {
      const currentIndex = focusedIndex;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const offset = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          (currentIndex + offset + options.length) % options.length;
        setFocusedIndex(nextIndex);
        const optionElement = document.getElementById(`option-${nextIndex}`);
        optionElement?.focus();
      } else if (event.key === "Tab") {
        event.preventDefault();
        const nextIndex = currentIndex + 1;
        if (nextIndex < options.length) {
          setFocusedIndex(nextIndex);
        } else {
          setIsOpen(false);
          setFocusedIndex(-1);
          document.getElementById(name)?.focus();
        }
      } else if (event.key === "Escape") {
        setIsOpen(false);
        setFocusedIndex(-1);
      } else if (["Enter", " "].includes(event.key)) {
        event.preventDefault();
        handleOptionClick(options[currentIndex], currentIndex);
      }
    },
    [focusedIndex, options, handleOptionClick, name]
  );

  return (
    <DropdownContainer className="dropdown-container">
      <DropdownLabel htmlFor={name}>{label}</DropdownLabel>
      <input
        type="hidden"
        name={name}
        value={selectedOption}
        required={required}
      />
      <DropdownButton
        id={name}
        onClick={toggleDropdown}
        onTouchStart={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={errorMessage ? "has-error" : ""}
      >
        {selectedOption || buttonText}
        <IconWrapper>
          <SVGIcon iconName="arrow_down" color="var(--neutrals-dark-gray)" />
        </IconWrapper>
      </DropdownButton>
      {isOpen && (
        <DropdownMenu role="listbox" onKeyDown={handleMenuKeyDown}>
          {options.map((option, index) => (
            <DropdownItem
              key={index}
              id={`option-${index}`}
              role="option"
              tabIndex={0}
              aria-selected={selectedOption === option ? "true" : "false"}
              onClick={() => handleOptionClick(option, index)}
              onTouchStart={() => handleOptionClick(option, index)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </DropdownContainer>
  );
}
