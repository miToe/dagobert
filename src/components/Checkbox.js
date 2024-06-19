import { CheckboxGroup, HiddenCheckbox, Icon, StyledCheckbox } from "@/src/components/styles/StyledCheckbox.js";

export default function Checkbox({ className, checked, ...props }) {
  return (
    <CheckboxGroup className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxGroup>
  );
};
