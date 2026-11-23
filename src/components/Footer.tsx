
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <section className="footer__brand">
          <h2 className="footer__logo">UnaHur Anti-Social Net</h2>
          <p>
            Un espacio para compartir publicaciones,
            descubrir contenido e interactuar con la comunidad.
          </p>
        </section>
      </div>

      <div className="footer__bottom">
        <p>© 2026 UnaHur Anti-Social Net. Todos los derechos reservados.</p>
        <p>Desarrollado para UNAHUR</p>
      </div>
    </footer>
  );
}

export default Footer;
