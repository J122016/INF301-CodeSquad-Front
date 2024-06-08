import logo from '../contents/logo.svg';
import './defaultView.css';

function DefaultView() {
  return (
    <div className="DefaultView">
      <header className="DefaultView-header">
        <img src={logo} className="DefaultView-logo" alt="logo" />
        <p>
          Edit <code>src/common/DefaultView.tsx</code> and save to reload.
        </p>
        <a
          className="DefaultView-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default DefaultView;
