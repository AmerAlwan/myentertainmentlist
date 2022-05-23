import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import MedialistService from "../../../backend/medialist.service";
import {useDispatch, useSelector} from "react-redux";
import {setMediaLists} from "../../../../redux/slices/UserSlice";

const getMedialistType = type => (type === 'MEDIA_MOVIE' && 'movie') || (type === 'MEDIA_TV' && 'tv') || (type === 'MEDIA_GAME' && 'game') || 'all';

export function AddMediaList(props) {
    const [mediaListName, setMediaListName] = useState("");
    const [mediaListDescription, setMediaListDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [mediaListType, setMediaListType] = useState("MEDIA_ALL");

    const accessToken = useSelector(state => state.user.accessToken);

    const dispatch = useDispatch();

    const allMediaTypes = ['MEDIA_ALL', 'MEDIA_MOVIE', 'MEDIA_TV', 'MEDIA_GAME'];

    const saveMediaList = () => {
        const mediaList = {name: mediaListName, description: mediaListDescription, mediaListType: mediaListType, isPrivate: isPrivate};
        MedialistService.addMediaList(mediaList, accessToken).then(response => {
            setMediaListName("");
            setMediaListDescription("");
            setIsPrivate(false);
            setMediaListType("");
            console.log(response);
            MedialistService.getLists(accessToken).then(response =>
                response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
            );
        });
    }

    useEffect(() => {
        if (!props.addMediaList) {
            setMediaListName("");
            setMediaListDescription("");
            setIsPrivate(false);
            setMediaListType("");
        }
    }, [props.addMediaList]);

    return (
        <Row className="media-container">
            <Col>
                <div className="media-inner" style={{height: '500px'}}>
                    <Form style={{width: '300px', margin: '0 auto'}}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={mediaListName} onChange={e => setMediaListName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={mediaListDescription} onChange={e => setMediaListDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Select
                                value={{value: mediaListType, label: getMedialistType(mediaListType)}}
                                options={allMediaTypes.map(media => ({value: media, label: getMedialistType(media)}))}
                                onChange={selected => setMediaListType(selected.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{display: 'inline-block'}}>Private</Form.Label>
                            <Form.Check type="checkbox" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
                        </Form.Group>
                        <Button onClick={saveMediaList}>Create</Button>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}