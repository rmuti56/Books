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
  //end book
  //register
  $('#login').click(() => {
    $('#loginModal').modal('show');
  })
  $('#registerLabel').click(() => {
    $('#loginModal').modal('hide');
    $('#registerModal').modal('show');
  })
  $('#loginLabel').click(() => {
    $('#registerModal').modal('hide');
    $('#loginModal').modal('show');
  })
  $('#passwordR').blur((event) => {
    let password = $('#passwordR').val().length
    if (String(password) < 6) {
      $('#checkPassword').css('display', 'block')
      $('#passwordR').css('border-color', 'red')

    } else {
      $('#checkPassword').css('display', 'none');
      $('#passwordR').css('border-color', '#ced4da')
    }
  })
  $('#passwordR').keyup(() => {
    let Cpassword = $('#confirmPasswordR').val().length
    if (Cpassword != 0) {
      let password = $('#passwordR').val()
      let Cpassword = $('#confirmPasswordR').val()
      if (password != Cpassword) {
        $('#checkMatch').css('display', "block");
        $('#passwordR').css('border-color', 'red');
        $('#confirmPasswordR').css('border-color', 'red')
      } else {
        $('#checkMatch').css('display', "none");
        $('#passwordR').css('border-color', '#ced4da');
        $('#confirmPasswordR').css('border-color', '#ced4da')
      }
    }
  })
  $('#confirmPasswordR').keyup(() => {
    let password = $('#passwordR').val()
    let Cpassword = $('#confirmPasswordR').val()
    if (password != Cpassword) {
      $('#checkMatch').css('display', "block");
      $('#passwordR').css('border-color', 'red');
      $('#confirmPasswordR').css('border-color', 'red')
    } else {
      $('#checkMatch').css('display', "none");
      $('#passwordR').css('border-color', '#ced4da');
      $('#confirmPasswordR').css('border-color', '#ced4da')
    }
  })
  //end register
  //login

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

function register() {
  let passwordLength = $('#passwordR').val().length
  let password = $('#passwordR').val()
  let Cpassword = $('#confirmPasswordR').val()
  if (String(passwordLength) < 6) {
    $('#checkPassword').css('display', 'block')
    $('#passwordR').css('border-color', 'red')

  } else if (password != Cpassword) {
    $('#checkMatch').css('display', "block");
    $('#passwordR').css('border-color', 'red');
    $('#confirmPasswordR').css('border-color', 'red')
  } else {
    $('#checkMatch').css('display', "none");
    $('#checkMatch').css('display', "none");
    $('#passwordR').css('border-color', '#ced4da');
    $('#confirmPasswordR').css('border-color', '#ced4da')
    method = 'post';
    var name = $('#nameR').val();
    var lastName = $('#lastNameR').val();
    var email = $('#emailR').val();
    var form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', '/users/register');
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", 'name');
    hiddenField.setAttribute("value", name);
    form.appendChild(hiddenField);
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'lastName');
    hiddenField.setAttribute('value', lastName);
    form.appendChild(hiddenField);
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'email');
    hiddenField.setAttribute('value', email);
    form.appendChild(hiddenField);
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'password');
    hiddenField.setAttribute('value', password);
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