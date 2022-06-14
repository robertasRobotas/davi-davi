import { Navbar, Footer, Button } from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";

export default function navbar({
  mainPage: {
    headerPhotos,
    headerTitle,
    headerText,
    aboutMeTitle,
    aboutMeText,
    aboutMePhoto,
  },
}) {
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
        logoSrc={logo.src}
        logoWidthPx={280}
        minWebsiteWidth="400px"
        fontSize="16px"
      />
      <Footer
        type="logo-contacts-footer"
        socialMedia={socialMedia}
        maxWidth="1200px"
        mobileVersionMaxWidth="767px"
        backgroundColor="#DFE4ED"
        logoSrc={logo.src}
        logoWidthPx={200}
        fontSize="16px"
        email="davidavi.morta@gmail.com"
        phoneNumber="+370 607 58455"
        copyRight="© davidavi 2022"
        minWebsiteWidth={"375px"}
        color="#3E3E3E"
        socialHoverColor="#6e6e6e"
        letterSpacing="2px"
      />
      <div>
        {" "}
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
      </div>
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
