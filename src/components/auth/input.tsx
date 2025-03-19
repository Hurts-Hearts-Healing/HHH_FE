"use client"

import styled from "styled-components";
import { useState } from "react";

interface AuthInputProps {
    placeholder?: string;
    type?: "text" | "password" | "name" | "email" | "birthday";
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({ placeholder, type, value, onChange }: AuthInputProps) {
    const [error, setError] = useState<string | null>(null);

    const validateInput = (input: string) => {
        switch (type) {
            case "email":
                const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
                return emailRegEx.test(input) ? null : "이메일 형식이 맞지 않습니다";
            case "name":
                return input.trim().length === 0 ? "이름을 입력해주세요" : null;
            case "text":
            default:
                return input.trim().length === 0 ? "필드를 입력해주세요" : null;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setError(validateInput(inputValue));
        if (onChange) onChange(e);
    };

    return (
        <InputWrapper>
            <Input 
                type={type === "password" ? "password" : "text"} 
                placeholder={placeholder} 
                value={value} 
                onChange={handleChange}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputWrapper>
    )
}

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
`;

const ErrorMessage = styled.p`
    font-size: 10px;
    color: #FF5151;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    padding-left: 15px;
    background-color: #414142;
    border-radius: 5px;
    font-size: 13px;
    outline: none;
    border: none;
    color: white;
    &:focus {
        border: 1px solid #18E7C1;
    }
    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;
