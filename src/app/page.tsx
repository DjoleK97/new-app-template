import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import ProductCategories from "@/components/product-categories";
import FeaturedProducts from "@/components/featured-products";
import HowToOrder from "@/components/how-to-order";
import WhyChooseUs from "@/components/why-choose-us";
import FarmStories from "@/components/farm-stories";
import Contact from "@/components/contact";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white font-quicksand">
      <Navbar />
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <HowToOrder />
      <WhyChooseUs />
      <FarmStories />
      <Contact />
      <Footer />
    </div>
  );
}
