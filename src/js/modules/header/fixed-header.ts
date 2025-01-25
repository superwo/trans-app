export default function fixedHeader() {
  const header = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        if (!header?.classList.contains("active")) {
          header?.classList.add("active");
        }
      }else{
        if (header?.classList.contains("active")) {
          header?.classList.remove("active");
        }
      }
  });
}

