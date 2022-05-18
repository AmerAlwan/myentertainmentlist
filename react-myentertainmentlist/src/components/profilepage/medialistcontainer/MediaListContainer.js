import React, {useEffect, useState} from "react";
import {Button, Card, Col, Collapse, Image, Row} from "react-bootstrap";
import './MediaListContainer.css';
import {useSelector} from "react-redux";
import {FlippingCard, FlippingCardBack, FlippingCardFront, TaggedContentCard} from "react-ui-cards";
import {MediaContainer} from "./mediacontainer/MediaContainer";
import {AddMediaList} from "./addmedialist/AddMediaList";
import MedialistService from "../../backend/medialist.service";

const getMedialistType = type => (type === 'MEDIA_MOVIE' && 'movie') || (type === 'MEDIA_TV' && 'tv') || (type === 'MEDIA_GAME' && 'game') || 'all';

export function MediaListContainer(props) {

    const [selectedMediaList, setSelectedMediaList] = useState(null);

    const [addMediaList, setAddMediaList] = useState(false);

    const [resetMediaList, setResetMediaList] = useState(true);

    const [mediaLists, setMediaLists] = useState([]);

    const accessToken = useSelector(state => state.user.accessToken);

    const numRows = Math.ceil((mediaLists.length+1) / 3);

    useEffect(() => {
        if (resetMediaList)
            MedialistService.getLists(accessToken).then(response => {
                if (response.status === 200) {
                    setMediaLists(response.data.slice().sort((cML, pML) => cML.name.localeCompare(pML.name)));
                    setSelectedMediaList(response.data.find(mediaList => selectedMediaList && mediaList.id === selectedMediaList.id) || null);
                    setResetMediaList(false);
                }
        })
    }, [resetMediaList]);

    const deleteMediaList = listId => {
        MedialistService.deleteMediaList(listId, accessToken).then(response => {
            console.log(response);
            setResetMediaList(true);
        });
    }

    let mediaListComponents = mediaLists.sort((cML, pML) => cML.name.localeCompare(pML.name)).map(mediaList => (
        <div className="card-container" key={mediaList.id}>
            <TaggedContentCard
                href={void(0)}
                onClick={() => {
                    if (selectedMediaList !== null && mediaList.id === selectedMediaList.id) {
                        setSelectedMediaList(null);
                    } else {
                        setSelectedMediaList(mediaList);
                        setAddMediaList(false);
                    }
                }}
                thumbnail={require("../../../images/medialistimages/" + mediaList.posterName).default}
                title={mediaList.name}
                description={(
                    <div>
                        {mediaList.description ?
                            <p>{mediaList.description}</p> :
                            <p style={{fontStyle: "italic"}}>No Description...</p>
                        }
                        <Button variant="danger" onClick={() => deleteMediaList(mediaList.id)} style={{float: 'right'}}>Delete</Button>
                    </div>
                )}
                tags={[]}
            />
        </div>
    ))
    mediaListComponents.push((
        <div className="card-container" key='CREATE_NEW_MEDIALIST'>
            <TaggedContentCard
                href={void(0)}
                onClick={() => {
                    setAddMediaList(!addMediaList);
                    setSelectedMediaList(null);
                }}
                thumbnail={require("../../../images/medialistimages/add_new_medialist.png").default}
                title="Create"
                description={(<p style={{fontStyle: "italic"}}>Create New MediaList...</p>)}
                tags={[]}
            />
        </div>
    ));


    let mediaListRows = [];
    for (let i = 0; i < numRows; i++) {
        mediaListRows.push((
            <div key={i}>
                <Row>
                    {[0, 1, 2].map(col => (
                        <Col xs={4} key={col}>
                            {mediaListComponents[(i * 3) + col]}
                        </Col>
                    ))}
                </Row>
                <Collapse in={selectedMediaList && [0,1,2].map(col => mediaListComponents[(i*3) + col] && mediaListComponents[(i*3) + col].key).includes(String(selectedMediaList.id))}>
                    <div>
                        <Row>
                            {selectedMediaList && <MediaContainer mediaList={selectedMediaList} setResetMediaList={setResetMediaList} />}
                        </Row>
                    </div>
                </Collapse>
            </div>
        ));
    }

    mediaListRows.push((
        <Collapse in={addMediaList} key={"CRATE_NEW_MEDIALIST"}>
            <div>
                <Row>
                    {addMediaList && <AddMediaList addMediaList={addMediaList} setResetMediaList={setResetMediaList} />}
                </Row>
            </div>
        </Collapse>
    ))

    return (
        <Row className="media-lists-container">
            <Col>
                <div className="media-lists-inner">
                    {mediaListRows}
                </div>
            </Col>
        </Row>
    )

}