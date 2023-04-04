import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { openModal, modalType } from "../slices/eventSlice";
import { deleteTodo } from "../slices/todosSlice";

const Container = styled.div`
    z-index: 1;
    background-color: rgba(45, 45, 45, 0.3);

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const View = styled.div`
    z-index: 2;

    position: absolute;
    top: 46px;
    right: 21px;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Button = styled.button`
    background-color: ${(props) => props.theme.colors.containerBgColor};
    width: 120px;
    height: 43px;

    border-radius: ${(props) =>
        props.top ? "10px 10px 0px 0px" : "0px 0px 10px 10px"};
    border: none;
    border-bottom: ${(props) => (props.top ? "1px solid" : null)};

    color: ${(props) => props.theme.colors.textColor};
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;

    cursor: pointer;
`;

export const EditDeletePopup = ({ id, openEditModalHandler }) => {
    const data = useSelector((state) => state.todos.todos);
    const dispatch = useDispatch();

    return (
        <>
            <Container onClick={openEditModalHandler} />
            <View>
                <Button
                    top
                    onClick={() => {
                        dispatch(openModal(id));
                        dispatch(modalType("edit"));
                        openEditModalHandler();
                    }}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => {
                        dispatch(deleteTodo(id));
                        openEditModalHandler();
                    }}
                >
                    Delete
                </Button>
            </View>
        </>
    );
};
