import './style.scss';
import { Link } from 'react-router-dom';
import { Button } from 'components/UI/Button/Button';
import { routes } from 'router/routes';

export const NotFound = () => {
  return (
    <main className="page-content" data-testid="not-found-page">
      <section className="error-section">
        <div className="error-section__content page-wrapper">
          <h2 className="error-section__header"> 404 Error </h2>
          <p className="error-section__text">
            The page you were looking for counldn&apos;t be found.
          </p>
          <Link to={`/${routes.login}`} replace data-testid="return-link">
            <Button accent className="error-section__button">
              Return to previous page
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};
