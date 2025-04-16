"use client";

import styled from "styled-components";

interface HashBoardProps {
  icon?: string;
  contents?: string;
  tag?: string;
}

export default function HashBoard({ icon, contents, tag }: HashBoardProps) {
  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <Contents>{contents}</Contents>
      <TagWrapper>
        <Tag># {tag}</Tag>
      </TagWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 115px;
  min-width: 115px;
  height: 100%;
  border-radius: 10px;
  background-color: #242424;
  border: 1px solid #414142;
  padding: 18px 16px;
`;

const Icon = styled.div`
  width: 20px;
  height: 4px;
  font-size: 14px;
`;

const Contents = styled.div`
  font-size: 14.5px;
  color: white;
  font-weight: 700;
  height: 50px;
  line-height: 20px;
  margin-top: 2px;
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #414142;
  border-radius: 30px;
  height: 20px;
`;

const Tag = styled.div`
  font-size: 10px;
  color: white;
`;
