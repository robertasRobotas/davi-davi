import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled, { css } from "styled-components";
import { RightArrow } from "../assets/rightArrow";
import { LeftArrow } from "../assets/leftArrow";

export const CarouselWrapper =
  styled.div <
  any >
  `
  min-width: 375px;
`;

export const Wrapper =
  styled.div <
  any >
  `
  padding-top: 200px;
  color: ${(props) => props.color};
`;

export const ItemsWrapper =
  styled.div <
  any >
  `
  width: 100%;
  height: auto;
  min-height: 430px;

  background-color: ${(props) =>
    props.letterSpacing ? props.letterSpacing : " #dfe4ed"};

  padding-left: 80px;
  padding-right: 80px;
  padding-bottom: 40px;

  @media (max-width: ${(props) => props.mobileVersionMaxWidth}) {
    padding-left: 18%;
    padding-right: 18%;
  }
`;

export const ContentWrapper =
  styled.div <
  any >
  `
  max-width: 1400px;
  display: flex;
  gap: 3%;
  justify-content: center;
  margin: auto;

  @media (max-width: ${(props) => props.mobileVersionMaxWidth}) {
    display: grid;
  }
`;

export const PhotoWrapper =
  styled.div <
  any >
  `
  height: 0;
  width: 35%;
  order: 1;
  @media (max-width: 1000px) {
    width: 70%;
  }

  @media (max-width: ${(props) => props.mobileVersionMaxWidth}) {
    height: 400px;
    order: 2;
    width: 100%;
  }
`;

export const Photo =
  styled.div <
  any >
  `
  background-image: ${(props) => `url(${props.photoUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 500px;
  width: 100%;
  position: relative;
  bottom: 120px;

  @media (max-width: ${(props) => props.mobileVersionMaxWidth}) {
    height: 400px;
    bottom: 0;
  }
`;

export const TextWrapper =
  styled.div <
  any >
  `
  letter-spacing: ${(props) => props.letterSpacing};
  order: 2;

  @media (max-width: ${(props) => props.mobileVersionMaxWidth}) {
    order: 1;
  }
`;

export const Title =
  styled.div <
  any >
  `
  font-size: 40px;
  text-align: left;
  position: relative;
  bottom: 25px;
  left: 60px;
`;

export const ReviewText =
  styled.div <
  any >
  `
  width: auto;
  max-width: 800px;
  padding: 50px 30px;
  background: #fcfcfc;
  font-size: 20px;
  line-height: 1.8;
  margin-top: 30px;

  @media (max-width: ${(props) => props.mobileVersionMaxWidth}) {
    font-size: 17px;
  }
`;

export const RightArrowWrapper =
  styled.div <
  any >
  `
  z-index: 10;
  position: absolute;
  top: 60%;
  right: 40px;
  cursor: pointer;

  @media (max-width: ${(props) => props.mobileVersionMaxWidth}) {
    right: 20px;
  }
`;

export const LeftArrowWrapper =
  styled.div <
  any >
  `
  z-index: 10;
  position: absolute;
  top: 60%;
  left: 40px;
  cursor: pointer;

  @media (max-width: ${(props) => props.mobileVersionMaxWidth}) {
    left: 20px;
  }
`;

export const ReviewCard = ({
  reviewText,
  reviewerName,
  photo,
  color,
  letterSpacing,
  backgroundColor,
  mobileVersionMaxWidth,
}) => {
  return (
    <Wrapper color={color}>
      <ItemsWrapper
        backgroundColor={backgroundColor}
        mobileVersionMaxWidth={mobileVersionMaxWidth}
      >
        <ContentWrapper mobileVersionMaxWidth={mobileVersionMaxWidth}>
          <PhotoWrapper mobileVersionMaxWidth={mobileVersionMaxWidth}>
            <Photo
              photoUrl={photo}
              mobileVersionMaxWidth={mobileVersionMaxWidth}
            />
          </PhotoWrapper>
          <TextWrapper
            letterSpacing={letterSpacing}
            mobileVersionMaxWidth={mobileVersionMaxWidth}
          >
            <Title>{reviewerName}</Title>
            <ReviewText mobileVersionMaxWidth={mobileVersionMaxWidth}>
              {reviewText}
            </ReviewText>
          </TextWrapper>
        </ContentWrapper>
      </ItemsWrapper>
    </Wrapper>
  );
};

export const SimpleCarouselReviews = ({
  autoPlay,
  reviews,
  color,
  intervalTime,
  // rightArrowComponent,
  letterSpacing,
  backgroundColor,
  mobileVersionMaxWidth,
}) => {
  return (
    <CarouselWrapper>
      <Carousel
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
        autoPlay={autoPlay}
        interval={intervalTime}
        renderArrowPrev={(increment) => (
          <LeftArrowWrapper mobileVersionMaxWidth={mobileVersionMaxWidth}>
            <LeftArrow onClick={() => increment()} />
          </LeftArrowWrapper>
        )}
        renderArrowNext={(increment) => (
          <RightArrowWrapper mobileVersionMaxWidth={mobileVersionMaxWidth}>
            <RightArrow onClick={() => increment()} />
          </RightArrowWrapper>
        )}
      >
        {reviews.map((review) => (
          <ReviewCard
            key="x"
            reviewText={review.reviewText}
            reviewerName={review.reviewerName}
            photo={review.photo}
            color={color}
            backgroundColor={backgroundColor}
            letterSpacing={letterSpacing}
            mobileVersionMaxWidth={mobileVersionMaxWidth}
          />
        ))}
      </Carousel>
    </CarouselWrapper>
  );
};
