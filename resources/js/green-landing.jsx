import { createRoot } from 'react-dom/client';
import GreenCreativeLanding from './components/GreenCreativeLanding';

const root = createRoot(document.getElementById('green-landing-root'));
if (root) {
    root.render(<GreenCreativeLanding />);
}
