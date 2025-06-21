const BannerHome = () => {
  return (
    <section className="h-[500px] bg-cover bg-no-repeat bg-center bg-black">
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white">
            Your Trade Our Expertise
          </h1>
          <p className="text-2xl mt-4 text-white">
            The best place to buy and sell your Stocks
          </p>
          <button className="mt-8 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerHome;
