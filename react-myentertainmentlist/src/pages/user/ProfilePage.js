import {Component} from "react";
import {loginSuccess, setMediaLists} from "../../redux/slices/UserSlice";
import {connect} from "react-redux";
import {UserInfo} from "../../components/profilepage/userinfo/UserInfo";
import AppNavBar from "../../components/navbar/AppNavBar";
import {AddMediaToList} from "../../components/search/addmediatolist/AddMediaToList";
import MedialistService from "../../components/backend/medialist.service";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: this.props.match.params.username === this.props.user.username
        }
    }

    componentDidMount() {
        MedialistService.getLists(this.props.user.accessToken).then(response => {
            if (response.status === 200) this.props.setMediaLists(response.data);
            console.log(response);
        });
    }

    render() {

        return (
            <>
                <AppNavBar showSearchBar showLogin />
                <UserInfo user={this.props.user} />
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMediaLists: mediaLists => dispatch(setMediaLists(mediaLists))
    }
}


const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: {
        accessToken: state.user.accessToken,
        tokenType: state.user.tokenType,
        id: state.user.id,
        username: state.user.username,
        roles: state.user.roles,
        mediaLists: state.user.mediaLists
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);