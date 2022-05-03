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

const PageTitle = styled.div`
  text-align: center;
  padding-top: 100px;
  padding-left: 30px;
  padding-right: 30px;
`;

const PageStatement = styled.div`
  text-align: center;
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 30px;
`;

const HeaderWrapper = styled.div`
  height: 800px;
`;

const Separator = styled.hr`
  text-align: center;
  margin-top: 25px;
  width: 200px;
`;

export default function Offers({
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

      <HeaderWrapper>
        <PageTitle></PageTitle>
        <PageStatement></PageStatement>
        <Separator />
      </HeaderWrapper>
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
