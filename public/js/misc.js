var resize = document.querySelector("#resizeThis");
var rBody = document.querySelector("#idea-body");

window.addEventListener("resize", function() {
  if (window.innerWidth < 995){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    resize.classList.remove("scroll-card");
    rBody.classList.remove("cOverflow");
  }
  else{
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    resize.classList.add("scroll-card");
    rBody.classList.add("cOverflow");
  }
});
