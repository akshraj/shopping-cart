import React from 'react'
import SHOP_DATA from '../../shop.data'
import PreviewCollection from '../../components/preview-collection/preview-collection.component'

const ShopPage = () => {
    return(
        <div>
            {
                SHOP_DATA.map(({id, ...otherCollectionProps}) => <PreviewCollection key={id} {...otherCollectionProps}/>)
            }
        </div>
    )
}

export default ShopPage