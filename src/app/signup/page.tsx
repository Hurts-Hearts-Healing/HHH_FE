"use client"

import styled from "styled-components"
import AuthInput from "@/components/auth/input"
import AuthButton from "@/components/auth/button"
import Image from "next/image"
import Logo from "../../assets/imgs/logo.svg";
import BottomSheet from "@/components/auth/bottomSheet"
import { useState, useEffect } from "react"
import { format, parse } from "date-fns";
import { useRouter } from "next/navigation"
import { matchVerificationNumber, requestVerificationNumber } from "@/apis/auth"

type EmailStatus = 'INITIAL' | 'READY' | 'WAITING' | 'RESEND';
// INITIAL: 이메일 작성 전 상태
// READY: 이메일 작성 후 상태
// WAITING: 인증 버튼 누르고 60초 지나기 전 상태
// RESEND: 인증 버튼 누르고 60초 뒤 상태 (재전송)

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [verificationNumber, setVerificationNumber] = useState<string>("");
    const [birthday, setBirthday] = useState<string | null>(null);
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string | null>(null);
    const [verificationError, setVerificationError] = useState<boolean>(false);
    const [status, setStatus] = useState<EmailStatus>('INITIAL');
    const [timer, setTimer] = useState<number>(60);
    const [isBirthdayActive, setIsBirthdayActive] = useState<boolean | null>(null);
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/

    const formatBirthday = (birthday: string): string => {
        const parsed = parse(birthday, "yyyy년 M월 d일", new Date());
        return format(parsed, "yyyy-MM-dd");
    };

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
        console.log(birthday);
    }, [birthday])

    useEffect(() => {
        setIsBirthdayActive(false);
    }, []);

    if (isBirthdayActive === null) {
        return null;
    }



    const handleNextClick = () => {
        if (!name || !birthday || !email || !password) {
          console.log('모든 정보를 입력하지 않음');
          return;
        }
      
        const formattedBirthday = formatBirthday(birthday);
        const queryString = new URLSearchParams({
          name,
          email,
          birthday: formattedBirthday,
          password,
        }).toString();
      
        router.push(`/signup/detail?${queryString}`);
      };

      const handleEmailButtonClick = async () => {
        if (status === "READY" || status === "RESEND") {
          try {
            console.log("요청 보내기 전");
            await requestVerificationNumber(email);
            console.log("요청 성공");
            setStatus("WAITING");
          } catch (error) {
            console.log("요청 실패", error);
          }
        }
      };

    const handleVerifyButtonClick = async () => {
        try {
            const res = await matchVerificationNumber({
                email,
                verifyCode: verificationNumber,
            });

            if (res.data === true) {
                console.log('인증 성공')
                setVerificationError(false);
            } else {
                console.log('인증 실패')
                setVerificationError(true);
            }
            
        } catch (error) {
            console.log('서버오류: ', error)
        }
    }

    return (
        <Wrapper>
            <Image src={Logo} alt="HHH" style={{width: 75, marginTop: 117}}/>
            <InputWrapper>
                <AuthInput value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요"/>

                <EmailWrapper>
                    <EmailInputWrapper>
                        <EmailInput value={email} onChange={handleEmailChange} type="email" placeholder="이메일을 입력하세요"/>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </EmailInputWrapper>
                    <EmailButton $textColor={getTextColor()} $bgColor={getButtonColor()} onClick={handleEmailButtonClick} disabled={isDisabled} >{getButtonText()}</EmailButton>
                </EmailWrapper>

                <EmailWrapper>
                    <EmailInputWrapper>
                        <VerificationNumberInput value={verificationNumber} onChange={(e) => setVerificationNumber(e.target.value)} type="text" placeholder="이메일 인증 번호를 입력하세요"/>
                        {verificationError && <ErrorMessage>이메일 인증 번호가 맞지 않습니다</ErrorMessage>}
                    </EmailInputWrapper>
                    <VerificationNumberButton onClick={handleVerifyButtonClick}>확인</VerificationNumberButton>
                </EmailWrapper>

                <BirthdayInput
                    $hasBirthdaySelect={!!birthday}
                    $isBirthdayActive={isBirthdayActive} 
                    onClick={() => setIsBirthdayActive(true)} 
                    tabIndex={0}    
                >
                    {birthday ?? '생일을 입력하세요'}
                </BirthdayInput>
                <AuthInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="비밀번호를 입력하세요"/>
            </InputWrapper>
            <ButtonWrapper>
                <AuthButton text="다음" onClick={handleNextClick}/>
            </ButtonWrapper>
            {isBirthdayActive && <BottomSheet onSelectDate={(date) => setBirthday(date)} onClose={() => setIsBirthdayActive(false)}/>}
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

const BirthdayInput = styled.div<{$isBirthdayActive: boolean, $hasBirthdaySelect: boolean}>`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #414142;
    font-size: 13px;
    height: 40px;
    padding-left: 15px;
    border-radius: 5px;
    /* color: rgba(255, 255, 255, 0.5); */
    color: ${({$hasBirthdaySelect}) => ($hasBirthdaySelect ? 'white' : 'rgba(255, 255, 255, 0.5)')};
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

const VerificationNumberInput = styled.input`
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

const VerificationNumberButton = styled.button`
    width: 75px;
    height: 40px;
    background-color: #18E7C1;
    border-radius: 5px;
    border: none;
    font-size: 13px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;