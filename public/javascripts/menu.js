$(document).ready(function () {
  $('#bookTable').DataTable({
    pageLength: 25
  });
  var test = $('#test').val();
  $(".navbar  .nav-link").on("click", function () {
    console.log("click")
    $(".navbar ").find(".active").removeClass("active");
    $(this).addClass("active");
  });
  $('#addBook').click(() => {
    $('#addModal').modal('show');
  })
  $('#hideShow').click(() => {
    $('#description').toggle();
  })
  var currentUrl = window.location.href;
  var url = currentUrl.split("/")[4];
  if (url) {
    $('#detailModal').modal('show');
  }
})

function post(path) {
  method = "post";
  var url;
  var isbn = $('#isbnDetail').val();
  var title = $('#titleDetail').val();
  var price = $('#priceDetail').val();
  var description = $('#description').val();
  var id = $(path).attr('id');
  if ($(path).attr('data') == 'delete') {
    url = 'delete'
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", '/books/' + url + '/' + id);
    document.body.appendChild(form);
    form.submit();
  } else {
    url = 'update'
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", '/books/' + url + '/' + id);
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", 'isbn');
    hiddenField.setAttribute("value", isbn);
    form.appendChild(hiddenField);
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", 'title');
    hiddenField.setAttribute("value", title);
    form.appendChild(hiddenField);
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", 'price');
    hiddenField.setAttribute("value", price);
    form.appendChild(hiddenField);
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", 'description');
    hiddenField.setAttribute("value", description);
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
  }

}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#blah')
        .attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
    $('#blah').css('display', "block")
  }
}