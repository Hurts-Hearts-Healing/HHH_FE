"use client"

import styled from "styled-components"
import Image from "next/image";
import Warning from "../assets/imgs/mypage/warning.svg";

interface ModalProps {
    onClose: () => void;
}

export default function Modal({onClose}: ModalProps) {
    return (
        <ModalWrapper>
           <Wrapper>
                <Image src={Warning} alt="경고" />
                <TextWrapper>
                    <p>계정을 삭제하시겠습니까?</p>
                    <span>복구가 불가능합니다</span>
                </TextWrapper>
                <ButtonWrapper>
                    <CancelButton onClick={onClose}>취소</CancelButton>
                    <CheckButton>확인</CheckButton>
                </ButtonWrapper>
           </Wrapper>
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    z-index: 1000;
    padding: 30px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    /* height: 194px; */
    background-color: #242424;
    border-radius: 10px;
    justify-content: center;
    flex-direction: column;
    padding: 21px;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    margin-top: 15px;
    > p {
        font-weight: 600;
        font-size: 18px;
    }
    > span {
        font-weight: 400;
        font-size: 14px;
        color: rgba(255,255,255,0.5);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top: 25px;
`;

const CancelButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #414142;
    color: white;
    border-radius: 5px;
    width: 45%;
    height: 31px;
    font-size: 14px;
`;

const CheckButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #FF5151;
    color: white;
    border-radius: 5px;
    width: 45%;
    font-size: 14px;
    height: 31px;
`;