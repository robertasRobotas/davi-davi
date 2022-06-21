import { Navbar, Footer, GalleryItems } from "r-componentsxxxxxxxxxxx";
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
  margin-top: 100px;
  margin-bottom: 100px;
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

export default function Galerija({
  galleryPage: { navbar, footer, categoryTitle, categoryPhotoItems },
}) {
  console.log("categoryPhotoItems", categoryPhotoItems);

  const galeryItems = categoryPhotoItems.map((item) => {
    return {
      title: item.fields.title,
      photo: item.fields.mainPhotoColor.fields.file.url,
      onClickLink: item.sys.id,
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

      <Title>{categoryTitle}</Title>

      <GalleryItems
        type="simple-items-changing-sides"
        itemsArray={galeryItems}
        buttonContent="Žiūreti"
        backgroundHoverColor="#DFE4ED"
        buttonColor="#BCA183"
        mobileVersionMaxWidth="767px"
        color="#707070"
      />

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

export async function getStaticProps(params) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  console.log("params", params);

  const res = await client.getEntry("1YQ4Z6isWURuRE8fH3nVW4");

  return {
    props: { galleryPage: res.fields },
  };
}
