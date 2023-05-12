import styled from 'styled-components';
import { Field as FormikField, Form as FormikForm } from 'formik';

export const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  min-height: 64px;
  padding-right: ${props => props.theme.spacing(6)};
  padding-left: ${props => props.theme.spacing(6)};
  padding-top: ${props => props.theme.spacing(3)};
  padding-bottom: ${props => props.theme.spacing(3)};

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(
    rgba(25, 213, 255, 0.536),
    rgba(1, 69, 92, 0.577)
  );
  background-color: ${props => props.theme.colors.bgdAccent};
  backdrop-filter: blur(15px);
`;

export const Form = styled(FormikForm)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: ${props => props.theme.colors.bgdForm};
  border-radius: ${props => props.theme.spacing(1)};
  overflow: hidden;
`;

export const Field = styled(FormikField)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: ${props => props.theme.colors.bgdForm};
  padding: ${props => props.theme.spacing(0)} ${props => props.theme.spacing(2)};
  color: ${props => props.theme.colors.textAccent};

  ::placeholder {
    font: inherit;
    font-size: 16px;
  }
`;
