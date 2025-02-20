import React from 'react';
import { Link } from 'react-router-dom';


import person2 from '../assets/scholarship/person2.jpg';
import person3 from '../assets/scholarship/person3.jpg';
import person8 from '../assets/scholarship/person8.jpg'
import person7 from '../assets/scholarship/person7.jpg';
import person9 from '../assets/scholarship/person9.jpg';
import blog from '../assets/scholarship/blog.jpg';
import about from '../assets/scholarship/about (1).jpg'
import about2 from '../assets/scholarship/about2.jpg'
import about3 from '../assets/scholarship/about3.jpg'
import FadeIn from '../FadeIn';

const Scholarship = () => {
  return (
    <>

      <div style={styles.container}>
        {/* Header Section */}
        <header style={styles.header}>
          <img
            src={person2}
            alt="Graduation"
            style={styles.headerImage}
          />
         
          <div style={styles.headerText}>
              <FadeIn delay={0.4} direction="up">
                <h6>Your guide to navigating student finances</h6>
              </FadeIn>
              <p>1 million+ students helped</p>
              <p>10,000+ scholarships awarded</p>
         
          </div>

        
         
        </header>

        {/* Info Boxes Section */}
        <FadeIn delay={0.4} direction="down">
          <div style={styles.infoBoxes}>
            <div style={styles.infoBox}>
              <p>Eligibility criteria</p>
              <p>willing to the criteria for the scholarship program?</p>
              <p>the link below will assist you on that</p>
              <Link><button style={{border: "1px solid black", padding:"2%"}}>Read more</button></Link>
            </div>
            <div style={styles.infoBoxHighlighted}>
              <p>How to apply</p>
              <p>there are several scholarship available for the candidate willing to study abroad</p>
              <p>kindly use the link below to access some of the websites for the scholarships</p>
              <Link><button style={{border: "1px solid black", padding:"2%"}}>Read more</button></Link>
            </div>
            <div style={styles.infoBox}>
              <p>Scholarship FAQs</p>
              <p>Do you have any question about the scholarship</p>
              <p>Or you are willing to know those who can apply for the scholarship</p>
              <Link><button style={{border: "1px solid black", padding:"2%"}}>Read more</button></Link>
            </div>
          </div>
        </FadeIn>

        {/* Main Content Section */}
        <main style={styles.mainContent}>
          <p>
          Scholarships provide financial assistance to students, 
          enabling them to pursue higher education without the burden 
          of tuition fees. These awards can be merit-based, recognizing 
          academic achievements, or need-based, supporting those from low-income 
          backgrounds. Scholarships can cover various expenses, including tuition,
           books, and living costs. They open doors to educational opportunities that 
           might otherwise be inaccessible, fostering diversity and inclusion. By reducing 
           financial barriers, scholarships empower students to focus on their studies and 
           achieve their academic and career goals. For many, receiving a scholarship is a pivotal 
           step towards a brighter future.
          </p>
        </main>

        {/* What's New Section */}
        <section style={styles.whatsNew}>
          <h2 style={{textAlign:"center"}}>What's New</h2>
          <div style={styles.cards}>
            <div style={styles.card}>
              <img
                src={person3}
                alt="Card 1"
                style={styles.cardImage}
              />
              <p>New scholarship opportunities</p>
            </div>
            <div style={styles.card}>
              <img
                src={person8}
                alt="Card 2"
                style={styles.cardImage}
              />
              <p>Recent scholarship winners</p>
            </div>
            <div style={styles.card}>
              <img
                src={person7}
                alt="Card 3"
                style={styles.cardImage}
              />
              <p>How to improve your application</p>
            </div>
          </div>
        </section>

        {/* Apply for Scholarships Section */}
        <section style={styles.applySection}>
          <h1 style={{textAlign:"center"}}>Apply for masters</h1>
          <h2>A master’s degree is an advanced academic qualification that follows the
             completion of a bachelor's degree. It offers specialized knowledge and skills
              in a particular field, enabling students to deepen their expertise and 
              enhance their career prospects. Master's programs typically span one to 
              two years and involve a combination of coursework, research, and practical 
              training. Graduates with a master's degree often experience greater job opportunities, 
              higher earning potential, and the ability to take on leadership roles. Additionally,
               pursuing a master's degree fosters critical thinking, innovation, and professional
                growth, making it a valuable investment in one's future. For many, obtaining 
                a master's degree is a crucial step towards achieving their academic and 
                professional aspirations.</h2>
          <div style={styles.cards}>
            <div style={styles.card}>
              <img
                src={person9}
                alt="Student 1"
                style={styles.cardImageSmall}
              />
              <p>Student success stories</p>
            </div>
            <div style={styles.card}>
              <img
                src={blog}
                alt="Student 2"
                style={styles.cardImageSmall}
              />
              <p>How to apply effectively</p>
            </div>
            <div style={styles.card}>
              <img
                src={person2}
                alt="Student 2"
                style={styles.cardImageSmall}
              />
              <p>How to apply effectively</p>
            </div>
            <div style={styles.card}>
              <img
                src={about}
                alt="Student 2"
                style={styles.cardImageSmall}
              />
              <p>How to apply effectively</p>
            </div>
            <div style={styles.card}>
              <img
                src={about2}
                alt="Student 2"
                style={styles.cardImageSmall}
              />
              <p>How to apply effectively</p>
            </div>
            <div style={styles.card}>
              <img
                src={about3}
                alt="Student 2"
                style={styles.cardImageSmall}
              />
              <p>How to apply effectively</p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer style={styles.footer}>
          <p>&copy; 2024 Scholarship Guide</p>
        </footer>
      </div>
 
    </>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
    margin: 0,
    padding: 0,
    marginTop: "7%",
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: '20px',
    flexWrap: 'wrap',
  },
  headerImage: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px',
  },
  headerText: {
    marginLeft: '20px',
    textAlign: 'center',
  },
  infoBoxes: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    flexWrap: 'wrap',
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    flex: 1,
    margin: '10px',
    minWidth: '250px',
  },
  infoBoxHighlighted: {
    backgroundColor: '#90ee90',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    flex: 1,
    margin: '10px',
    minWidth: '250px',
  },
  mainContent: {
    padding: '20px',
    backgroundColor: '#ffffff',
  },
  whatsNew: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  cards: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    margin: '10px',
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  cardImage: {
    width: '100%',
    borderRadius: '8px',
  },
  cardImageSmall: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  applySection: {
    backgroundColor: '#e0f7fa',
    padding: '20px',
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
  },
};

export default Scholarship;
