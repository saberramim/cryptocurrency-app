import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="#">SaberRamim </a>| React.js Projhe
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed By Saber Ramim</p>
      </footer>
    </>
  );
}

export default Layout;
