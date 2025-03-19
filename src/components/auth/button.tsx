"use client"

import styled from "styled-components"

interface AuthButtonProps {
    text?: string;
}

export default function AuthButton({text}: AuthButtonProps) {
    return (
        <Button>{text}</Button>
    )
}

const Button = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 100px;
    background-color: #18E7C1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 15px;
    color: white;
    border: none;
`;