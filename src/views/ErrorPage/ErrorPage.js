import { useRouteError } from 'react-router-dom';
import { ErrorPageHeader } from './ErrorPage.style';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <ErrorPageHeader>
      <h1>You've found a page that doesn't exist</h1>
      <p>Breathe in, and on the out breath, go back and try again.</p>
    </ErrorPageHeader>
  );
}
