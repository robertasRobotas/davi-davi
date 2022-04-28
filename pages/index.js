import { Navbar, PhotoSlider } from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";

export default function Home({
  mainPage: {
    headerPhotos,
    headerTitle,
    headerText,
    aboutMeTitle,
    aboutMeText,
  },
}) {
  console.log(headerPhotos);

  const photoArray = headerPhotos.map((photo) => photo.fields.file.url);
  const oneDimentionalMenuLinks = [
    { title: "GALERIJA", link: "/galerija" },
    { title: "PASIŪLYMAI", link: "/pasiūlymai" },
    { title: "KALENDORIUS", link: "/kalendorius" },
    { title: "KONTAKTAI", link: "/kontaktai" },
  ];

  return (
    <div>
      <Navbar
        type="logo-middle-navbar"
        oneDimentionalMenuLinks={oneDimentionalMenuLinks}
        maxWidth={"1200px"}
        mobileVersionMaxWidth="767px"
        backgroundColor="#f2f2f2"
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
