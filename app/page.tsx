import Hero from "@/components/hero";
import Projects from "@/components/Projects";
import Work from "@/components/Work";
import Divider from "@/components/ui/divider";
import GalleryComponent from "@/components/gallery-component";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black overflow-x-hidden">
      <div className="w-full pt-[66px]">
        <Hero />
        <Divider />
        <div id="projects">
          <Projects />
        </div>
        <Divider />

        <Work />
        <Divider />

        <GalleryComponent />

        <Divider />
        <div id="contact">
          <ContactSection />
        </div>
        <Divider />
      </div>
    </div>
  );
}
