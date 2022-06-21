import {
  Navbar,
  Footer,
  EmailForm,
  SocialIcons,
} from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: rgba(233, 235, 240, 0.3);
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 40% 40%;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 100px;

  @media (max-width: 767px) {
    grid-template-columns: 80%;
  }
`;
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 450px;
  float: right;
  order: 1;
  margin-left: auto;

  @media (max-width: 1150px) {
    width: 100%;
  }

  @media (max-width: 767px) {
    order: 2;
  }
`;
const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid black;
  height: 460px;
  padding: 40px;
  order: 2;

  @media (max-width: 767px) {
    order: 1;
    border-left: none;
    text-align: center;
    height: 260px;
  }
`;

const InfoLine = styled.div`
  color: #968068;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const PhotoWrapper = styled.div`
  width: 80%;
  margin: auto;

  margin-bottom: 100px;
`;

const Photo = styled.div`
  height: 500px;
  background-image: ${(props) => `url(${props.photoUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Button = styled.div`
  display: flex;
  width: 120px;
  height: 40px;
  border: 1px solid #968068;
  color: #968068;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  &:hover {
    background-color: #968068;
    color: white;
  }
`;

const SocialWrapper = styled.div`
  width: 80px;

  @media (max-width: 767px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const submitButton = <Button>Send</Button>;

export default function Offers({
  contactsPage: {
    buttonText,
    email,
    emailInputPlaceholder,
    facebookLink,
    footer,
    instagramLink,
    messageInputPlaceholder,
    nameInputPlaceholder,
    navbar,
    phoneNumber,
    photo,
  },
}) {
  const socialMedia = [
    { type: "facebook", link: "https://www.facebook.com/home.php" },
    { type: "instagram", link: "https://www.instagram.com/" },
  ];
  console.log("photo", photo);
  return (
    <Wrapper>
      <Navbar
        type="logo-middle-navbar"
        oneDimentionalMenuLinks={navbar.fields.navbarConfig}
        maxWidth={"1200px"}
        mobileVersionMaxWidth="767px"
        logoSrc={logo.src}
        logoWidthPx={240}
        minWebsiteWidth="400px"
        fontSize="16px"
        backgroundColor="#f8f9fa"
      />

      <ContentWrapper>
        <FormWrapper>
          <EmailForm
            isName={true}
            isEmail={true}
            isMessage={true}
            namePlaceholder={nameInputPlaceholder}
            emailPlaceholder={emailInputPlaceholder}
            messagePlaceholder={messageInputPlaceholder}
            isBorder={false}
            borderRadius="0"
            backgroundColor="white"
            leftRightPadding="12px"
            topBottomPadding="20px"
            gap="20px"
            submitButtonGap="30px"
            inputHeight="20px"
            textAreaHeight="200px"
            submitButton={submitButton}
            submitButtonAlignSide="right"
            your_service_id="service_n4iyfx2"
            your_template_id="template_f698z1l"
            your_user_id="qRe2HEfUlaZpOwGCy"
            messageSendSuccessfully="Send Successfully"
            messageFillAllFields="Fill all field"
            messageUnnexpectedSendIssue="Something happened, please try later"
          />
        </FormWrapper>
        <ContactItems>
          <InfoLine>{phoneNumber}</InfoLine>
          <InfoLine>{email}</InfoLine>
          <SocialWrapper>
            <SocialIcons
              width="20px"
              height="20px"
              socialMedia={socialMedia}
              color="#968068"
            />
          </SocialWrapper>
        </ContactItems>
      </ContentWrapper>
      <PhotoWrapper>
        <Photo photoUrl={photo.fields.file.url} />
      </PhotoWrapper>

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
    </Wrapper>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "contactsPage" });

  return {
    props: {
      contactsPage: res.items[0].fields,
    },
  };
}
