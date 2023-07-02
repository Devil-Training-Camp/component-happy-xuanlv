import styled from 'styled-components';

export const Widget = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  gap: 6px;

  > label:first-child {
    min-width: 100px;
    text-align: right;
  }
`;

export const PreviewBox = styled.div`
  padding: 20px 0;
`;

export const PerformanceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 8px;
`;

export const SectionBox = styled.div`
  margin-bottom: 12px;
`;

export const ButtonList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;
