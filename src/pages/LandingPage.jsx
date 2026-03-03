import React from 'react';
import s from './LandingPage.module.scss';
import { Sparkle, Flower, Star8, Circle, Diamond } from '../components/shapes/Shapes.jsx';

const LandingPage = ({ onStart }) => (
  <div className={s.landingContainer}>
    <Sparkle className={`${s.shape} ${s.s1}`} color="#ADDEFE" size={80} />
    <Flower className={`${s.shape} ${s.s2}`} color="#D1FFD7" size={100} />
    <Star8 className={`${s.shape} ${s.s3}`} color="#FFA352" size={90} />
    <Circle className={`${s.shape} ${s.s4}`} color="#E0C3FC" size={70} />
    <Diamond className={`${s.shape} ${s.s5}`} color="#FFB347" size={60} />
    <Sparkle className={`${s.shape} ${s.s6}`} color="#93C5FD" size={50} />
    <div className={s.content}>
      <span className={s.topTitle}>WELCOME TO</span>
      <h1 className={s.title}>NotesWeb — A Space for Your Mind.</h1>
      <p className={s.description}>Write it down. Find it instantly. NotesWeb is your personal space to store ideas, plans, and notes — all in one place, always within reach.</p>
      <button className={s.ctaButton} onClick={onStart}>Start writing for free.</button>
    </div>
  </div>
);

export default LandingPage;
