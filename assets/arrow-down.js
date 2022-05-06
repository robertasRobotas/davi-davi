import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  transition: 0.3s;
  height: 100px;
`;

const ImgWrapper = styled.div`
  position: relative;
  transition: 0.3s;
  top: 0;

  ${Wrapper}:hover & {
    top: 30px;
  }
`;

export default function ArrowDown({ onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <ImgWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23.616"
          height="13.503"
          viewBox="0 0 23.616 13.503"
        >
          <path
            id="Icon_ionic-ios-arrow-down"
            data-name="Icon ionic-ios-arrow-down"
            d="M18,20.679l8.93-8.937a1.681,1.681,0,0,1,2.384,0,1.7,1.7,0,0,1,0,2.391L19.2,24.258a1.685,1.685,0,0,1-2.327.049L6.68,14.14a1.688,1.688,0,0,1,2.384-2.391Z"
            transform="translate(-6.188 -11.246)"
            fill="#3e3e3e"
          />
        </svg>
      </ImgWrapper>
    </Wrapper>
  );
}
