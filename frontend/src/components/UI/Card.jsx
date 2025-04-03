import React from 'react';
import styled from 'styled-components';

const Card = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-content">{children}</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .card {
    position: relative;
    width: 450px;
    padding: 5px;
    background: linear-gradient(135deg,#c85ec7, #6a82fb, #ff7eb3, #ff758c ); /* Mixed gradient */
    color: #fff;
    box-shadow: 0 0 15px 5px rgba(255, 126, 179, 0.6), /* Pink glow */
                0 0 25px 10px rgba(200, 94, 199, 0.5), /* Purple glow */
                0 0 35px 15px rgba(106, 130, 251, 0.4); /* Blue glow */
    border-radius: 10px;
    text-align: center;
  }

  .card-content {
    position: relative;
    z-index: 1;
  }
`;

export default Card;
