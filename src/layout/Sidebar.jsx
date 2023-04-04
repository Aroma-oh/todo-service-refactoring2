import styled from "styled-components";
import { Toggle } from "../components/Toggle";
import { Tags } from "../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { doneFilterHandler } from "../slices/todosSlice";

const SidebarContainer = styled.nav`
    position: fixed;
    width: 260px;
    height: 100vh;
    left: 0px;
    top: 100px;

    background-color: ${(props) => props.theme.colors.containerBgColor};
    > #filterTask {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 29px 27px 27px 36px;
        gap: 10px;

        position: absolute;
        width: 100%;
        height: 12%;
        left: 0;
        top: 55%;

        font-size: 1.2rem;
        color: ${(props) => props.theme.colors.textColor};
    }
`;
export const Sidebar = () => {
    const dispatch = useDispatch();
    const isHide = useSelector((state) => state.todos.isHide);
    return (
        <SidebarContainer>
            <Tags />
            <div id="filterTask">
                <input
                    type="checkbox"
                    checked={isHide}
                    onClick={() => {
                        dispatch(doneFilterHandler());
                    }}
                ></input>
                <label>Hide Done Tasks</label>
            </div>
            <Toggle />
        </SidebarContainer>
    );
};
