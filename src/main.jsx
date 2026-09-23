import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// No StrictMode: the scroll choreography mounts GSAP timelines and splits text
// nodes once per element, which double-invoked effects would duplicate.
createRoot(document.getElementById('root')).render(<App />);
