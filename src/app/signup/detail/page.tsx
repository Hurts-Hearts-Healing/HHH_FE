"use client"

import styled from "styled-components"
import Image from "next/image";
import Logo from "../../../assets/imgs/logo.svg";
import { useState, useEffect } from "react";
import BottomSheet from "@/components/auth/bottomSheet";
import AuthButton from "@/components/auth/button";
import ProgressBar from "@/components/progressBar";
import { format, parse } from "date-fns";
import { useSearchParams } from "next/navigation";
import { signUp } from "@/apis/auth";
import { useRouter } from "next/navigation";

export default function SignUpDetail() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const name = searchParams.get('name') ?? '';
    const email = searchParams.get('email') ?? '';
    const birthday = searchParams.get('birthday') ?? '';
    const password = searchParams.get('password') ?? '';

    const [percent, setPercent] = useState<number>(0);
    const [breakUpDate, setBreakUpDate] = useState<string | null>(null);
    const [isPartingActive, setIsPartingActive] = useState<boolean | null>(null);
    
    useEffect(() => {
        setIsPartingActive(false);
    }, []);

    if (isPartingActive === null) {
        return null;
    }

    const formatBreakUpDate = (breakUpDate: string): string => {
        const parsed = parse(breakUpDate, "yyyy년 M월 d일", new Date());
        return format(parsed, "yyyy-MM-dd");
    };

    const getStateMessage = (percent: number) => {
        if (percent === 100) return "완벽히 회복했어요 😊";
        if (percent >= 90) return "거의 다 회복했어요 🙂";
        if (percent >= 60) return "힘들지만 조금씩 나아지고 있어요 🙃";
        if (percent >= 30) return "아직은 슬퍼요 😢";
        return "많이 힘들어요 😭";
    }

    const handleSignUp = async () => {
        if (!breakUpDate || !percent) {
          console.log('모든 항목을 입력해주세요');
          return;
        }
    
        try {
          await signUp({
            name,
            email,
            birthday,
            password,
            breakupDate: formatBreakUpDate(breakUpDate),
            emotionStatus: percent, 
          });
          router.push('/login')
        } catch (error) {
          console.error(error);
          alert('오류가 발생했습니다.');
        }
      };

    return (
        <Wrapper>
            <Image src={Logo} alt="HHH" style={{width: 75, marginTop: 117}}/>
            <InputsWrapper>
                <InputWrapper>
                    <Label>
                        <p className="color">언제 이별</p>
                        <p>하셨나요?</p>
                    </Label>
                    <PartingInput
                        $hasPartingSelect={!!breakUpDate}
                        $isPartingActive={isPartingActive} 
                        onClick={() => setIsPartingActive(true)} 
                        tabIndex={0}
                    >
                        {breakUpDate ?? '날짜 선택하기'}
                    </PartingInput>
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        <p className="color">나의 상태</p>
                        <p>는</p>
                    </Label>
                    <ProgressBarWrapper>
                        <ProgressBar percent={percent} setPercent={setPercent}/>
                        <StateWrapper>
                            <p className="percent">{percent}%</p>
                            <p>{getStateMessage(percent)}</p>
                        </StateWrapper>
                    </ProgressBarWrapper>
                </InputWrapper>
            </InputsWrapper>
            <ButtonWrapper>
                <AuthButton onClick={handleSignUp} text="회원가입"/>
            </ButtonWrapper>
            {isPartingActive && <BottomSheet onSelectDate={(date) => setBreakUpDate(date)} onClose={() => setIsPartingActive(false)}/>}
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

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 45px;
    gap: 50px;
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    .color {
        color: #18E7C1;
    }
`;

const InputWrapper =styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PartingInput = styled.div<{$isPartingActive: boolean, $hasPartingSelect: boolean}>`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #414142;
    font-size: 13px;
    height: 40px;
    padding-left: 15px;
    border-radius: 5px;
    color: rgba(255, 255, 255, 0.5);
    color: ${({$hasPartingSelect}) => ($hasPartingSelect ? 'white' : 'rgba(255, 255, 255, 0.5)')};
    border: ${({ $isPartingActive }) => ($isPartingActive ? "1px solid #18E7C1" : "")};
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

const ProgressBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const StateWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    > p {
        font-size: 12px;
    }
    .percent {
        color: #18E7C1;
        font-weight: 600;
    }
`;