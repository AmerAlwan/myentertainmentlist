import React, {Component, useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import Logo from './Logo';
import '../mediaCard.css';

export function MediaListCard(props) {

    const getLogos = () => {
        if (!props.list) return [];
        // console.table(this.props.list);
        // console.log(this.props.idValue);
        return props.list.map((item, index) =>
            <ul key={props.idValue ? item[props.idValue ? props.idValue : "id"] : index}>
                <li
                    key={props.idValue ? item[props.idValue ? props.idValue : "id"] : index}
                    style={{listStyle: "none"}}>
                    <Logo path={item.logo_path} hasLogo={props.hasLogo}
                          name={item[props.nameValue ? props.nameValue : "name"]}
                          country={item.origin_country}/>
                </li>
            </ul>
        )
    }

    const [logos, setLogos] = useState(getLogos());
    const [title, setTitle] = useState(props.title);

    useEffect(() => {
        setLogos(getLogos());
        setTitle(props.title);
    }, [props.list, props.idValue, props.nameValue, props.hasLogo, props.title, props.id])

    return (
        <>
            <div className="mediaCardBox" style={{maxWidth: "350px"}}>
                <Row>
                    <Col xs={12}>
                        <h3 className="mediaCardTitle">{title}</h3>
                        {logos}
                    </Col>
                </Row>
            </div>

        </>
    )
}