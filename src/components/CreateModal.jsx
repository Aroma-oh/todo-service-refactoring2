import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Tag } from "./Tags";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../slices/eventSlice";
import { addTodo, updateTodo, tagHandler } from "../slices/todosSlice";

const Container = styled.div`
    z-index: 1000;
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

const View = styled.div.attrs((props) => ({ role: "dialog" }))`
    width: 57%;
    min-width: 760px;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    background-color: ${(props) => props.theme.colors.containerBgColor};
    border-radius: 30px;
    transition: all 0.3s;

    .buttonBox {
        width: 100%;
        height: 20%;
        margin-top: 12px;
        padding: 18px 56px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
    .inputBox {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        padding: 18px 56px;

        .title {
            font-weight: 500;
            font-size: 1.5rem;
            margin: 8px 12px;

            color: ${(props) => props.theme.colors.textColor};
            border-radius: 16px;
            /*border-radius: 12px;
            border-color: "#F7F7F7";
            */
        }

        .content {
            font-weight: 400;
            font-size: 1.2rem;

            color: ${(props) => props.theme.colors.textColor};
            border-radius: 16px;
            /* border-color: "#F7F7F7";
             */
        }

        > textarea {
            width: 100%;
            padding: 24px 24px;

            background-color: ${(props) => props.theme.colors.mainBgColor};
            border-color: #f7f7f7;

            overflow: hidden;
            resize: none;

            .description {
                padding-bottom: 4px;
            }
            &::placeholder {
                color: ${(props) => props.theme.colors.textColor};
                font-weight: 400;
                font-size: 1.2rem;
            }
        }
    }
    .tags {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 14px 63px;
        gap: 23px;

        width: 100%;
        height: 130px;
        left: 0px;
        top: 450px;
    }
`;

const Button = styled.button`
    width: 15%;
    height: 45px;

    border: none;
    border-radius: 12px;

    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;

    /* 색상 적용이 안됨 
                👉 컴포넌트가 아니어서 안됨 
                    👉 컴포넌트로 분리하기 / 다른 방법 찾아보기 
            */
    background-color: ${(props) =>
        props.cancel
            ? props.theme.colors.containerBgColor
            : props.theme.colors.buttonColor};
    color: ${(props) =>
        props.cancel
            ? props.theme.colors.textColor
            : props.theme.colors.buttonTextColor};
`;

export const CreateModal = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.todos.todos);
    const tagData = useSelector((state) => state.todos.tags);
    const selectedTag = useSelector((state) => state.todos.selectedTag);
    const isOpen = useSelector((state) => state.event.isOpen);
    const target = useSelector((state) => state.event.target);
    const type = useSelector((state) => state.event.type);

    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);

    // const [selectedTag, setSelectedTag] = useState("");
    // 초기값이 없어서 오류 발생 // 📌 옵셔널 체이닝이 언디 오류를 해결해줌
    // state가 데이터를 만들기전에 filter가 참조해서 오류가 난다.
    // 옵셔널 체이닝을하면 state가 만들어지기 전에 undefined, 이후에 값을 주어 오류를 제거해준다.
    // state는 최초 렌더링시, 컴포넌트가 렌더링될때 두번 렌더되기 때문에 state가 업데이트 된 이후에 값을 받아오는 것이 가능하다.
    // 처음에 언디 -> 다음 렌더할때 데이터를 읽어옴
    let tagColor =
        tagData && tagData.find((el) => el.label === selectedTag)?.color;

    // 이건 state로 관리
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const titleHandler = (e) => setTitle(e.target.value);
    const contentHandler = (e) => setContent(e.target.value);

    // data만들기
    const newData = {
        id: data.length,
        title,
        content,
        tag: selectedTag,
        tagColor,
        done: false,
    };
    // console.log(newData);

    const editData = data.find((el) => el.id === target);
    const updateData = {
        ...editData,
        title,
        content,
        tag: selectedTag,
        tagColor,
    };

    //console.log(editData); // 잘 들어옴

    const cleanModal = () => {
        setTitle("");
        setContent("");
        dispatch(tagHandler(""));
        dispatch(openModal());
        return null;
    };

    useEffect(() => {
        console.log("useEffect");
        console.log(data);
    }, [data]);

    useEffect(() => {
        if (type === "create") {
            setTitle("");
            setContent("");
            dispatch(tagHandler(""));
        }
        if (!editData) return;

        setTitle(editData.title);
        setContent(editData.content);
        dispatch(tagHandler(editData.tag));
    }, [type, editData]);

    return (
        <>
            {isOpen ? (
                <Container onClick={() => dispatch(openModal())}>
                    <View onClick={(e) => e.stopPropagation()}>
                        <div className="buttonBox">
                            <Button
                                cancel
                                onClick={() => dispatch(openModal())}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    {
                                        if (type === "create") {
                                            dispatch(addTodo(newData));
                                            cleanModal();
                                        } else {
                                            dispatch(updateTodo(updateData));
                                            cleanModal();
                                        }
                                    }
                                }}
                            >
                                {type}
                            </Button>
                        </div>
                        <div className="inputBox">
                            <h2 className="title"> Title </h2>
                            <textarea
                                className="content"
                                placeholder="add a title ..."
                                value={title}
                                onChange={titleHandler}
                            />
                        </div>
                        <div className="inputBox">
                            <h2 className="title"> Description </h2>
                            <textarea
                                ref={textRef}
                                onInput={handleResizeHeight}
                                className="content description"
                                placeholder="add a description ..."
                                value={content}
                                onChange={contentHandler}
                            />
                        </div>
                        <div className="tags">
                            {tagData &&
                                tagData.map((el) => {
                                    return (
                                        <Tag
                                            key={el.label}
                                            color={el.color}
                                            onClick={() => {
                                                dispatch(tagHandler(el.label));
                                            }}
                                            className={
                                                selectedTag === el.label
                                                    ? "checked"
                                                    : ""
                                            }
                                        >
                                            <div className="tagColor"></div>
                                            <div className="label">
                                                {el.label}
                                            </div>
                                        </Tag>
                                    );
                                })}
                        </div>
                    </View>
                </Container>
            ) : null}
        </>
    );
};
