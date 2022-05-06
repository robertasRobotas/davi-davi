import { Navbar, Footer, ServiceCards } from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";
import ArrowDown from "../assets/arrow-down";
import { useRef } from "react";

const HeaderWrapper = styled.div`
  height: 90vh;
`;

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

const ServiceStatement = styled.div`
  text-align: center;
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 800px;
  margin: auto;
  line-height: 1.8;
  margin-bottom: 100px;
`;

const Separator = styled.hr`
  text-align: center;
  margin-top: 25px;
  width: 200px;
`;

const WeddingWrapper = styled.div``;

const OtherWrapper = styled.div`
  margin-bottom: 100px;
`;

export default function Offers({
  offerPage: {
    pageTitle,
    pageText,
    wedingTitle,
    weddingText,
    weddingOffers,
    otherOffers,
    footer,
    navbar,
    familiesText,
    familiesTitle,
  },
}) {
  const myRef = useRef(null);

  const executeScroll = () => {
    myRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log(myRef);
  };

  const modifiedWeddingOffers = weddingOffers.map((offer) => {
    return {
      price: offer.fields.offerTitle,
      services: offer.fields.statement,
      photo: offer.fields.offerPhoto.fields.file.url,
    };
  });

  const modifiedOtherOffers = otherOffers.map((offer) => {
    return {
      price: offer.fields.offerTitle,
      services: offer.fields.statement,
      photo: offer.fields.offerPhoto.fields.file.url,
    };
  });

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
        <PageTitle>{pageTitle}</PageTitle>
        <PageStatement>{pageText.content[0].content[0].value}</PageStatement>
        <PageStatement>{pageText.content[1].content[0].value}</PageStatement>

        <Separator />
        <ArrowDown onClick={executeScroll} />
      </HeaderWrapper>
      <WeddingWrapper ref={myRef}>
        <PageTitle>{wedingTitle}</PageTitle>
        <ServiceStatement>
          {weddingText.content[0].content[0].value}
        </ServiceStatement>
        <ServiceCards
          type="simple-card"
          cardsArray={modifiedWeddingOffers}
          mobileVersionMaxWidth="767px"
          backgroundColor="#DFE4ED"
        />
      </WeddingWrapper>
      <OtherWrapper>
        <PageTitle>{familiesTitle}</PageTitle>
        <ServiceStatement>
          {familiesText.content[0].content[0].value}
        </ServiceStatement>
        <ServiceCards
          type="reverse-simple-card"
          cardsArray={modifiedOtherOffers}
          mobileVersionMaxWidth="767px"
          backgroundColor="#DFE4ED"
        />
      </OtherWrapper>

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

  const res = await client.getEntries({ content_type: "offerPage" });

  return {
    props: {
      offerPage: res.items[0].fields,
    },
  };
}
