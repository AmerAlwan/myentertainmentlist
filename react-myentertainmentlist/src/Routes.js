import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Cookies from "js-cookie";
import MediaPage from './pages/MediaPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import {connect} from "react-redux";
import {loginSuccess} from "./redux/slices/UserSlice";
import ProfilePage from "./pages/user/ProfilePage";
import {Spinner} from "react-bootstrap";
import UserService from "./components/backend/user.service";

class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let isLoggedIn = this.props.isLoggedIn;
        const userCookie = Cookies.get('user');
        if (isLoggedIn && !userCookie) {
            Cookies.set('user', JSON.stringify(this.props.user));
        } else if (!isLoggedIn && userCookie) {
            this.props.toggleLoginSuccess(JSON.parse(userCookie));
            isLoggedIn = true;
        }
        return (
            <>
                {
                    this.props.isLoading ?
                        <Spinner variant="primary" animation="border" style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            zIndex: "10",
                            width: "50px",
                            height: "50px"
                        }}/>
                        :
                        <></>
                }
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/media/:type/:id' component={MediaPage}/>
                    <Route exact path='/login'>
                        {isLoggedIn ? <Redirect to='/'/> : <LoginPage/>}
                    </Route>
                    <Route exact path='/register'>
                        {isLoggedIn ? <Redirect to='/'/> : <RegisterPage/>}
                    </Route>
                    <Route path='/user/:username' component={ProfilePage}/>
                    <Route exact path='/user'>
                        {isLoggedIn ? <Redirect to={'/user/' + this.props.user.username}/> : <Redirect to='/login'/>}
                    </Route>
                </Switch>
            </>
        )
    }

}

const mapStateToProps = (state) => ({
    isLoading: state.loading.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    user: {
        accessToken: state.user.accessToken,
        tokenType: state.user.tokenType,
        id: state.user.id,
        username: state.user.username,
        roles: state.user.roles,
        mediaLists: state.user.mediaLists,
    }
});

const mapDispatchToProps = dispatch => {
    return {
        toggleLoginSuccess: user => dispatch(loginSuccess(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
