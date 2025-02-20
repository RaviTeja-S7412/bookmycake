import Products from "../../Data/Products"

  export default function Example() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured collection</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Products.map((product) => (
              <div key={product.id} className="group relative shadow-md rounded-lg overflow-hidden group-hover:shadow-lg">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
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
          </div>
        </div>
      </div>
    )
  }
  