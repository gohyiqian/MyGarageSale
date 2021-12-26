import styled from "styled-components";
import { keyframes } from "styled-components";

const moveLinear = keyframes`
  from {
    transform: translate(600px, 0px);
  }
  to {
    transform: translate(-400px, 0px);
  }
`;

const MoveLinear = styled.div`
  animation: ${moveLinear} 15s linear infinite;
`;

const Container = styled.div`
  height: 40px;
  background-color: lightgrey;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
`;

const Banner = () => {
  return (
    <Container style={{ overflow: "hidden" }}>
      <MoveLinear>
        Use Promo Code X12HYQ for 5% off all first-time purchases!
      </MoveLinear>
    </Container>
  );
};

export default Banner;
