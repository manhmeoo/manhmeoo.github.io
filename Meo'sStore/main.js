//load header footer
$(function () {
  $("#header").load("header.html");
  $("#footer").load("footer.html");
});

//back to top btn
let toTopButton = document.getElementById("toTopButton");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
