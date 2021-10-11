$(function () {
  // ------------------------------------------------------- //
  // Scroll Top Button
  // ------------------------------------------------------- //
  $('#scrollTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 1500);
  });

  var c,
    currentScrollTop = 0,
    navbar = $('.navbar');
  $(window).on('scroll', function () {
    // Navbar functionality
    var a = $(window).scrollTop(),
      b = navbar.height();

    currentScrollTop = a;
    if (c < currentScrollTop && a > b + b) {
      navbar.addClass('scrollUp');
    } else if (c > currentScrollTop && !(a <= b)) {
      navbar.removeClass('scrollUp');
    }
    c = currentScrollTop;

    if ($(window).scrollTop() >= 500) {
      $('#scrollTop').addClass('active');
    } else {
      $('#scrollTop').removeClass('active');
    }
  });

  // ---------------------------------------------------------- //
  // Preventing URL update on navigation link click
  // ---------------------------------------------------------- //
  $('.link-scroll').on('click', function (e) {
    var anchor = $(this);
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr('href')).offset().top,
        },
        1000
      );
    e.preventDefault();
  });

  // ---------------------------------------------------------- //
  // Scroll Spy
  // ---------------------------------------------------------- //
  $('body').scrollspy({
    target: '#navbarSupportedContent',
    offset: 80,
  });

  // ------------------------------------------------------- //
  // Navbar Toggler Button
  // ------------------------------------------------------- //
  $('.navbar .navbar-toggler').on('click', function () {
    $(this).toggleClass('active');
  });
});

const FormButton = document.querySelector('.newsletterForm button');

FormButton.addEventListener('click', e => {
    e.preventDefault();
    const textInput = document.querySelector('.newsletterForm input');
    const errorEl = document.querySelector('.error_isActiveText');
    const success = document.querySelector('success_isActiveText');
    validate(FormButton, textInput, errorEl, success);
});

const validate = async (buttonEl, inputField, errorField, successField) => {
    const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (inputField.value.length == 0) {
    inputField.classList.add('error_active');
    errorField.innerHTML = "Email field cannot be empty";
    errorField.style.display = 'block';
    setTimeout(() => {
        inputField.classList.remove('error_active');
        errorField.innerHTML = '';
        errorField.style.display = 'none';
    }, 3000);
    } else if (re.test(String(inputField.value).toLowerCase()) !== true) {
    inputField.classList.add('error_active');
    errorField.innerHTML = "Please provide a valid email address";
    errorField.style.display = 'block';
    setTimeout(() => {
        inputField.classList.remove('error_active');
        errorField.innerHTML = '';
        errorField.style.display = 'none';
    }, 3000);
    } else {
    try {
        buttonEl.innerHTML = '';
        buttonEl.style.display = 'flex';
        buttonEl.style.justifyContent = 'center';
        buttonEl.style.alignItems = 'center';
        const newSpan = document.createElement('div');
        buttonEl.disabled = true;
        newSpan.classList.add('loader');
        buttonEl.appendChild(newSpan);
        const response = await fetch(
          'https://newsletterfaraday.herokuapp.com/api/users/add',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: inputField.value }),
          }
        );
        if (response.status !== 201) {
        buttonEl.innerHTML = 'Request Access';
        buttonEl.disabled = false;
        inputField.classList.add('error_active');
        errorField.innerHTML = 'This email is already subscribed';
        errorField.style.display = 'block';
        setTimeout(() => {
            inputField.classList.remove('error_active');
            errorField.innerHTML = '';
            errorField.style.display = 'none';
        }, 3000);
        } else {
        inputField.value = '';
        successField.innerHTML = "Thank you for subscribing"
        buttonEl.innerHTML = 'Request Access';
        }
    } catch (e) {
        buttonEl.innerHTML = 'Request Access';
        buttonEl.disabled = false;
        errorField.innerHTML = 'Something went wrong, please try again';
    }
    }
};


