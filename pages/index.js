import {
  Navbar,
  PhotoSlider,
  AboutUsSection,
  Footer,
} from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
  color: #968068;
`;

const HeaderTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const HeaderTextWrapper = styled.div`
  text-align: center;
`;

export default function Home({
  mainPage: {
    headerPhotos,
    headerTitle,
    headerText,
    aboutMeTitle,
    aboutMeText,
    aboutMePhoto,
  },
}) {
  const photoArray = headerPhotos.map((photo) => photo.fields.file.url);
  const oneDimentionalMenuLinks = [
    { title: "GALERIJA", link: "/galerija" },
    { title: "PASIŪLYMAI", link: "/pasiūlymai" },
    { title: "KALENDORIUS", link: "/kalendorius" },
    { title: "KONTAKTAI", link: "/kontaktai" },
  ];

  const socialMedia = [
    { type: "facebook", link: "https://www.facebook.com/home.php" },
    { type: "instagram", link: "https://www.instagram.com/" },
    { type: "gmail", link: "https://mail.google.com/mail/u/0/#inbox" },
  ];

  return (
    <div>
      <Navbar
        type="logo-middle-navbar"
        oneDimentionalMenuLinks={oneDimentionalMenuLinks}
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
        title="LABAS!"
        text={`esu Morta ir savo mylimo vyro dėka tapau davidavi (-čiene). 

        Meilė fotografijai atsirado visai nejučia nuo pat mažų dienų, kai sekiodavau tėtį, kad jam įamžinus šeimą, būčiau pirmoji jį pakeisianti fotografė. Be viso to, nevengiau ir sunkaus darbo – trikojo nešiojimo. (: 
       Paauglystėje kone puse vakarų baigdavosi žiūrint šeimos albumus ir skaitmenines galerijas. Tai galiausiai išsirutuliojo į troškimą pačiai įamžinti savo ir artimųjų gyvenimą.
        Nors, rodos, viskas nuo pat mažų dienų vedė link ten, kur esu dabar, vis dėlto tik studijų laikais galutinai susivokiau, kad fotografija yra tai, kas įkvepia ir kam noriu skirti savo jėgas ir laiką.
      Tad šiandien esu ne tik diplomuota, bet ir 5 metus savo darbu besimėgaujanti fotografė.
       Esu iš Vilniaus, bet atvyksiu visur, kur tik pasikviesi švęsti Tavo gyvenimą kartu! 
      Kai šypsenos platės ir ašaros riedės, būsiu šalia ir visa tai įamžinsiu..!`}
        mobileVersionMaxWidth="767px"
        backgroundColor="#DFE4ED"
        photoWidth="400px"
        photoHeight="600px"
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
