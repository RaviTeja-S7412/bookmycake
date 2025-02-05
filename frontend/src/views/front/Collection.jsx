

import { NavItem } from "react-bootstrap"; 
import CakeCard2 from "../../components/front/UserPageComponents/CakeCard2";
import CakeCollections from "../../Data/CakeCollections";

const Collections = () => {
    return (
        <div className="container">
            <div className="py-3">
            <h1>Collections</h1>
            <div className="row">
                {CakeCollections.map((item) => (
                    <div className="col-md-4 mb-5 " key={item.collectionName} >
                    <CakeCard2 
                        key={item.collectionName} 
                        product_collection={item.collectionName} 
                        product_image_url={item.collectionImage} 
                        product_name={item.collectionName} 
                    />
                    </div>
                   
                ))}
            </div>

            </div>
            
        </div>
    );
};

export default Collections;