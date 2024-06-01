import React, { useContext } from 'react';
import { Context } from '../../index';
import ListGroup from "react-bootstrap/ListGroup";

import "./CListGroup.css"
import { observer } from 'mobx-react-lite';


const CListGroup = observer(() => {

    const { goods } = useContext(Context);
    return (
        <ListGroup className='type_list_group'>
            {goods.types.map(type =>
                <ListGroup.Item className='type_list_group_item'
                    style={{ cursor: 'pointer' }}
                    active={type.id === goods.selectedType.id}
                    onClick={() => goods.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup >
    );
})

export default CListGroup;