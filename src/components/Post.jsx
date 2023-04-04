import { useState } from "react";
import styled from "styled-components";
import { EditDeletePopup } from "./EditDeletePopup";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todosSlice";

const PostContainer = styled.div`
    position: relative;
    width: 400px;
    height: auto;
    margin: 18px;
    border-radius: 24px;
    background-color: ${(props) => props.theme.colors.postColor};

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        padding: 14px 25px;
        margin-left: 0px;
        gap: 10px;

        width: 100%;
        height: 56.56px;
        left: 0px;
        top: 3px;

        color: ${(props) => props.theme.colors.textColor};
        font-weight: 500;
        font-size: 1.2rem;
        text-decoration: none;
        margin-left: 3.7%;
        > i {
            font-size: 1.8rem;
            margin-right: 24px;
            cursor: pointer;
        }
    }
    .content {
        margin: 0 18px;
        padding: 12px 27px;

        color: ${(props) => props.theme.colors.textColor};
        font-weight: 400;
        font-size: 1rem;
    }
`;

const PostFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 25px;
    gap: 10px;
    width: 100%;

    color: ${(props) => props.theme.colors.textColor};

    .label {
        border-radius: 100%;
        background-color: ${(props) => props.color};
        width: 30px;
        height: 30px;
    }
`;

export const Post = ({ id, title, content, tag, tagColor, done }) => {
    const dispatch = useDispatch();

    // edit 모달 구현시 필요
    const [isOn, setIsOn] = useState(false);
    const openEditModalHandler = () => {
        setIsOn(!isOn);
    };

    return (
        <PostContainer>
            <div key={id}>
                <div className="title">
                    <h3>{title}</h3>
                    <i
                        onClick={() => {
                            openEditModalHandler();
                        }}
                        className="fa-solid fa-ellipsis"
                    ></i>
                </div>
                <div className="content">{content}</div>
                {isOn ? (
                    <EditDeletePopup
                        id={id}
                        openEditModalHandler={openEditModalHandler}
                    />
                ) : null}
                <PostFooter color={tagColor}>
                    <div className="label" />
                    <div className="activeBox">
                        <input
                            type="checkbox"
                            checked={done}
                            onClick={() => {
                                dispatch(
                                    updateTodo({
                                        id,
                                        title,
                                        content,
                                        tag,
                                        tagColor,
                                        done: !done,
                                    })
                                );
                            }}
                        />
                        <label>{done === true ? "Done" : "Active"}</label>
                    </div>
                </PostFooter>
            </div>
        </PostContainer>
    );
};
