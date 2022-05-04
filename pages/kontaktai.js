import { Navbar, Footer, EmailForm } from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";

const ContentWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 40% 40%;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 100px;

  paddin
`;
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ContactItems = styled.div`
  border-left: 1px solid black;
  height: 460px;
  padding: 40px;
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
`;

const submitButton = (
  <div
    style={{
      width: "100px",
      height: "30px",
      backgroundColor: "blue",
      color: "white",
    }}
  >
    Send
  </div>
);

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
  console.log("photo", photo);
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

      <ContentWrapper>
        <FormWrapper>
          <EmailForm
            isName={true}
            isEmail={true}
            isMessage={true}
            namePlaceholder={nameInputPlaceholder}
            emailPlaceholder={emailInputPlaceholder}
            messagePlaceholder={messageInputPlaceholder}
            isBorder={true}
            borderRadius="0"
            backgroundColor="red"
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
    </div>
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
