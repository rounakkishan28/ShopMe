import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to <span className='text-violet-600'>ShopMe</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your go-to destination for the latest electronics!
        </p>
      </div>

      {/* About Content Section */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-700">
            Who We Are
          </h2>
          <p className="text-gray-600 text-lg">
            At ShopMe, we are passionate about technology and bringing the best
            electronics right to your doorstep. With a wide range of products
            from top brands, we aim to provide you with the most up-to-date
            gadgets that fit your needs and budget.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-700">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg">
            Our mission is to offer a seamless shopping experience by providing
            the latest electronic products with fast and reliable delivery.
            ShopMe is committed to quality and customer satisfaction at every
            step.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-semibold text-center text-gray-700">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">
          <div className="p-6 bg-white shadow-md hover:shadow-lg hover:shadow-violet-500 transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">Innovation</h3>
            <p className="mt-4 text-gray-600">
              We strive to bring you the latest in tech innovation, with
              cutting-edge gadgets.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md hover:shadow-lg hover:shadow-violet-500 transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">Quality</h3>
            <p className="mt-4 text-gray-600">
              We partner with top brands to ensure you receive high-quality
              products every time.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md hover:shadow-lg hover:shadow-violet-500 transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">Customer First</h3>
            <p className="mt-4 text-gray-600">
              Your satisfaction is our top priority. We are here to support you
              every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
