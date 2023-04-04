import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../slices/themeSlice";

export const ToggleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 14px 77px;

    position: absolute;
    width: 100%;
    height: 70px;
    top: 67%;

    cursor: pointer;

    > .container {
        position: absolute;
        top: 18.5px;
        left: 90px;
        width: 80px;
        height: 40px;

        border: solid 2px;
        border-radius: 30px;
        border-color: ${(props) => props.theme.colors.toggleBorderColor};

        background-color: ${(props) => props.theme.colors.toggleColor};
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    > .circle {
        position: absolute;
        top: 22.5px;
        left: 94px;
        width: 32px;
        height: 32px;

        border: solid 2px;
        border-radius: 50%;
        border-color: ${(props) => props.theme.colors.toggleBorderColor};

        background-color: ${(props) => props.theme.colors.toggleColor};
        transition: all 0.5s;
        &.checked {
            left: 133px;
        }
    }
`;

export const Toggle = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <ToggleContainer onClick={() => dispatch(toggleTheme())}>
            <div className="container" />
            <div className={`circle ${isDarkMode ? "checked" : ""}`} />
        </ToggleContainer>
    );
};
