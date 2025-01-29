import {React,use,useState} from 'react';
import { NavLink } from 'react-router-dom';
import NavBarItems from '../../Data/NavMenu';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSearch,FaRegUser } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { Form, Modal } from 'react-bootstrap';

const FrontHeader = () => {
  const [show,setShow] = useState(false)
  return (
    <>
       <Navbar expand="lg" className="d-flex align-items-center sticky-top bg-light">
      <Container>
        <Navbar.Brand href="/"> <span className="d-flex align-items-center me-auto cursor-pointer">
                <img src='/assets/logo.jpg' alt="Logo" />
              </span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className='text-nowrap' >
            {NavBarItems.map(item => (
              item.subItems ? (
                <NavDropdown title={item.label} id={`nav-dropdown-${item.id}`} key={item.id} className='bg-light'>
                  {item.subItems.map(subnav => (
                    subnav.childItems ? (
                      <NavDropdown key={subnav.id} title={subnav.label} >
                        {subnav.childItems.map(childItem => (
                          <NavDropdown.Item key={childItem.id} as={NavLink} to={childItem.path}>
                            {childItem.label}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    ) : (
                      <NavDropdown.Item key={subnav.id} as={NavLink} to={subnav.path}>
                        {subnav.label}
                      </NavDropdown.Item>
                    )
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link key={item.id} as={NavLink} to={item.path}>
                  {item.label}
                </Nav.Link>
              )
            ))}
          </Nav>
          <Nav >
          <div className='d-flex justify-space-between gap-1'>
            <Nav.Link><FaSearch onClick={()=>setShow(true)} /></Nav.Link>
            <Nav.Link><FaRegUser  /></Nav.Link>
            <Modal show={show}
            size='lg'
              onHide={()=>setShow(false)}
              dialogClassName="modal-90w"
            >
             
              <Modal.Body>
            <Form>
              <Form.Control
              type='text'
              placeholder='Search'
              autoFocus
              />
            </Form>
              </Modal.Body>
            </Modal>
            <Nav.Link><LuShoppingBag /></Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default FrontHeader;