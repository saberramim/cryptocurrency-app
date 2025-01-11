import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Cryptocurrency </h1>
        <p>
          <a href="https://github.com/SaberRamim">SaberRamim </a>| React.js
          Project
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>
          Developed By 
          <a href=" https://www.linkedin.com/in/saberramim/"> Saber Ramim</a>
        </p>
      </footer>
    </>
  );
}

export default Layout;
