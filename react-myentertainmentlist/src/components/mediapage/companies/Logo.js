import React, {Component, useEffect, useState} from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import * as config from '../../../config.json';

export function Logo(props) {
    const [name, setName] = useState(props.name + (props.country ? '(' + props.country + ')' : ''));
    const [hasImage, setHasImage] = useState(props.hasLogo);
    const [image, setImage] = useState(props.path || '');

    useEffect(() => {
        setName(props.name + (props.country ? '(' + props.country + ')' : ''));
        setHasImage(props.hasLogo);
        setImage(props.path || '');
    }, [props.name, props.country, props.hasLogo, props.path])

    return (
        <>
            <Row>
                <Col xs={hasImage ? 2 : 0}>
                    {hasImage ? <Image src={image} fluid roundedCircle style={{width: "3rem", height: "auto"}} /> : ""}
                </Col>
                <Col xs={hasImage ? 10 : 12}>
                    <span style={{
                    }}>{name}</span>
                </Col>
            </Row>

        </>
    )

}

export default Logo;