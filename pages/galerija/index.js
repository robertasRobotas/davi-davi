import { Navbar, Footer, ReviewCards } from "r-componentsxxxxxxxxxxx";
import logo from "../../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";

const CategoriesWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 40% 40%;
  justify-content: center;
  margin: auto;
  margin-bottom: 100px;
  margin-top: 100px;
  min-width: 375px;
  max-width: 1200px;

  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;

  @media (max-width: 767px) {
    grid-template-columns: 80%;
  }
`;

const CategoryPhoto = styled.div`
  position: relative;
  left: 60px;
  top: 60px;

  background-image: ${(props) => `url(${props.uncoloredPhoto})`};

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: 0.3s;

  width: 280px;
  height: 200px;

  &:hover {
    background-image: ${(props) => `url(${props.coloredPhoto})`};
  }
`;

const Title = styled.div`
  font-size: 34px;
  text-align: center;
  font-weight: 200;
  color: #3e3e3e;
`;

const ReviewWrapper = styled.div`
  font-weight: 200;
`;

const CategoryWrapper = styled.div`
  width: 320px;
  height: 320px;
  background-image: ${(props) => `url(${props.coloredPhoto})`};

  background-image: ${(props) => `url(${props.background})`};

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &:hover ${CategoryPhoto} {
    background-image: ${(props) => `url(${props.coloredPhoto})`};
  }
`;

const Loader = styled.div`
  height: 1px;
  width: 1px;
  opacity: 0;
  background-image: ${(props) => `url(${props.coloredPhoto})`};
`;

export default function Galerija({
  galleryPage: { categories, footer, navbar, reviewTitle, reviews },
}) {
  console.log(reviews);

  const selectableCategories = categories.map((category) => {
    return {
      backgroundPhoto: category.fields.backgroundPhoto.fields.file,
      coloredPhoto: category.fields.coloredPhoto.fields.file,
      uncoloredPhoto: category.fields.uncoloredPhoto.fields.file,
    };
  });

  const reviewsTransformet = reviews.map((review) => {
    return {
      photo: review.fields.reviewPhoto.fields.file.url,
      reviewerName: review.fields.reviewTitle,
      reviewText: review.fields.reviewText.content[0].content[0].value,
    };
  });

  console.log("selectableCategories", selectableCategories);

  return (
    <div>
      <Navbar
        type="logo-middle-navbar"
        oneDimentionalMenuLinks={navbar.fields.navbarConfig}
        maxWidth={"1200px"}
        mobileVersionMaxWidth="767px"
        logoSrc={logo.src}
        logoWidthPx={240}
        minWebsiteWidth="400px"
        fontSize="16px"
      />

      <CategoriesWrapper>
        {selectableCategories.map((category, index) => (
          <a key={index} href="#">
            <Loader coloredPhoto={category.coloredPhoto.url} />

            <CategoryWrapper
              background={category.backgroundPhoto.url}
              coloredPhoto={category.coloredPhoto.url}
            >
              <CategoryPhoto
                uncoloredPhoto={category.uncoloredPhoto.url}
                coloredPhoto={category.coloredPhoto.url}
              ></CategoryPhoto>
            </CategoryWrapper>
          </a>
        ))}
      </CategoriesWrapper>

      <Title>{reviewTitle}</Title>
      <ReviewWrapper>
        <ReviewCards
          type="simple-carousel-review"
          reviews={reviewsTransformet}
          mobileVersionMaxWidth="767px"
          backgroundColor="#DFE4ED"
          minWebsiteWidth={"375px"}
          color="#3E3E3E"
          letterSpacing="2px"
          intervalTime={6000}
          autoPlay={true}
        />
      </ReviewWrapper>
      <Footer
        type="logo-contacts-footer"
        socialMedia={footer.fields.socialMedia}
        maxWidth="1200px"
        mobileVersionMaxWidth="767px"
        backgroundColor="#DFE4ED"
        logoSrc={logo.src}
        logoWidthPx={200}
        fontSize="16px"
        email={footer.fields.email}
        phoneNumber={footer.fields.phoneNumber}
        copyRight={footer.fields.copyMark}
        minWebsiteWidth={"375px"}
        color="#3E3E3E"
        socialHoverColor="#6e6e6e"
        letterSpacing="2px"
      />
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "galleryPage" });

  return {
    props: { galleryPage: res.items[0].fields },
  };
}
