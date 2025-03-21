"use client";

import styled from "styled-components";

export default function TitleInput() {
  return <InputBox placeholder="일기 제목을 입력하세요." />;
}

const InputBox = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #414142;
  color: #fff;
  padding-left: 15px;
  letter-spacing: -0.32px;
  outline: none;
  font-size: 13px;
  font-family: "pretendard";
`;
