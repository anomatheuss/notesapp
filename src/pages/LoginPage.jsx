import React from "react";
import { useClerk } from "@clerk/clerk-react";
import s from "./LoginPage.module.scss";
import { Sparkle, Flower, Star8, Diamond } from '../components/shapes/Shapes.jsx';

const FeatureCard = ({ Icon, description, className, color }) => (
  <div className={`${s.featureCard} ${className}`}>
    <div className={s.iconWrapper}><Icon color={color} size={40} /></div>
    <div className={s.featureText}>{description}</div>
  </div>
);

const LoginPage = ({ onBack }) => {
  const { openSignIn } = useClerk();
  const features = [
    { Icon: Sparkle, color: "#ADDEFE", desc: "Capture your ideas instantly with our lightning-fast editor.", class: s.f1 },
    { Icon: Star8, color: "#FFA352", desc: "Organize your thoughts and find them whenever you need.", class: s.f2 },
    { Icon: Flower, color: "#D1FFD7", desc: "A distraction-free space designed for your focus.", class: s.f3 },
    { Icon: Diamond, color: "#FFB347", desc: "Sync your notes across all your devices seamlessly.", class: s.f4 }
  ];

  return (
    <div className={s.loginContainer}>
      <div className={s.sideContent}>
        {features.slice(0, 2).map((f, i) => <FeatureCard key={i} Icon={f.Icon} color={f.color} description={f.desc} className={f.class} />)}
      </div>
      <div className={s.loginCard}>
        <header className={s.header}><h1 className={s.title}>Welcome back</h1><p className={s.subtitle}>Please enter your details to continue.</p></header>
        <form className={s.form} onSubmit={e => e.preventDefault()}>
          {['Email', 'Password'].map(label => (
            <div key={label} className={s.inputGroup}>
              <label>{label}</label>
              <input type={label.toLowerCase()} placeholder={label === 'Email' ? "Enter your email" : "••••••••"} className={s.input} />
            </div>
          ))}
          <div className={s.options}>
            <div className={s.rememberMe}><input type="checkbox" id="remember" className={s.checkbox} /><label htmlFor="remember">Remember for 30 days</label></div>
            <button type="button" className={s.forgotPassword} onClick={() => openSignIn()}>Forgot password?</button>
          </div>
          <button className={s.signInButton} onClick={() => openSignIn()}>Sign in</button>
          <button type="button" className={s.googleButton} onClick={() => openSignIn()}>
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className={s.googleIcon} />
            Sign in with Google
          </button>
        </form>
        <footer className={s.footer}>
          <p>Don't have an account? <button className={s.signUpLink} onClick={() => openSignIn()}>Sign up</button></p>
          <button className={s.backButton} onClick={onBack}>← Back to Home</button>
        </footer>
      </div>
      <div className={s.sideContent}>
        {features.slice(2).map((f, i) => <FeatureCard key={i} Icon={f.Icon} color={f.color} description={f.desc} className={f.class} />)}
      </div>
    </div>
  );
};

export default LoginPage;
