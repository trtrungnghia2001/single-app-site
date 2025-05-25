import { testimonialData } from "@/constants";
import Wrapper from "../layouts/Wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Testimonial = () => {
  return (
    <section className="section" id="testimonial">
      <Wrapper className="space-y-16">
        <div className="text-center space-y-1">
          <h2>Testimonial</h2>
          <p className="text-text-2">My client saying</p>
        </div>
        <div>
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {testimonialData.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="sm:basis-1/2 md:basis-1/3 py-1"
                >
                  <div className="shadow rounded-xl overflow-hidden p-5 border text-center">
                    <div className="aspect-square w-12 overflow-hidden rounded-full mx-auto">
                      <img
                        src={item.image}
                        alt="avatar"
                        loading="lazy"
                        className="image"
                      />
                    </div>
                    <h6 className="mt-4 mb-1">{item.title}</h6>
                    <p className="text-text-2">{item.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </Wrapper>
    </section>
  );
};

export default Testimonial;
