import React from 'react';
import './DevelopersSection.css';

interface Developer {
  name: string;
  role: string;
  icon: string;
}

const developers: Developer[] = [
  {
    name: 'Mahmoud Sabry Mahmoud Ali Alkhawas',
    role: 'Lead Developer',
    icon: 'person'
  },
  {
    name: 'Mohamed Elgharib',
    role: 'Backend Developer',
    icon: 'person'
  },
  {
    name: 'Abdelrahman Adel',
    role: 'Frontend Developer',
    icon: 'person'
  },
  {
    name: 'Abdelrahman Zakaria',
    role: 'Full Stack Developer',
    icon: 'person'
  },
  {
    name: 'Ibrahim Adel',
    role: 'Database Engineer',
    icon: 'person'
  },
  {
    name: 'Ibrahim Tharwat',
    role: 'DevOps Engineer',
    icon: 'person'
  },
  {
    name: 'Mohamed Nabil',
    role: 'Software Engineer',
    icon: 'person'
  }
];

const DevelopersSection: React.FC = () => {
  return (
    <div className="developers-section">
      <div className="developers-header">
        <h2>
          <span className="material-icons">group</span>
          Development Team
        </h2>
        <p>Meet the talented individuals behind this project</p>
      </div>
      
      <div className="developers-grid">
        {developers.map((developer, index) => (
          <div key={index} className="developer-card">
            <div className="developer-icon">
              <span className="material-icons">{developer.icon}</span>
            </div>
            <div className="developer-info">
              <h3>{developer.name}</h3>
              <p className="developer-role">{developer.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopersSection;
