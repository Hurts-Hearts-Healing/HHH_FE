"use client"

import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import closeEye from "../../assets/imgs/auth/closeEye.svg";
import openEye from "../../assets/imgs/auth/openEye.svg";

interface AuthInputProps {
    placeholder?: string;
    type?: "password" | "text" | "email";
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({ placeholder, type, value, onChange }: AuthInputProps) {
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(true);

    const validateInput = (input: string): string | null => {
        if (type === "email") {
            const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
            return emailRegEx.test(input) ? null : "이메일 형식이 맞지 않습니다";
        }
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setError(validateInput(inputValue));
        if (onChange) onChange(e);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <InputWrapper>
            <Input 
                type={type === "password" ? (showPassword ? "password" : "text") : type} 
                placeholder={placeholder} 
                value={value} 
                onChange={handleChange}
                $paddingRight={type === "password" ? "40px" : "15px"}
            />
            {type === "password" && (
                <EyeIcon onClick={togglePassword}>
                    {showPassword ? <Image src={closeEye} alt="" /> : <Image src={openEye} alt="" />}
                </EyeIcon>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputWrapper>
    )
}

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    /* gap: 5px; */
    width: 100%;
`;

const ErrorMessage = styled.p`
    font-size: 10px;
    color: #FF5151;
    margin-top: 5px;
`;

const Input = styled.input<{ $paddingRight: string }>`
    width: 100%;
    height: 40px;
    padding-left: 15px;
    padding-right: ${({ $paddingRight }) => $paddingRight};
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


const EyeIcon = styled.div`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: white;
`;