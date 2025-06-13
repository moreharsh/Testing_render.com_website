import React, { useState } from 'react';
import './Homeservice.css';

const services = [
  {
    id: 'basic',
    title: 'Professional',
    price: '3.99$',
    features: [
      'Virtual Credit Cards',
      'Financial Analytics',
      'Checking Account',
      'API Integration',
    ],
  },
  {
    id: 'premium',
    title: 'Unlimited',
    price: '5.99$',
    features: [
      'Virtual Credit Cards',
      'Financial Analytics',
      'Checking Account',
      'API Integration',
      'Cancel Anytime',
    ],
  },
  {
    id: 'free',
    title: 'Unlimited',
    price: '0.00$',
    features: [
      'Virtual Credit Cards',
      'Financial Analytics',
      'Checking Account',
      'API Integration',
      'Cancel Anytime',
    ],
  },
];

function HomeService() {
  const [selected, setSelected] = useState('basic');

  return (
    <section className="services-section" id="services">
      <h2 className="services-title">Our Services</h2>
      <div className="service-container">
        {services.map((card) => (
          <div
            key={card.id}
            className={`service-card ${selected === card.id ? 'selected' : ''}`}
            onClick={() => setSelected(card.id)}
          >
            <div className="tag">{card.id === 'basic' ? 'BASIC' : 'MOST POPULAR'}</div>
            <h2>{card.title}</h2>
            <hr />
            <ul>
              {card.features.map((feature, idx) => (
                <li key={idx}>✔ {feature}</li>
              ))}
            </ul>
            <hr />
            <div className="price-section">
              <span className="price">{card.price}</span><span>/ month</span>
            </div>
            <button className="start-button">Start now</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeService;
