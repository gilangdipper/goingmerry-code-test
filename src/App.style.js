import styled from 'styled-components';

export const BodyWrapper = styled.div`
	width: 100%;
	max-width: 768px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	font-size: 18px;
`;

export const LeftWrapper = styled.div`
  flex: 50%;
  padding: 0 10px;
  border-right: 1px solid #e8e8e8;
	margin: 20px 0;
	
	.ant-form {
		label {
			font-size: 16px;
		}
	}
`;

export const RightWrapper = styled.div`
  flex: 50%;
  padding: 0 10px;
  margin: 20px 0;
`;

export const Counter = styled.div`
	font-size: 34px;
	font-weight: 700;
	color: #1890ff;
`;

export const TimeWrapper = styled.div`
	span {
		font-size: 18px;
		&:nth-child(2) {
			font-weight: 700;
			font-style: italic;
			color: #1890ff;
    }
	}
`;
