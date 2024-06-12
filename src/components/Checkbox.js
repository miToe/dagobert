import { HiddenCheckbox, StyledCheckbox, CheckboxGroup, Icon } from "@/src/components/styles/CheckboxStyled.js";

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
