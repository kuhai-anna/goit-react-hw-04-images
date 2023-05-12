import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.backdrop};
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 200px;
  width: 95%;
  max-width: 720px;
  border-radius: ${props => props.theme.spacing(1)};
  /* padding: ${props => props.theme.spacing(3)}; */
  /* background-color: #ffffff; */
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2) 0px, 1px, 1px,
    0px rgba(0, 0, 0, 0.4), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
