import { Navbar, Button, Footer, Calendar } from "r-componentsxxxxxxxxxxx";
import logo from "../assets/davidavi-logo-black.png";
import { createClient } from "contentful";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 1200px;
  background-color: #dfe4ed;
`;

const PageTitle = styled.div`
  text-align: center;
`;

const PageStatement = styled.div`
  text-align: center;
`;

const PageText = styled.div`
  text-align: center;
`;

const Separator = styled.hr`
  text-align: center;
`;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 30px;
  justify-content: center;
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
  console.log("calendar", calendar);
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
