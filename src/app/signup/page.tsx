"use client"

import styled from "styled-components"
import AuthInput from "@/components/auth/input"
import AuthButton from "@/components/auth/button"
import Image from "next/image"
import Logo from "../../assets/imgs/logo.svg";
import BottomSheet from "@/components/auth/bottomSheet"
import { useState } from "react"

export default function Login() {
    const [isBirthdayActive, setIsBirthdayActive] = useState<boolean>(false);

    return (
        <Wrapper>
            <Image src={Logo} alt="HHH" style={{width: 75, marginTop: 117}}/>
            <InputWrapper>
                <AuthInput type="name" placeholder="이름을 입력하세요"/>
                <AuthInput type="email" placeholder="이메일을 입력하세요"/>
                <BirthdayInput 
                    $isActive={isBirthdayActive} 
                    onClick={() => setIsBirthdayActive(true)} 
                    // onBlur={() => setIsBirthdayActive(false)}
                    tabIndex={0}
                >
                    생일을 입력하세요
                </BirthdayInput>
                <AuthInput type="password" placeholder="비밀번호를 입력하세요"/>
            </InputWrapper>
            <ButtonWrapper>
                <AuthButton text="로그인"/>
                <SignUpButtonWrapper>
                    <p>아직 회원이 아니신가요?</p>
                    <p className="highLight">회원가입</p>
                </SignUpButtonWrapper>
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
    height: 90vh;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: 45px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: auto;
`;

const SignUpButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    > p {
        font-size: 13px;
    }
    .highLight {
        color: #18E7C1;
    }
`;

const BirthdayInput = styled.div<{$isActive: boolean}>`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #414142;
    font-size: 13px;
    height: 40px;
    padding-left: 15px;
    border-radius: 5px;
    color: rgba(255, 255, 255, 0.5);
    border: ${({ $isActive }) => ($isActive ? "1px solid #18E7C1" : "")};
`;