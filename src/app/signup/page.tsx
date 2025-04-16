"use client"

import styled from "styled-components"
import AuthInput from "@/components/auth/input"
import AuthButton from "@/components/auth/button"
import Image from "next/image"
import Logo from "../../assets/imgs/logo.svg";
import BottomSheet from "@/components/auth/bottomSheet"
import { useState, useEffect } from "react"

type EmailStatus = 'INITIAL' | 'READY' | 'WAITING' | 'RESEND';
// INITIAL: 이메일 작성 전 상태
// READY: 이메일 작성 후 상태
// WAITING: 인증 버튼 누르고 60초 지나기 전 상태
// RESEND: 인증 버튼 누르고 60초 뒤 상태 (재전송)

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<EmailStatus>('INITIAL');
    const [timer, setTimer] = useState<number>(60);
    const [isBirthdayActive, setIsBirthdayActive] = useState<boolean | null>(null);
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (status === 'WAITING') {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        clearInterval(interval!);
                        setStatus('RESEND');
                        return 60;
                    }
                    return prev - 1;
                })
            }, 1000);
        }
        return () => clearInterval(interval!);
    }, [status])

    const checkEmail = (input: string): string | null => {
        return emailRegEx.test(input) ? null : "이메일 형식이 맞지 않습니다";
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setEmail(inputValue)
        setError(checkEmail(inputValue));
    }

    useEffect(() => {
        if (email.trim() && emailRegEx.test(email)) {
            if (status === 'INITIAL') setStatus('READY');
        } else {
            setStatus('INITIAL');
        }
    }, [email, status, emailRegEx])

    const handleButtonClick = () => {
        if (status === 'READY' || status==='RESEND') {
            setStatus('WAITING');
        }
    }

    const getButtonText = (): string => {
        switch (status) {
          case 'INITIAL':
          case 'READY':
            return '인증';
          case 'WAITING':
            return `${timer}`;
          case 'RESEND':
            return '재전송';
        }
      };

      const getButtonColor = (): string => {
        switch (status) {
          case 'INITIAL':
          case 'WAITING':
            return '#414142';
          case 'READY':
          case 'RESEND':
            return '#18E7C1';
        }
      };

      const getTextColor = (): string => {
        switch (status) {
            case 'INITIAL':
            case 'WAITING':
              return '#AAAAAA';
            case 'READY':
            case 'RESEND':
              return '#FFFFFF';
        }
      }

    const isDisabled: boolean = status === 'INITIAL' || status === 'WAITING';

    useEffect(() => {
        setIsBirthdayActive(false);
    }, []);

    if (isBirthdayActive === null) {
        return null;
    }

    // const handleBirthdayClick = () => {
    //     setIsBirthdayActive(true);
    // }

    return (
        <Wrapper>
            <Image src={Logo} alt="HHH" style={{width: 75, marginTop: 117}}/>
            <InputWrapper>
                <AuthInput type="text" placeholder="이름을 입력하세요"/>
                <EmailWrapper>
                    <EmailInputWrapper>
                        <EmailInput value={email} onChange={handleEmailChange} type="email" placeholder="이메일을 입력하세요"/>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </EmailInputWrapper>
                    <EmailButton $textColor={getTextColor()} $bgColor={getButtonColor()} onClick={handleButtonClick} disabled={isDisabled}>{getButtonText()}</EmailButton>
                </EmailWrapper>
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

const EmailInput = styled.input`
    width: 100%;
    height: 40px;
    padding-left: 15px;
    padding-right: 15px;
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

const EmailWrapper = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`;

const EmailButton = styled.button<{$bgColor: string, $textColor: string}>`
    width: 75px;
    height: 40px;
    background-color: ${({$bgColor}) => $bgColor};
    border-radius: 5px;
    border: none;
    font-size: 13px;
    color: ${({$textColor}) => $textColor};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmailInputWrapper  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
`;

const ErrorMessage = styled.p`
    font-size: 10px;
    color: #FF5151;
    margin-top: 5px;
`;