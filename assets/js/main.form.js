///////////////////////////////////////////////////////////////////////////
/*SET PLACEHOLDER*/
function formPlaceholder() {
  $('.feedback form').on('click', '.pl', function() {
    $(this).prev().trigger("focus");
  });

  $('.feedback input[type="text"],.feedback textarea')
    .on('keydown', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    })
    .each(function() {
      if (!$(this).val()) {
        $(this).after($("<div/>").addClass("pl").html($(this).attr("data-placeholder").replace("*", "<span class='star'>*</span>")));
      }
    })
    .focusin(function() {
      if ($(this).next().is(".pl")) {
        $(this).next().remove();
      }
    })
    .focusout(function() {
      var pos = $(this).position();
      if (!$(this).val()) {
        $(this).after($("<div/>").addClass("pl").html($(this).attr("data-placeholder").replace("*", "<span class='star'>*</span>")));
      }
    });
};

/*SHOWING ERRORS*/
function formShowErrors(errorMap, errorList) {
  $.each(this.validElements(), function(index, element) {
    var $element = $(element);
    $element.parent().find(".error-label").remove();
    $element.data("title", "").removeClass("error");
  });
  $.each(errorList, function(index, error) {
    var $element = $(error.element);
    $element.parent().find(".error-label").remove();
  });
  $.each(errorList, function(index, error) {
    var $element = $(error.element);
    $element.data("title", error.message).addClass("error");
    //        if (index == 0) {
    //            $element.parent().find(".error-label").remove();
    if ($element.next().is(".pl")) {
      $element = $element.next();
    }
    $element.after($("<div/>").addClass("error-label").text(error.message));
    //        }
  });
}
/*SUBMIT EVENT*/
function popupFormSubmit(container, submit_label) {

  if (!container) {
    return;
  }

  var form = $("form", container)[0];

  var err_name = $('input[name="name"]', form).attr('data-error');
  var err_phone = $('input[name="phone"]', form).attr('data-error');

  /* Phone mask */
  $('input[name="phone"]').inputmask({
    mask: '+7 ( 999 ) 999-99-99',
    showMaskOnHover: false,
    onincomplete: function() {
      this.value = $(this).val().replace(/_/g, "");
    }
  });

  /*CHECK UP THE PHONE*/
  jQuery.validator.addMethod("phone", function(value, element) {
    value = value.replace(/_/g, "");
    return this.optional(element) || (/^[\+ \+(\+)\+-\d]+$/i.test(value) && value.length == 20);
  }, "Введите правильный телефон");

  /*CHECK UP THE NAME*/
  jQuery.validator.addMethod("alpha", function(value, element) {
    return this.optional(element) || (/^[A-Za-zА-Яа-я| \-]+$/i.test(value));
  }, "Введите правильное имя");

  /*FORM VALIDATE*/
  $(form).validate({
    ignore: "",
    onfocusin: null,
    onfocusout: null,
    onclick: null,
    showErrors: formShowErrors,
    messages: {
      name: {
        required: err_name
      },
      phone: {
        required: err_phone
      },
    },
    rules: {
      name: {
        required: true,
        alpha: true,
      },
      phone: {
        required: true,
        phone: true,
      },
    },
    submitHandler: function(form) {
      $("input[type=submit]", container).val(' ').attr("disabled", "true").css({
        backgroundImage: "url(/img/loader.gif)",
        backgroundRepeat: " no-repeat",
        backgroundPosition: "50%"
      });

      $.ajax({
        url: $(form).attr("action"),
        type: 'post',
        dataType: 'json',
        data: $(form).serialize(),
        success: function(result) {
          $("input[type=submit]", container).removeAttr("disabled").css({
            backgroundImage: "none"
          }).val('Жду звонка');
          if (!result || result == "0") {
            alert("Во время отправки произошла ошибка, проверьте корректность введенных данных и попробуйте ещё раз.");
            return;
          } else if (result.errors) {
            return;
          }
          $(form).fadeOut(400);
          $('.feedback__info', container).fadeIn(500).animate({
            'top': '30%'
          }, 500);

          setTimeout(function() {
            $.fancybox.close(true);
          }, 5000);
        },
        error: function() {
          $("input[type=submit]", container).removeAttr("disabled").css({
            backgroundImage: "none"
          }).val('Жду звонка');
          alert("Во время отправки произошла ошибка, проверьте корректность введенных данных и попробуйте ещё раз.");
        },

      });
      return false;
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////
function fancyBoxShow() {
  $(".fancybox, .galery").fancybox({
    loop: true,
    padding: 0,
    margin: 30,
    minWidth: 200,
    maxHeight: 800,
    fitToView: true,
    width: '95%',
    height: '95%',
    autoSize: true,
    openEffect: 'fade',
    closeEffect: 'fade',
    openSpeed: 600,
    closeSpeed: 600,
    nextEffect: 'elastic',
    prevEffect: 'elastic',
    tpl: {
      closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
      next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
      prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
    },
    beforeShow: function() {
      $("body,html").css({
        'overflow-y': 'hidden'
      });
    },
    afterClose: function() {
      $("body,html").css({
        'overflow-y': 'visible'
      });
    },
    helpers: {
      title: {
        type: 'outside'
      },
      overlay: {
        locked: true,
        css: {
          background: 'rgba(0, 0, 0, 0.8)'
        }
      }
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
  //
  // отправка формы
  popupFormSubmit($("#feedback_call")[0]);
  popupFormSubmit($("#feedback_kons")[0]);
  popupFormSubmit($("#feedback_usluga")[0]);
  //
  // placeholder для формы
  formPlaceholder();
  //
  // инициализация FANCYBOX
  fancyBoxShow();
});
