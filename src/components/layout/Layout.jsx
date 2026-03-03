import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import s from "./layoutStyle.module.scss";

const Layout = ({ sidebar, children }) => {
  return (
    <div className={s.layoutContainer}>
      <header className={s.header}>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="clerk-btn">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

      <div className={s.mainWrapper}>
        {sidebar}
        <main className={s.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
