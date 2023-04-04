import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { tagHandler, tagFilterHandler } from "../slices/todosSlice";
import { useEffect } from "react";

const TagsContainer = styled.div`
    display: flex;
    flex-direction: column; // 여기를 프롭스로 변경11
    align-items: flex-start;
    padding: 34px 12px;
    gap: 12px;

    position: absolute;
    width: 100%;
    height: 55%;
    left: 0;
    top: 0;
`;

export const Tag = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    padding: 12px 24px;
    gap: 16px;
    height: 48px;

    cursor: pointer;
    border: none;
    border-radius: 24px;
    background-color: ${(props) => props.theme.colors.containerBgColor};
    &.checked {
        background-color: gray;
    }

    .tagColor {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-color: ${(props) => props.color};
    }
    .label {
        color: ${(props) => props.theme.colors.textColor};
        font-size: 1rem;
    }
`;

export const Tags = () => {
    const dispatch = useDispatch();
    const tagData = useSelector((state) => state.todos.tags);
    const selectedTag = useSelector((state) => state.todos.selectedTag);
    // console.log(tagData);
    // console.log(localStorage.getItem("persist:root"));

    // useEffect(() => {
    //     console.log("here");
    //     console.log(tagData);
    // });

    return (
        <TagsContainer>
            {tagData.map((el) => {
                return (
                    <Tag
                        key={el.label}
                        color={el.color}
                        onClick={() => {
                            dispatch(tagHandler(el.label));
                            dispatch(tagFilterHandler());
                        }}
                        className={selectedTag === el.label ? "checked" : ""}
                    >
                        <div className="tagColor"></div>
                        <div className="label">{el.label}</div>
                    </Tag>
                );
            })}
        </TagsContainer>
    );
};
