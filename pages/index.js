import {
  Navbar,
  PhotoSlider,
  AboutUsSection,
  Footer,
  Button,
  PhotoLine,
} from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  padding-top: 240px;
  padding-bottom: 240px;
  padding-right: 20px;
  padding-left: 20px;
  color: #968068;
`;

const HeaderTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const HeaderTextWrapper = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 50px;
`;

const PhotoLineWrapper = styled.div`
  margin-bottom: 120px;
`;

export default function Home({
  mainPage: {
    headerPhotos,
    headerTitle,
    headerText,
    aboutMeTitle,
    aboutMeText,
    aboutMePhoto,
    footer,
    navbar,
  },
}) {
  const photoArray = headerPhotos.map((photo) => photo.fields.file.url);

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
      <PhotoSlider
        sliderHeight="calc(100vh - 100px)"
        photoSrcArray={photoArray}
        photoShowDurationSec={6}
        switcherColor="white"
      />
      <HeaderWrapper>
        <HeaderTitleWrapper>{headerTitle}</HeaderTitleWrapper>
        <HeaderTextWrapper>{headerText}</HeaderTextWrapper>
      </HeaderWrapper>

      <AboutUsSection
        type="simple-section"
        photo={aboutMePhoto.fields.file.url}
        title={aboutMeTitle}
        text={aboutMeText}
        mobileVersionMaxWidth="767px"
        backgroundColor="#DFE4ED"
        photoWidth="400px"
        photoHeight="600px"
      />

      <ButtonWrapper>
        <Button
          type="underlined-botton"
          mainColor="#707070"
          invertedColor="white"
          fontSize="16px"
          content="GALERIJA"
          width="125px"
          height="45px"
          onClick={() => console.log("c")}
        />
      </ButtonWrapper>
      <PhotoLineWrapper>
        <PhotoLine photoArray={photoArray} mobileVersionMaxWidth="767px" />
      </PhotoLineWrapper>

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

  const res = await client.getEntries({ content_type: "mainPage" });

  return {
    props: {
      mainPage: res.items[0].fields,
    },
  };
}
