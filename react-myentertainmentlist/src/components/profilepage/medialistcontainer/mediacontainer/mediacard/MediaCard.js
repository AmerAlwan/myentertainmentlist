import './MediaCard.css';
import {useEffect} from "react";
import {FlippingCard, FlippingCardBack, FlippingCardFront} from "react-ui-cards";
import {Image, Row} from "react-bootstrap";
import {faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function MediaCard(props) {
   const media = props.media;

    return (
        <>
            <FlippingCard>
                <FlippingCardFront>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: "no-repeat",
                            backgroundImage: 'url(' + media.posterPath + ')'
                        }} />
                </FlippingCardFront>
                <FlippingCardBack>
                    <div className="card-back-container">
                        <Image className="card-media-back-image" src={media.posterPath} />
                        <Row className="card-media-container">
                            <p className="card-media-title">{media.title + (media.releaseYear && (' (' + media.releaseYear + ')'))}</p>
                            <p className="card-media-type">{'<' + props.type + '>'}</p>
                            <FontAwesomeIcon className="card-media-delete-icon" icon={faXmarkCircle} onClick={() => props.deleteMedia(media, props.type)} />
                        </Row>
                    </div>
                </FlippingCardBack>
            </FlippingCard>
        </>
    )
}