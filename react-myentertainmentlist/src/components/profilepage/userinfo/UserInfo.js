import React from "react";
import {useSelector} from "react-redux";
import {AddMediaToList} from "../../search/addmediatolist/AddMediaToList";
import {Button, Form, Row, Col, Card} from "react-bootstrap";
import './UserInfo.css';
import MedialistService from "../../backend/medialist.service";
import {MediaListContainer} from "../medialistcontainer/MediaListContainer";

export function UserInfo(props) {


    return (
        <>
            <MediaListContainer />
        </>
    )
}