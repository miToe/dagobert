import React, { useState, useEffect, useCallback } from "react";
import {
  DropdownContainer,
  DropdownLabel,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  ErrorMessage,
} from "@/src/components/styles/Dropdown";

const Dropdown = ({
  label,
  name,
  options,
  buttonText,
  onOptionClick,
  required,
  errorMessage,
  defaultSelected,
}) => {
  // State to manage the open/close state of the dropdown
  const [isOpen, setIsOpen] = useState(false);
  // State to manage the selected option, initialized with defaultSelected if provided
  const [selectedOption, setSelectedOption] = useState(defaultSelected || "");

  // Effect to close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Toggle dropdown open/close state
  const toggleDropdown = useCallback((event) => {
    event.preventDefault();
    setIsOpen((prev) => !prev);
  }, []);

  // Handle option selection
  const handleOptionClick = useCallback(
    (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      onOptionClick(option);
    },
    [onOptionClick]
  );

  // Handle key down events for the dropdown button
  const handleKeyDown = useCallback((event) => {
    if (["Enter", " ", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      setIsOpen(true);
      setTimeout(() => {
        document.querySelector('[role="option"]')?.focus();
      }, 0);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  // Handle key down events for the dropdown menu
  const handleMenuKeyDown = useCallback(
    (event) => {
      const currentIndex = options.findIndex(
        (option) => option === event.target.innerText
      );
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const offset = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          (currentIndex + offset + options.length) % options.length;
        document.getElementById(`option-${nextIndex}`)?.focus();
      } else if (event.key === "Escape") {
        setIsOpen(false);
      } else if (["Enter", " "].includes(event.key)) {
        event.preventDefault();
        handleOptionClick(event.target.innerText);
      }
    },
    [options, handleOptionClick]
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
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={errorMessage ? "has-error" : ""}
      >
        {selectedOption || buttonText}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu role="listbox" onKeyDown={handleMenuKeyDown}>
          {options.map((option, index) => (
            <DropdownItem
              key={index}
              id={`option-${index}`}
              role="option"
              tabIndex={0}
              aria-selected={selectedOption === option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </DropdownContainer>
  );
};

export default Dropdown;
