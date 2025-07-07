import Carousel from "../../components/carousel/Carousel"
import Reviews from "../../components/reviews/Reviews"
import Products from "../../Data/Products"
import CategoryCards from "../../components/categorycards";
import Sweetfullcakes from "../../components/sweetfullcakes";
import CorporateCollections from "../../components/corporatecollect";
 import DesignerCollections from "../../components/DesignerCollections";
import FeaturedCollection from "../../components/FeaturedCollection";
import axiosIntance from "../../components/axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [designerProducts, setDesignerProducts] = useState([]);
  const [corporateProducts, setCorporateProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  const getSelectedProducts = async () => {
    setLoading(true);
    const params = {
      customer_type: localStorage?.getItem('user_type') ? localStorage?.getItem('user_type') : 'retail'
    };
    const res = await axiosIntance.get(`/admin/get_homepage_data?customer_type=${params.customer_type}`);
    
    if (res.status === 200) {
      setFeaturedProducts(res?.data?.selectedProducts?.filter(product => product.isFeaturedproducts === 'true'));
      setDesignerProducts(res?.data?.selectedProducts?.filter(product => product.isDesignercollections === 'true'));
      setCorporateProducts(res?.data?.selectedProducts?.filter(product => product.isCorporatecollections === 'true'));
      setBanners(res?.data?.banners);
    } else {
      setFeaturedProducts([]);
      setDesignerProducts([]);
      setCorporateProducts([]);
      setBanners([]);
    }
  }

  useEffect(() => {
    getSelectedProducts();
  }, []);

  return (
    <>
      <div className="mx-auto w-full">
        {banners?.length > 0 && (
          <Carousel data={banners} />
        )}
        <CategoryCards />
        {featuredProducts?.length > 0 && (
          <FeaturedCollection data={featuredProducts} />
        )}
        {designerProducts?.length > 0 && (
          <DesignerCollections data={designerProducts} />
        )}
        <Sweetfullcakes />
        {corporateProducts?.length > 0 && (
          <CorporateCollections data={corporateProducts} />
        )}

        <section className="default-width mx-auto my-3">
          <h2 className="text-2xl poppins-bold tracking-tight pt-5 text-gray-900 text-center">Our Customer Reviews</h2>
          <div className="mt-6">
            <Reviews />
          </div>
        </section>

      </div>
    </>
  )
}
