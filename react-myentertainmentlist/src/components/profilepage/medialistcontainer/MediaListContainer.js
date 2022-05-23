import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Collapse, Fade, Image, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {FlippingCard, FlippingCardBack, FlippingCardFront, TaggedContentCard} from "react-ui-cards";
import {MediaContainer} from "./mediacontainer/MediaContainer";
import {AddMediaList} from "./addmedialist/AddMediaList";
import MedialistService from "../../backend/medialist.service";
import {setMediaLists} from "../../../redux/slices/UserSlice";
import './MediaListContainer.css';

const getMedialistType = type => (type === 'MEDIA_MOVIE' && 'movie') || (type === 'MEDIA_TV' && 'tv') || (type === 'MEDIA_GAME' && 'game') || 'all';

export function MediaListContainer(props) {

    const [selectedMediaList, setSelectedMediaList] = useState(null);
    const [prevSelectedMediaList, setPrevSelectedMediaList] = useState(null);

    const [addMediaList, setAddMediaList] = useState(false);

    const [resetMediaList, setResetMediaList] = useState(true);

    const mediaContainerEndRef = useRef(null);

    console.log("UPDATED");

    const _mediaLists = useSelector(state => state.user.mediaLists);

    const mediaLists = [..._mediaLists];

    const accessToken = useSelector(state => state.user.accessToken);

    const dispatch = useDispatch();

    const numRows = Math.ceil((mediaLists.length + 1) / 3);
    const numListCols = 3;

    const mediaListTitle = `MediaLists (${mediaLists.length})`;

    const isMobile = window.innerWidth <= 768;


    useEffect(() => setSelectedMediaList(mediaLists.find(mediaList => selectedMediaList && mediaList.id === selectedMediaList.id) || null), [mediaLists])

    // useEffect(() => {
    //     if (resetMediaList) {
    //         MedialistService.getLists(accessToken).then(response => {
    //                 if (response && response.status === 200 && response.data) {
    //                     dispatch((setMediaLists(response.data)));
    //                     setResetMediaList(false);
    //                 }
    //             }
    //         );
    //     }
    //         // MedialistService.getLists(accessToken).then(response => {
    //         //     if (response.status === 200) {
    //         //         setMediaLists(response.data.slice().sort((cML, pML) => cML.name.localeCompare(pML.name)));
    //         //         setSelectedMediaList(response.data.find(mediaList => selectedMediaList && mediaList.id === selectedMediaList.id) || null);
    //         //         setResetMediaList(false);
    //         //     }
    //         // })
    // }, [resetMediaList]);

    const deleteMediaList = listId => {
        MedialistService.deleteMediaList(listId, accessToken).then(response => {
            MedialistService.getLists(accessToken).then(response =>
                response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
            );
        });
    }

    if (!mediaLists) return;

    let mediaListComponents = mediaLists.slice().sort((cML, pML) => cML.name.localeCompare(pML.name)).map((mediaList, i) => (
        <div key={mediaList.id}>
            <Row className="card-container justify-content-sm-center justify-content-md-center">
                <TaggedContentCard
                    href={void (0)}
                    onClick={() => {
                        if (selectedMediaList !== null && mediaList.id === selectedMediaList.id) {
                            setPrevSelectedMediaList(selectedMediaList);
                            setSelectedMediaList(null);
                        } else {
                            setPrevSelectedMediaList(selectedMediaList);
                            setSelectedMediaList(null);
                            setTimeout(() => setSelectedMediaList(mediaList), 200);
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
                            <Button variant="danger" onClick={(e) => {
                                e.stopPropagation();
                                deleteMediaList(mediaList.id)
                                setSelectedMediaList(null);
                            }} style={{float: 'right'}}>Delete</Button>
                        </div>
                    )}
                    tags={[]}
                />
            </Row>
            <Row style={{
                width: 'calc(' + window.innerWidth + 'px  - 10vw',
                transform: (!isMobile ? 'translateX('+ (-34 * (i % numListCols)) + '%)' : '')
            }}>
                    <Collapse in={selectedMediaList && mediaList.id === selectedMediaList.id}>
                        <div>
                                {(selectedMediaList || prevSelectedMediaList) && <MediaContainer mediaList={selectedMediaList || prevSelectedMediaList}
                                                                      setResetMediaList={setResetMediaList}/>}
                        </div>
                    </Collapse>
            </Row>
        </div>
    ))
    mediaListComponents.push((
        <Row className="card-container justify-content-sm-center" key='CREATE_NEW_MEDIALIST'>
            <TaggedContentCard
                href={void (0)}
                onClick={() => {
                    setAddMediaList(!addMediaList);
                    setSelectedMediaList(null);
                }}
                thumbnail={require("../../../images/medialistimages/add_new_medialist.png").default}
                title="Create"
                description={(<p style={{fontStyle: "italic"}}>Create New MediaList...</p>)}
                tags={[]}
            />
        </Row>
    ));


    let mediaListRows = [];
    for (let i = 0; i < numRows; i++) {
        mediaListRows.push((
            <div key={i}>
                <Row className="justify-content-sm-center justify-content-md-center">
                    {[0, 1, 2].map(col => (
                        <Col xl={4} xs={12} key={col}>
                            {mediaListComponents[(i * 3) + col]}
                        </Col>
                    ))}
                </Row>
            </div>
        ));
    }

    mediaListRows.push((
        <Collapse in={addMediaList} key={"CRATE_NEW_MEDIALIST"}>
            <div>
                <Row>
                    {addMediaList && <AddMediaList addMediaList={addMediaList} setResetMediaList={setResetMediaList}/>}
                </Row>
            </div>
        </Collapse>
    ))

    return (
        <Row className="media-lists-container">
            {console.log('RERENDED')}
                <div className="media-lists-inner">
                    <h1 style={{
                        marginLeft: '1vw',
                        marginTop: '-3vh',
                        color: 'white'
                    }}>{mediaListTitle}</h1>
                    {mediaListRows}
                </div>
        </Row>
    )

}