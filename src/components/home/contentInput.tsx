"use client";

import styled from "styled-components";

interface ContentInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ContentInput({ value, onChange }: ContentInputProps) {
  return (
    <InputBox
      placeholder="오늘의 감정을 기록하세요."
      value={value}
      onChange={onChange}
    />
  );
}

const InputBox = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: none;
  background-color: #414142;
  color: #fff;
  padding: 15px 15px 15px 15px;
  letter-spacing: -0.32px;
  resize: none;
  outline: none;
  font-size: 13px;
  font-family: "pretendard";
  box-sizing: border-box;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  &:focus {
    border: 1px solid #18e7c1;
  }
`;
