import React, {useState} from "react";
import {NavDropdown, Dropdown} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/slices/UserSlice";
import Cookies from "js-cookie";
import "./ProfileDropdown.css";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="mel-DropdownToggle"
    >
        <span id="mel-DropdownToggle-Children">{children}</span>
        <span id="mel-DropdownToggle-Arrow">&#x25bc;</span>
    </a>
));

const CustomMenu = React.forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        const [value, setValue] = useState('');

        return (
            <div className="mel-DropdownMenu">
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled" style={{color: "red"}}>
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            </div>
        );
    },
);

const toggleLogout = () => {
    Cookies.remove('user');
}

export function ProfileDropdown(props) {
    const dispatch = useDispatch();
    return (
        <div>
            <Dropdown align="end">
                <Dropdown.Toggle as={CustomToggle}>
                    {props.name}
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item href="/user">My Profile</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={() => dispatch(logout())}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

// <NavDropdown
//     align="end"
//     menuVariant="dark"
//     title={props.name}
//     style={{borderRadius: "20px", backgroundColor: "#e8e8e8", color: "black"}}
//     autoClose={false}
// >
//     <NavDropdown.Item href="/user"  style={{backgroundColor: "red"}}>
//         My Profile
//     </NavDropdown.Item>
//     <NavDropdown.Divider />
//     <NavDropdown.Item onClick={() => dispatch(logout())}>
//         Logout
//     </NavDropdown.Item>
// </NavDropdown>