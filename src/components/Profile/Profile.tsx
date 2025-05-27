// pages/Profile.jsx
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  background: #fff;
`;

const ProfileImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
  border: 4px solid #007bff; /* Bootstrap primary color */
//   margin: 0 auto 20px auto;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.h2`
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
`;

const Title = styled.p`
  text-align: center;
  color: #6c757d; /* Bootstrap muted gray */
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h5`
  margin-bottom: 10px;
  font-weight: 600;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  margin-bottom: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PrimaryButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  
  &:hover {
    background: #0069d9;
  }
`;


export default function Profile() {
  return (
    <Container>
      <ProfileImageWrapper>
        <ProfileImage src="https://via.placeholder.com/120" alt="Profile" />
      </ProfileImageWrapper>

      <Name>John Doe</Name>
      <Title>Frontend Developer</Title>

      {/* About Me */}
      <Section>
        <SectionTitle>About Me</SectionTitle>
        <p>
          Passionate developer with expertise in React, JavaScript, and UI design. Loves creating beautiful and functional user interfaces.
        </p>
      </Section>

      {/* Contact Info */}
      <Section>
        <SectionTitle>Contact</SectionTitle>
        <InfoList>
          <InfoItem><strong>Email:</strong> john.doe@example.com</InfoItem>
          <InfoItem><strong>Phone:</strong> +1 234 567 8901</InfoItem>
          <InfoItem><strong>Location:</strong> New York, USA</InfoItem>
        </InfoList>
      </Section>

      {/* Action Buttons */}
      <ButtonGroup>
        <PrimaryButton>Edit Profile</PrimaryButton>
      </ButtonGroup>
    </Container>
  );
}