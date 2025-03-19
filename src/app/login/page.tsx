"use client"

import styled from "styled-components"
import AuthInput from "@/components/auth/input"
import AuthButton from "@/components/auth/button"
import Image from "next/image"
import Logo from "../../assets/imgs/logo.svg";
import { useState, useEffect } from "react"

export default function Login() {
    const [isMounted, setIsMounted] = useState(false); 

    useEffect(() => {
        setIsMounted(true); 
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <Wrapper>
            <Image src={Logo} alt="HHH" style={{width: 75, marginTop: 117}}/>
            <InputWrapper>
                <AuthInput type="text" placeholder="아이디를 입력하세요"/>
                <AuthInput type="password" placeholder="비밀번호를 입력하세요"/>
            </InputWrapper>
            <ButtonWrapper>
                <AuthButton text="로그인"/>
                <SignUpButtonWrapper>
                    <p>아직 회원이 아니신가요?</p>
                    <p className="highLight">회원가입</p>
                </SignUpButtonWrapper>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    padding: 0px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
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
    margin-bottom: 76px;
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