import { css } from "@emotion/react";

export const quillEditor = css`

    box-sizing: border-box;
    flex-grow: 1;
    height: 60rem;

    .ql-toolbar{

        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        border: none;
        border-bottom: 0.1rem solid #dbdbdb;
    }

    .ql-container {

        height: 90%;
        overflow-y: auto;


    }
`;

export const quillTop = css`

    display: flex;
    justify-content: flex-end;

    & > input {

        box-sizing: border-box;
        flex-grow: 1;
        margin-right: 1rem;
        outline: none;
        border: ;
    }
`;

export const saveButton = css`

    box-sizing: border-box;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.5rem;
    background-color: #fafafa;
    cursor: pointer;

`