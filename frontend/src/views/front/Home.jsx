import Carousel from "../../components/carousel/Carousel"
import Reviews from "../../components/reviews/Reviews"
import Products from "../../Data/Products"
import CategoryCards from "../../components/categorycards";
import BirthdayCollection from "../../components/BirthdayCollection";
import Sweetfullcakes from "../../components/sweetfullcakes";
import CorporateCollections from "../../components/corporatecollect";
import DesignerCollections from "../../components/DesignerCollections";
import FeaturedCollection from "../../components/FeaturedCollection";
import axiosIntance from "../../components/axios";
import { useEffect, useState } from "react";
import Spinner from "../../components/front/Spinner";
import Pastries from "../../components/Pastries";
import IndianCollection from "../../components/IndianCollection";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [designerProducts, setDesignerProducts] = useState([]);
  const [corporateProducts, setCorporateProducts] = useState([]);
  const [birthdayCollections, setBirthdaycollections] = useState([]);
  const [pastries_smallcakes, setPastriessmallcakes] = useState([]);
  const [indian_fusioncakes, setIndianfusioncakes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  const getSelectedProducts = async () => {
    setLoading(true);
    const user_id = localStorage.getItem('user_id');
    const params = {
      customer_type: localStorage?.getItem('user_type') ? localStorage?.getItem('user_type') : 'retail'
    };
    if(user_id) {
      params.user_id = user_id;
    }
    const res = await axiosIntance.get(`/admin/get_homepage_data?customer_type=${params.customer_type}&user_id=${params.user_id}`);

    if (res.status === 200) {
      setFeaturedProducts(res?.data?.selectedProducts?.filter(product => product.isFeaturedproducts === 'true'));
      setDesignerProducts(res?.data?.selectedProducts?.filter(product => product.isDesignercollections === 'true'));
      setCorporateProducts(res?.data?.selectedProducts?.filter(product => product.isCorporatecollections === 'true'));
      setBirthdaycollections(res?.data?.selectedProducts?.filter(product => product.isBirthdaycollection === 'true'));
      setPastriessmallcakes(res?.data?.selectedProducts?.filter(product => product.isPastries === 'true'));
      setIndianfusioncakes(res?.data?.selectedProducts?.filter(product => product.isIndianfusioncakes === 'true'));
      setBanners(res?.data?.banners);
      setCategories(res?.data?.categories);
      setReviews(res?.data?.reviews);
    } else {
      setFeaturedProducts([]);
      setDesignerProducts([]);
      setCorporateProducts([]);
      setBirthdaycollections([]);
      setPastriessmallcakes([]);
      setIndianfusioncakes([]);
      setBanners([]);
      setCategories([]);
      setReviews([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    getSelectedProducts();
  }, []);
  

  return (
    <>
    {loading ? <Spinner /> : (
      <div className="mx-auto w-full">
        {banners?.length > 0 && (
          <Carousel data={banners} />
        )}
        <CategoryCards categories={categories} />
        {featuredProducts?.length > 0 && (
          <FeaturedCollection data={featuredProducts} />
        )}
        {designerProducts?.length > 0 && (
          <DesignerCollections data={designerProducts} />
        )}
        <Sweetfullcakes />
        <BirthdayCollection data={birthdayCollections} />
        <Pastries data={pastries_smallcakes} />
        {corporateProducts?.length > 0 && (
          <CorporateCollections data={corporateProducts} />
        )}
        <section className="default-width mx-auto my-0">
          <h2 className="text-2xl poppins-bold tracking-tight pt-4 text-gray-900 text-center">What our Customers say about BMC</h2>
          <div className="mt-6">
            <Reviews data={reviews} />
          </div>
        </section>
        <IndianCollection data={indian_fusioncakes} />

        </div>
      )}
    </>
  )
}
