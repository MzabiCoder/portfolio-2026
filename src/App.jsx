import ScrollProvider from './context/ScrollProvider.jsx';
import PointerProvider from './context/PointerProvider.jsx';
import ToastProvider from './context/ToastProvider.jsx';
import Site from './Site.jsx';

/** Providers first, then the page itself. */
export default function App() {
  return (
    <ScrollProvider>
      <PointerProvider>
        <ToastProvider>
          <Site />
        </ToastProvider>
      </PointerProvider>
    </ScrollProvider>
  );
}
