import Carousel from "../../components/carousel/Carousel"
import Reviews from "../../components/reviews/Reviews"
import Products from "../../Data/Products"
import CategoryCards from "../../components/categorycards";
import Sweetfullcakes from "../../components/sweetfullcakes";
import CorporateCollections from "../../components/corporatecollect";
 import DesignerCollections from "../../components/DesignerCollections";

export default function Home() {
  return (
    <>
      <div className="mx-auto w-full">
        <Carousel />
        <CategoryCards />
        <DesignerCollections />
        <Sweetfullcakes />
        <CorporateCollections />
        

        {/* <h2 className="text-2xl font-bold tracking-tight pt-5 text-gray-900">Featured collection</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Products.map((product) => (
            <div key={product.id} className="group relative shadow-md rounded-lg overflow-hidden group-hover:shadow-lg">
              <img
                alt={product.imageAlt}
                src={'/' + product.imageSrc}
                className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between p-2">
                <div>
                  <p className="text-md">
                    <a href={product.href} className="!text-gray-900 font-medium !no-underline">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </p>
                  <p className="mt-1 text-gray-500">{product.flavour}</p>
                </div>
                <p className="font-medium !text-gray-900">₹ {product.price}</p>
              </div>
            </div>
          ))}
        </div> */}

        {/* 
        <section id="categoreis" className="w-4/5 mx-auto my-3">
          <div class="grid grid-cols-4 gap-4">
            <div class="col-span-2">
              <img src="products/categories/side-banner.jpg" alt="" className="rounded-lg" />
            </div>
            <div class="...">
              <img src="products/categories/1.jpg" alt="" className="rounded-lg" />
            </div>
            <div class="...">
              <img src="products/categories/2.jpg" alt="" className="rounded-lg" />
            </div>

            <div class="...">
              <img src="products/categories/1.jpg" alt="" className="rounded-lg" />
            </div>
            <div class="...">
              <img src="products/categories/2.jpg" alt="" className="rounded-lg" />
            </div>
            <div class="...">
              <img src="products/categories/3.jpg" alt="" className="rounded-lg" />
            </div>
            <div class="...">
              <img src="products/categories/2.jpg" alt="" className="rounded-lg" />
            </div>
          </div>
        </section> */}

        <section className="w-4/5 mx-auto my-3">
          <h2 className="text-2xl font-bold tracking-tight pt-5 text-gray-900 text-center">Our Customer Reviews</h2>
          <div className="mt-6">
            <Reviews />
          </div>
        </section>

      </div>
    </>
  )
}
