
import React, { useContext } from 'react';
import { Context } from '../../index';
import { observer } from "mobx-react-lite";
import { Tab } from 'react-tabs';

const CategoryTab = observer(() => {

    const goods = useContext(Context);
    return (
        goods.categories.map(cat =>
            <Tab>
                {cat.name}
                console.log("dsa");
            </Tab>
        )
    );
});

export default CategoryTab;