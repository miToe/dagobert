import { useEffect, useState } from "react";
import { BackToTopButton } from "@/src/components/styles/StyledBackToTopButton";
import SVGIcon from "@/src/components/SVGIcon";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <BackToTopButton onClick={scrollToTop} visible={isVisible}>
      <SVGIcon iconName="arrow_up" color="var(--neutrals-white)" size="24" />
    </BackToTopButton>
  );
}
