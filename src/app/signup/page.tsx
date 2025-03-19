"use client"

import styled from "styled-components"
import AuthInput from "@/components/auth/input"
import AuthButton from "@/components/auth/button"
import Image from "next/image"
import Logo from "../../assets/imgs/logo.svg";
import BottomSheet from "@/components/auth/bottomSheet"
import { useState, useEffect } from "react"

export default function Login() {
    const [isBirthdayActive, setIsBirthdayActive] = useState<boolean | null>(null);

    useEffect(() => {
        setIsBirthdayActive(false);
    }, []);

    if (isBirthdayActive === null) {
        return null;
    }

    return (
        <Wrapper>
            <Image src={Logo} alt="HHH" style={{width: 75, marginTop: 117}}/>
            <InputWrapper>
                <AuthInput type="text" placeholder="이름을 입력하세요"/>
                <AuthInput type="email" placeholder="이메일을 입력하세요"/>
                <BirthdayInput 
                    $isBirthdayActive={isBirthdayActive} 
                    onClick={() => setIsBirthdayActive(true)} 
                    tabIndex={0}
                >
                    생일을 입력하세요
                </BirthdayInput>
                <AuthInput type="password" placeholder="비밀번호를 입력하세요"/>
            </InputWrapper>
            <ButtonWrapper>
                <AuthButton text="회원가입"/>
            </ButtonWrapper>
            {isBirthdayActive && <BottomSheet onClose={() => setIsBirthdayActive(false)}/>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    padding: 0px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: 45px;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    margin-top: auto;
    margin-bottom: 76px;
`;

const BirthdayInput = styled.div<{$isBirthdayActive: boolean}>`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #414142;
    font-size: 13px;
    height: 40px;
    padding-left: 15px;
    border-radius: 5px;
    color: rgba(255, 255, 255, 0.5);
    border: ${({ $isBirthdayActive }) => ($isBirthdayActive ? "1px solid #18E7C1" : "")};
`;