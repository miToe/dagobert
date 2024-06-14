import styled from 'styled-components';

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  `;

export const Icon = styled.svg` 
    fill: none;
    stroke: white;
    stroke-width: 2px;
    `;

export const CheckboxStyled = styled.div ` 
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: ${props => (props.checked ? 'var(--primary-500)' : 'white')};
    border: 1px solid var(--primary-200);
    border-radius: 4px;

    ${Icon} {
        visibility: ${props => (props.checked ? 'visible' : 'hidden')};
    }
`;

export const CheckboxGroup = styled.div `
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between; 
    align-items: center;

    label {
        display: flex;
        align-items: center;
        margin-top: 10px;
        flex-basis: calc(50% - 8px); /* Calculate width for two columns */
    }
`;
