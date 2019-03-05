$(document).ready(function () {
  $('#bookTable').DataTable({
    pageLength: 25
  });
  var test = $('#test').val();
  $(".navbar  .nav-link").on("click", function () {
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

  var token = $('#token').text();
  if (token.length > 1) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  var getToken = JSON.parse(localStorage.getItem("token"));
  if (getToken) {
    axios({
      method: "get",
      url: 'https://us-central1-books-58c22.cloudfunctions.net/jwt/check',
      headers: {
        token: getToken
      }
    }).then(result => {
      if (result.data.message === 'Failed to authenticate token') {
        localStorage.removeItem('token')
        localStorage.removeItem('book')
        var url = window.location.pathname;
        if (url == '/users') {
          if (url !== '/users/login') {
            window.location.href = '/users/login';
          }
        }
      } else {
        var status = result.data.decode.status;
        if (status == 'admin') {
          $(':input').removeAttr('disabled')
          $('#addBook').css('display', 'block')
          $('#edit').css('display', 'block')
          $('#delete').css('display', 'block')
        }
        $('#login').text('ออกจากระบบ')
        $('#login').click(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('book')
          window.location.href = '/';
        })

      }
    }).catch(e => {
      console.log(e);
    })
  } else {
    var url = window.location.pathname;
    if (url == '/users' || url == '/books/select') {
      if (url !== '/users/login') {
        window.location.href = '/users/login';
      }
    }
  }

  //select book


})

function post(path) { // update and delete method post
  method = "post";
  var url;
  var isbn = $('#isbnDetail').val();
  var title = $('#titleDetail').val();
  var price = $('#priceDetail').val();
  var description = $('#descriptionDetail').val();
  var amount = $('#amountDetail').val();
  var id = $(path).attr('id1');
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
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", 'amount');
    hiddenField.setAttribute("value", amount);
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


var getLocalCart = JSON.parse(localStorage.getItem('book')) || [];
var showAmount = 0;
getLocalCart.forEach(item => {
  showAmount += item.amount
  $('#amountCart').text(showAmount)
  var amountDetail = Number($('#amountDetail' + item.bookId).attr('max'))
  var newAmountDetail = amountDetail - item.amount;
  var newItemAmount;
  newItemAmount += item.amount;
  console(newItemAmount);

  $('#amountDetail' + item.bookId).attr('max', newAmountDetail)
  $('#count' + item.bookId).text(newAmountDetail);
  if (newAmountDetail <= 0) {
    $('#amountDetail' + item.bookId).attr('disabled', 'disabled')
    $('#btnSelect' + item.bookId).attr('disabled', 'desabled')
    $('#sorry' + item.bookId).css('display', 'block')
    $('#countBook' + item.bookId).css('display', 'none')
  }
})

function select(idBook) {
  var getToken = JSON.parse(localStorage.getItem("token"));
  if (getToken) {
    var id = $(idBook).attr('id1');
    var isbn = $('#isbnDetail').val();
    var title = $('#titleDetail').val();
    var description = $('#descriptionDetail').val();
    var amount = $('#amountDetail' + id).val();
    var max = $('#amountDetail' + id).attr('max');
    if (amount < 0) {
      return;
    }
    if (amount > max) {
      amount = max;
    }
    var newMax = max - amount;
    if (newMax <= 0) {
      $('#amountDetail' + id).attr('disabled', 'disabled')
      $('#btnSelect' + id).attr('disabled', 'desabled')
      $('#sorry' + id).css('display', 'block')
      $('#countBook' + id).css('display', 'none')
    }
    $('#amountDetail' + id).attr('max', newMax)
    $('#count' + id).text(newMax);
    var book = {
      bookId: id,
      isbn: isbn,
      title: title,
      description: description,
      amount: Number(amount)
    }
    getLocalCart.push(book)
    localStorage.setItem('book', JSON.stringify(getLocalCart));
    $('#detailModal').modal('hide')
    window.location.href = ('/books')
  } else {
    window.location.href = '/users/login'
  }
}