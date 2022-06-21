import { Navbar, Footer, GalleryItems } from "r-componentsxxxxxxxxxxx";
import logo from "../../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";

const Title = styled.div`
  font-size: 34px;
  text-align: center;
  font-weight: 200;
  color: #3e3e3e;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const Paragraph = styled.div`
  max-width: 900px;
  width: 60%;
  text-align: center;
  margin: auto;
  margin-bottom: 100px;
  letter-spacing: 1px;
  line-height: 1.8;
`;

const Loader = styled.div`
  height: 1px;
  width: 1px;
  opacity: 0;
  background-image: ${(props) => `url(${props.coloredPhoto})`};
`;

const Image = styled.img`
  max-height: 600px;
`;

const GalleryWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

export default function Galerija({ galleryPage, navbar, footer }) {
  console.log("galleryPage", galleryPage.paragraph.content);
  const photos = galleryPage.photos.map((photo) => {
    return { src: photo.fields.file.url };
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

      <Title>{galleryPage.title}</Title>

      <Paragraph>
        {galleryPage.paragraph.content.map((text) => {
          return (
            <>
              <>{text.content[0].value}</>
              <br />
            </>
          );
        })}
      </Paragraph>

      <GalleryWrapper>
        {photos.map((photo, id) => {
          return (
            <>
              <Image src={photo.src} />
            </>
          );
        })}
      </GalleryWrapper>

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

export async function getStaticPaths(slug) {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export async function getStaticProps({ params }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntry(params.fotosesija);

  const res2 = await client.getEntry("6UUZJM35uQvOMGLn0UO9MD");

  return {
    props: {
      galleryPage: res.fields,
      navbar: res2.fields.navbar,
      footer: res2.fields.footer,
    },
  };
}
