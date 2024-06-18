import styled from "styled-components";
import SVGIcon from "@/src/components/SVGIcon";

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

export default function ErrorPage() {
  return (
    <CenteredContainer>
      <SVGIcon
        iconName="filter_off"
        color="var(--neutrals-dark-gray)"
        size="115"
      />
      <span>
      <h2>No matching results found.</h2>
      <p>Try changing your filter criteria.</p>
      </span>
    </CenteredContainer>
  );
}
