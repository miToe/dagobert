import React, { useState, useEffect } from "react";
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [buttonElement, setButtonElement] = useState(null);
  const [menuElement, setMenuElement] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonElement &&
        !buttonElement.contains(event.target) &&
        menuElement &&
        !menuElement.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonElement, menuElement]);

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionClick(option);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        buttonElement && buttonElement.focus();
        break;
      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const firstItem = menuElement?.querySelector('[role="option"]');
          firstItem && firstItem.focus();
        }
        break;
      default:
        break;
    }
  };

  const handleMenuKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        const nextSibling = event.target.nextElementSibling;
        nextSibling && nextSibling.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        const previousSibling = event.target.previousElementSibling;
        previousSibling && previousSibling.focus();
        break;
      case "Escape":
        setIsOpen(false);
        buttonElement && buttonElement.focus();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        handleOptionClick(event.target.innerText);
        break;
      default:
        break;
    }
  };

  return (
    <DropdownContainer>
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
        ref={setButtonElement}
        className={errorMessage ? "has-error" : ""}
      >
        {selectedOption || buttonText}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu
          role="listbox"
          ref={setMenuElement}
          onKeyDown={handleMenuKeyDown}
        >
          {options.map((option, index) => (
            <DropdownItem
              key={index}
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
