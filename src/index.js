import ReactDOM from 'react-dom';
import { initialize } from './root.jsx';

const reactRoot = window.document.getElementById('react-root');
initialize().then((rootNode) => {
    ReactDOM.render(rootNode, reactRoot);
});
