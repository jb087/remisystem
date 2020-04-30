import React, { useContext } from 'react';

import logo from './../logo-small.png';
import { userContext } from '../App';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  const user = useContext(userContext);

  return (
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand">
        <img src={logo} alt="logo" className="d-inline-block align-top logo mr-4" />
        {user.userData.email}
      </a>
      <form class="form-inline">
        {/* <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        /> */}
        <Link
          to="/settings"
          className="btn btn-outline-secondary my-2 my-sm-0 mr-2"
          role="button"
        >
          Settings
        </Link>
        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={() => user.login(null)}>
          Logout
        </button>
      </form>
      {/* <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="../navbar/">Default</a>
        </li>
        <li class="active">
          <a href="./">
            Static top <span class="sr-only">(current)</span>
          </a>
        </li>
        <li>
          <a href="../navbar-fixed-top/">Fixed top</a>
        </li>
      </ul> */}
    </nav>
  );
  // return (
  //   <nav class="navbar navbar-default navbar-static-top">
  //     <div class="container">
  //       <div class="navbar-header">
  //         <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
  //           <span class="sr-only">Toggle navigation</span>
  //           <span class="icon-bar"></span>
  //           <span class="icon-bar"></span>
  //           <span class="icon-bar"></span>
  //         </button>
  //         <a class="navbar-brand" href="#">Project name</a>
  //       </div>
  //       <div id="navbar" class="navbar-collapse collapse">
  //         <ul class="nav navbar-nav">
  //           <li class="active"><a href="#">Home</a></li>
  //           <li><a href="#">About</a></li>
  //           <li><a href="#">Contact</a></li>
  //           <li class="dropdown">
  //             <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
  //             <ul class="dropdown-menu">
  //               <li><a href="#">Action</a></li>
  //               <li><a href="#">Another action</a></li>
  //               <li><a href="#">Something else here</a></li>
  //               <li role="separator" class="divider"></li>
  //               <li class="dropdown-header">Nav header</li>
  //               <li><a href="#">Separated link</a></li>
  //               <li><a href="#">One more separated link</a></li>
  //             </ul>
  //           </li>
  //         </ul>
  //         <ul class="nav navbar-nav navbar-right">
  //           <li><a href="../navbar/">Default</a></li>
  //           <li class="active"><a href="./">Static top <span class="sr-only">(current)</span></a></li>
  //           <li><a href="../navbar-fixed-top/">Fixed top</a></li>
  //         </ul>
  //       </div><!--/.nav-collapse -->
  //     </div>
  //   </nav>
  // )
}
