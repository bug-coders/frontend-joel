import styled from "styled-components";

const accentColor = "rgba(3, 151, 250,)";

const Button = styled.button`
  align-items: center;
  background-color: ${(props) =>
    props.variant === "primary" ? accentColor : "white"};
  border-radius: 6px;
  border-color: white;
  background: rgb(126, 54, 2);
  background: linear-gradient(
    90deg,
    rgb(126, 88, 61) 0%,
    rgb(173, 127, 66) 22%,
    rgb(238, 177, 65) 40%,
    rgba(255, 145, 0, 0.541) 52%,
    rgba(238, 177, 65) 72%,
    rgba(126, 88, 61) 100%
  );
  box-shadow: 1px -1px 1px rgba(97, 39, 6, 0.233), -1px 1px 1px rgba(97, 39, 6, 0.575);
  text-decoration: none;
  color: ${(props) => (props.variant === "primary" ? "white" : accentColor)};
  cursor: pointer;
  display: inline-flex;
  margin-left: 5px;
  align-self: center;
  font: inherit;
  font-weight: bold;
  min-height: 36px;
  justify-content: center;
  min-width: 72px;
  max-width: 150px;
  outline-style: none;
  margin: 3px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 0 30px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  text-decoration: none;
  transition: background-color 0.2s;
  text-decoration: none !important;
  color: black !important;
  
  &:hover {
    background: rgb(126, 54, 2);
  background: linear-gradient(
    90deg,
    rgb(126, 88, 61) 0%,
    rgb(185, 153, 110) 22%,
    rgb(255, 202, 102) 40%,
    rgba(255, 184, 91, 0.541) 52%,
    rgb(255, 202, 102) 72%,
    rgba(126, 88, 61) 100%
  );
  }
`;

export default Button;
