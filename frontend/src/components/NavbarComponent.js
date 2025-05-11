// import React from 'react';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// function NavbarComponent() {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand onClick={() => navigate('/')}>Health Portal</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           {user && (
//             <Nav className="me-auto">
//               {user.role === 'admin' ? (
//                 <>
//                   <Nav.Link onClick={() => navigate('/admin')}>Dashboard</Nav.Link>
//                   <Nav.Link onClick={() => navigate('/patients')}>Patients</Nav.Link>
//                   <Nav.Link onClick={() => navigate('/appointments')}>Appointments</Nav.Link>
//                 </>
//               ) : (
//                 <>
//                   <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
//                   <Nav.Link onClick={() => navigate('/health')}>My Health</Nav.Link>
//                   <Nav.Link onClick={() => navigate('/education')}>Education</Nav.Link>
//                 </>
//               )}
//               <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//             </Nav>
//           )}
//           {!user && (
//             <Nav>
//               <Button variant="outline-light" onClick={() => navigate('/login')}>Login</Button>
//             </Nav>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavbarComponent;
