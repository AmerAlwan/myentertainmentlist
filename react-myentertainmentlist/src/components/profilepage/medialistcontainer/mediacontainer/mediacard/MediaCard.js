import './MediaCard.css';
import {useEffect, useState} from "react";
import {FlippingCard, FlippingCardBack, FlippingCardFront} from "react-ui-cards";
import {Image, Row} from "react-bootstrap";
import {faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Redirect} from "react-router-dom";

export function MediaCard(props) {
   const media = props.media;
   const isMobile = /Android|webOS|iPhone|kindle|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
   const [redirect, setRedirect] = useState('');
   if (redirect) return (<Redirect to={redirect} />);
    return (
        <>
            <FlippingCard>
                <FlippingCardFront>
                    {isMobile ? (<div className="card-back-container">
                        <Image className="card-media-back-image" src={media.posterPath} style={{filter: 'none'}} />
                        <Row className="card-media-container">
                            <p className="card-media-title">{media.title + (media.releaseYear && (' (' + media.releaseYear + ')'))}</p>
                            <p className="card-media-type">{'<' + props.type + '>'}</p>
                            <FontAwesomeIcon className="card-media-delete-icon" icon={faXmarkCircle} onClick={() => props.deleteMedia(media, props.type)} />
                        </Row>
                    </div>) :
                        (<div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: "no-repeat",
                            backgroundImage: 'url(' + media.posterPath + ')'
                        }} />)}
                </FlippingCardFront>
                <FlippingCardBack>
                    <div className="card-back-container" onClick={() => setRedirect('/media/' + media.type + '/' + media.apiId)}>
                        <Image className="card-media-back-image" src={media.posterPath} />
                        <Row className="card-media-container">
                            <p className="card-media-title">{media.title + (media.releaseYear && (' (' + media.releaseYear + ')'))}</p>
                            <p className="card-media-type">{'<' + props.type + '>'}</p>
                            <FontAwesomeIcon className="card-media-delete-icon" icon={faXmarkCircle} onClick={(e) => {
                                e.stopPropagation();
                                props.deleteMedia(media, props.type)
                            }} />
                        </Row>
                    </div>
                </FlippingCardBack>
            </FlippingCard>
        </>
    )
}