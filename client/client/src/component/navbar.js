import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import '../component/navbar.css';
import myImage from '../img/logo.png';
import myImage2 from '../img/logores.png';
import HamburgerViews from './HamburgerViews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
    console.log(decoded);
  }
  

  let logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
    window.location.reload();
    };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleUserClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 850px)');
    setSmallScreen(mediaQuery.matches);

    const handleScreenChange = (e) => {
      setSmallScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleScreenChange);

    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);

  return (
    <React.Fragment>
      <nav className="navbar">
        {isSmallScreen ? (
          <div className="logo">
            <NavLink id="none" to="./">
              <img src={myImage2} alt="Logo2" style={{ width: '80px' }} />
            </NavLink>
          </div>
        ) : (
          <div className="logo">
            <NavLink id="none" to="./">
              <img src={myImage} alt="Logo" />
            </NavLink>
            <HamburgerViews isOpen={isMenuOpen} onClose={closeMenu} />
          </div>
        )}
        <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
          <span className="menu-icon"></span>
        </div>
        <div className="naviga">
          <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/about" className="active-link" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/cart" activeClassName="active-link" onClick={closeMenu}>
                Cart
              </NavLink>
            </li> */}
            {token && (
              <React.Fragment>
                <li>
                  <NavLink to="/Accounts" className="active-link" onClick={closeMenu}>
                    My Account
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="active-link" onClick={closeMenu}>
                    Contact
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            <li className="dropdown">
  <button id="btn-ope">
    <NavLink id='oppp' to="/Operations" className="active-link" onClick={closeMenu}>
      Operations
    </NavLink>
  </button>
  <div className="dropdown-content">
    <ul>
      <li className='contnt'>
        <NavLink to="/loan" className="active-link" onClick={closeMenu}>
          Loan
        </NavLink>
      </li>
      <li id='link2'>
        <NavLink to="/transfer" className="active-link" onClick={closeMenu}>
          Transfer
        </NavLink>
      </li>
      <li className='contnt'>
        <NavLink to="/advice" className="active-link" onClick={closeMenu}>
          Advice
        </NavLink>
      </li>
      <li className='contnt'>
        <NavLink to="/history" className="active-link" onClick={closeMenu}>
          History
        </NavLink>
      </li>
    </ul>
  </div>
</li>

          </ul>
        </div>
        {isSmallScreen ? (
          <div className="userIcon">
            <FontAwesomeIcon icon={faUser} onClick={handleUserClick} />
            {showUserMenu && (
              <ul className="userMenu-dropdown">
                <li>
                  <button>Sign Out</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <li className="li-log">
            {!token && (
              <div className="userMenu">
                <NavLink to="/login" className="active-link" onClick={closeMenu}>
                  <button id="btn-log">LOGIN</button>
                </NavLink>
              </div>
            )}
          {token && (
        <div className="userMenu">
            <NavLink to="/login" className="active-link" onClick={closeMenu}>
              <button id="btn-log">
              <Link id='logname'>{decoded.username}</Link>
              </button>
            </NavLink>
              <div className="logmeout"> 
                 <Link  onClick={logout}><button id="btn-signOut">Log Out</button></Link> 
              </div>
        </div>
)}
          </li>
        )}
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
