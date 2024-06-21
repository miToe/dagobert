export function validateInput(value, validationType) {
  switch (validationType) {
    case "required":
      return value.trim() !== "";
    case "number":
      return !isNaN(value);
    default:
      return true;
  }
}

export function applyErrorClass(element, isValid) {
  if (element) {
    if (!isValid) {
      element.classList.add("has-error");
    } else {
      element.classList.remove("has-error");
    }
  }
}

export function addErrorClassStyles() {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
      .has-error {
        border:1px solid red ;
      }
    `;
    document.getElementsByTagName("head")[0].appendChild(style);
  }
}
