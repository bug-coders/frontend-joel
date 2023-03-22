import styled from "styled-components";

const accentColor = "rgba(3, 151, 250,)";

const Button = styled.button`
  align-items: center;
  background-color: ${(props) =>
    props.variant === "primary" ? accentColor : "white"};
  border-radius: 6px;
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
    background-color: ${(props) =>
      props.variant === "primary"
        ? "rgb(26, 145, 218)"
        : "rgba(29, 161, 242, 0.1)"};
  }
`;

export default Button;
