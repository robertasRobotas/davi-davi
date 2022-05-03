import { Navbar, Button, Footer, Calendar } from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 110vh;
  background-color: #dfe4ed;
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

const PageText = styled.div`
  text-align: center;
  padding-top: 25px;
  padding-left: 30px;
  padding-right: 30px;
  line-height: 1.6;
`;

const Separator = styled.hr`
  text-align: center;
  margin-top: 25px;
  width: 200px;
`;

const CalendarWrapper = styled.div`
  display: grid;
  position: relative;
  bottom: 150px;
  grid-template-columns: 40% 40%;
  gap: 50px;
  justify-content: center;

  @media (max-width: 767px) {
    grid-template-columns: 90%;

`;

export default function Kalendorius({
  calendarPage: {
    pageTitle,
    pageStatement,
    pageText,
    bottomPhoto,
    calendar,
    navbar,
    footer,
  },
}) {
  console.log("navbar", navbar);

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
        <PageStatement>{pageStatement}</PageStatement>
        <PageText>{pageText}</PageText>
        <Separator />
      </HeaderWrapper>

      <CalendarWrapper>
        {calendar.map((date) => (
          <Calendar
            key={date.sys.id}
            type="availability-of-specific-month"
            displayYearMonth="2022-05"
            bookedDays={["2022-05-03", "2022-05-08", "2022-05-14"]}
            monthDayNames={["P", "A", "T", "K", "P", "Š", "S"]}
            isDisplaymonth={false}
            isDisplayYear={false}
            monthLinesNumber={6}
          />
        ))}
      </CalendarWrapper>
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

  const res = await client.getEntries({ content_type: "calendarPage" });
  console.log(res);

  return {
    props: {
      calendarPage: res.items[0].fields,
    },
  };
}
