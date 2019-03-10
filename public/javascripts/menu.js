$(document).ready(function () {
  //addBok
  $('[name="onlineCheck"]').change(function () {
    if ($('#onlineCheck').is(':checked')) {
      $('#formFileBook').css('display', "block")
      $('#fileBook').attr('required', true)
      $('#amount').attr('disabled', 'disabled')
      $('#amount').attr('required', false)
    } else {
      $('#formFileBook').css('display', "none")
      $('#fileBook').attr('required', false)
      $('#fileBook').val("")
      $('#amount').attr('disabled', false)
      $('#amount').attr('required', true)
    }
  })
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
    $('#descriptionDetail').toggle();
  })
  var currentUrl = window.location.href;
  var url = currentUrl.split("/")[4];
  if (url) {
    $('#detailModal').modal('show');
  }
  //end book
  //register

  $('.passwordR').keyup(() => {
    let Cpassword = $('.confirmPasswordR').val().length
    if (Cpassword != 0) {
      let password = $('.passwordR').val()
      let Cpassword = $('.confirmPasswordR').val()
      if (password != Cpassword) {
        $('.checkMatch').css('display', "block");
        $('.passwordR').css('border-color', 'red');
        $('.confirmPasswordR').css('border-color', 'red')
      } else {
        $('.checkMatch').css('display', "none");
        $('.passwordR').css('border-color', '#ced4da');
        $('.confirmPasswordR').css('border-color', '#ced4da')
      }
    }
  })
  $('.confirmPasswordR').keyup(() => {
    let password = $('.passwordR').val()
    let Cpassword = $('.confirmPasswordR').val()
    if (password != Cpassword) {
      $('.checkMatch').css('display', "block");
      $('.passwordR').css('border-color', 'red');
      $('.confirmPasswordR').css('border-color', 'red')
    } else {
      $('.checkMatch').css('display', "none");
      $('.passwordR').css('border-color', '#ced4da');
      $('.confirmPasswordR').css('border-color', '#ced4da')
    }
  })
  $('.passwordR').blur((event) => {
    let password = $('.passwordR').val().length
    if (String(password) < 6) {
      $('.checkPassword').css('display', 'block')
      $('.passwordR').css('border-color', 'red')

    } else {
      $('.checkPassword').css('display', 'none');
      $('.passwordR').css('border-color', '#ced4da')
    }
  })

  $('.passwordR1').keyup(() => {
    let Cpassword = $('.confirmPasswordR1').val().length
    if (Cpassword != 0) {
      let password = $('.passwordR1').val()
      let Cpassword = $('.confirmPasswordR1').val()
      if (password != Cpassword) {
        $('.checkMatch').css('display', "block");
        $('.passwordR1').css('border-color', 'red');
        $('.confirmPasswordR1').css('border-color', 'red')
      } else {
        $('.checkMatch1').css('display', "none");
        $('.passwordR1').css('border-color', '#ced4da');
        $('.confirmPasswordR1').css('border-color', '#ced4da')
      }
    }
  })
  $('.confirmPasswordR1').keyup(() => {
    let password = $('.passwordR1').val()
    let Cpassword = $('.confirmPasswordR1').val()
    if (password != Cpassword) {
      $('.checkMatch1').css('display', "block");
      $('.passwordR1').css('border-color', 'red');
      $('.confirmPasswordR1').css('border-color', 'red')
    } else {
      $('.checkMatch1').css('display', "none");
      $('.passwordR1').css('border-color', '#ced4da');
      $('.confirmPasswordR1').css('border-color', '#ced4da')
    }
  })
  $('.passwordR1').blur((event) => {
    let password = $('.passwordR1').val().length
    if (String(password) < 6) {
      $('.checkPassword1').css('display', 'block')
      $('.passwordR1').css('border-color', 'red')

    } else {
      $('.checkPassword1').css('display', 'none');
      $('.passwordR1').css('border-color', '#ced4da')
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


  var token = $('#token').text();
  if (token.length > 1) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  if ($('#checkLogin').text() == 'ลงชื่อเข้าใช้สำเร็จ') {
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
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
        // var user = result.data.decode.email;
        // console.log(user)
        var tokenEmail = result.data.decode.email;
        $('.tokenEmail').val(tokenEmail);
        //menu
        $('#menuStatus').click(() => {
          $('#menuStatus').attr('href', '/books/status?email=' + tokenEmail)
        })
        $('#menuHistory').click(() => {
          $('#menuHistory').attr('href', '/books/history?email=' + tokenEmail)
        })
        $('#menuMybooks').click(() => {
          $('#menuMybooks').attr('href', '/books/mybooks?email=' + tokenEmail)
        })
        var status = result.data.decode.status;
        console.log(status)
        if (status == 'admin') {
          $('#comfirmPayment').css('display', 'block')
          $('.amount').removeAttr('max')
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
    if (url != '/' && url && url != '/books' && url != '/users/register') {
      if (url !== '/users/login') {
        window.location.href = '/users/login';
      }
    } else {}
  }

  //select book
  $('#selectBooks').click(() => {
    localStorage.removeItem('book')
  })

  //status Book
  console.log($('#totalStatus').text())
  if (Number($('#totalStatus').text()) > 0) {
    $('#noProduct').css('display', 'none')
    $('#rowTotalStatus').css('display', 'display')
  } else {
    $('#noProduct').css('display', 'display')
    $('#rowTotalStatus').css('display', 'none')
  }

  //menu


});



function post(path) { // update and delete method post
  method = "post";
  var url;
  var isbn = $('#isbnDetail').val();
  var title = $('#titleDetail').val();
  var price = $('#priceDetail').val();
  var description = $('#descriptionDetail').val();
  var amount = $('.amount').val();
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
  let passwordLength = $('.passwordR').val().length || $('.passwordR1').val().length
  let password = $('.passwordR').val() || $('.passwordR1').val()
  let Cpassword = $('.confirmPasswordR').val() || $('.confirmPasswordR1').val()
  if (String(passwordLength) < 6) {
    $('.checkPassword').css('display', 'block')
    $('.passwordR').css('border-color', 'red')
    $('.checkPassword1').css('display', 'block')
    $('.passwordR1').css('border-color', 'red')

  } else if (password != Cpassword) {
    $('.checkMatch').css('display', "block");
    $('.passwordR').css('border-color', 'red');
    $('.confirmPasswordR').css('border-color', 'red')
    $('.checkMatch1').css('display', "block");
    $('.passwordR1').css('border-color', 'red');
    $('.confirmPasswordR1').css('border-color', 'red')
  } else {
    $('.checkMatch').css('display', "none");
    $('.checkMatch').css('display', "none");
    $('.passwordR').css('border-color', '#ced4da');
    $('.confirmPasswordR').css('border-color', '#ced4da')
    $('.checkMatch1').css('display', "none");
    $('.checkMatch1').css('display', "none");
    $('.passwordR1').css('border-color', '#ced4da');
    $('.confirmPasswordR1').css('border-color', '#ced4da')
    method = 'post';
    var name = $('.nameR').val() || $('.nameR1').val();
    var lastName = $('.lastNameR').val() || $('.lastNameR1').val();
    var email = $('.emailR').val() || $('.emailR1').val();
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


// select book
var getLocalCart = JSON.parse(localStorage.getItem('book')) || [];
var showAmount = 0;
//$('#showCart tr td:nth-last-child(-n+1)').css('background', '#CCC');



getLocalCart.forEach(item => {
  var getToken = JSON.parse(localStorage.getItem("token"));
  showAmount += item.amount;
  $('#amountCart').text(showAmount)
  var amountDetail = Number($('#amountDetail' + item.bookId).attr('max'))
  var selectAmount = Number($('#selectAmount' + item.bookId).text());
  var price = Number($('#selectPrice' + item.bookId).text());
  var selectAmountSum = selectAmount + item.amount;
  var selectSum = (selectAmountSum * price);
  var newAmountDetail = amountDetail - item.amount;
  $('#amountDetail' + item.bookId).attr('max', newAmountDetail)
  $('#count' + item.bookId).text(newAmountDetail);
  $('#selectAmount' + item.bookId).text(selectAmountSum);
  $('#hideSelectAmount' + item.bookId).val(selectAmountSum);
  $('#selectSum' + item.bookId).text(selectSum);
  $('#selectSum' + item.bookId).val(selectSum);
  $('#hideSelectSum' + item.bookId).val(selectSum);
  $('#selectId' + item.bookId).css('display', '')
  if ($('#countBook' + item.bookId).text() == 'หนังสือออนไลน์') {
    $('#btnSelect' + item.bookId).attr('disabled', 'desabled')
  }
  if (newAmountDetail <= 0) {
    $('#amountDetail' + item.bookId).attr('disabled', 'disabled')
    $('#btnSelect' + item.bookId).attr('disabled', 'desabled')
    $('#sorry' + item.bookId).css('display', 'block')
    $('#countBook' + item.bookId).css('display', 'none')
  }
})



$('.price').each(function () {
  calculateSum();
});

function calculateSum() {
  var sum = 0;
  $(".price").each(function () {
    if (!isNaN(this.value) && this.value.length != 0) {
      sum += parseFloat(this.value);
    }
  });
  $('#total').text(sum);
}
var total = Number($('#total').text())
if (total == 0) {
  $('#rowTotal').css('display', 'none');
  $('#selectBooks').css('display', 'none');
  $('#rowText').css('display', 'display');
} else {
  $('#selectBooks').css('display', 'display')
  $('#rowTotal').css('display', 'display');
  $('#rowText').css('display', 'none');
}

function cancel(idBook) {
  var id = $(idBook).attr('newId');

  let newLocal = getLocalCart.filter((localCart) => {
    return localCart.bookId != id;
  })

  localStorage.removeItem('book')
  localStorage.setItem('book', JSON.stringify(newLocal));
  window.location.href = "/books/select"
}

function select(idBook) {
  var getToken = JSON.parse(localStorage.getItem("token"));
  if (getToken) {
    var id = $(idBook).attr('id1');
    var isbn = $('#isbnDetail').val();
    var title = $('#titleDetail').val();
    var description = $('#descriptionDetail').val();
    var amount = Number($('#amountDetail' + id).val());
    var max = Number($('#amountDetail' + id).attr('max'));
    if (amount < 0) {
      return;
    }

    if (amount > max) {
      amount = max;

    }
    if ($('#countBook' + id).text() == 'หนังสือออนไลน์') {
      $('#btnSelect' + id).attr('disabled', 'desabled')
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