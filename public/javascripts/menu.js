$(document).ready(function () {
  $('#bookTable').DataTable({});
  var test = $('#test').val();
  $(".navbar  .nav-link").on("click", function () {
    console.log("click")
    $(".navbar ").find(".active").removeClass("active");
    $(this).addClass("active");
  });
  $('#backBook').click(() => {
    window.location.href = "http://localhost:3000/books";
  })

  $("#addBook").click(() => {
    window.location.href = "http://localhost:3000/books/add";
  })
})