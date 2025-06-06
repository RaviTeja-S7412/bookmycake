import Carousel from "../../components/carousel/Carousel"
import Reviews from "../../components/reviews/Reviews"
import Products from "../../Data/Products"
import CategoryCards from "../../components/categorycards";
import Sweetfullcakes from "../../components/sweetfullcakes";
import CorporateCollections from "../../components/corporatecollect";
 import DesignerCollections from "../../components/DesignerCollections";
import FeaturedCollection from "../../components/FeaturedCollection";

export default function Home() {
  return (
    <>
      <div className="mx-auto w-full">
        <Carousel />
        <CategoryCards />
        <FeaturedCollection />
        <DesignerCollections />
        <Sweetfullcakes />
        <CorporateCollections />

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
