
$(document).ready(function() {


  var $neft = $('.neft');
  var s = Snap(".neft__svg");
  var neftObjects = new Array();

  $(document).on('click', $neft, function(e) {
    console.log(e.offsetX, e.offsetY);
  });

  var neftObejectsParams = {
    'kluch': {
      caption: 'Ключи буровые АКБ',
      edge: 'M593 525 602 413 629 414 636 380 687 377 684 414 714 417 707 525 Z',
      png: 'public/images/kluch_color.png',
      gif: 'public/images/kluch_color.gif'
    },
    'pult': {
      caption: 'Пульт',
      edge: 'M726 515 728 415 790 419 789 513 Z',
      png: 'public/images/pult_color.png',
      gif: 'public/images/pult_color.gif'
    },
    'zapchasti': {
      caption: 'Запасные части',
      edge: 'M890 425 825 384 827 358 847 335 939 283 1005 321 1009 362 946 395 943 420 Z',
      png: 'public/images/zapchasti_color.png'
    },
    'nasos': {
      caption: 'Насосное оборудование типа НБ',
      edge: 'M751 338 752 279 782 242 865 249 898 290 782 359 Z',
      png: 'public/images/nasos_color.png'
    },
    'manifold': {
      caption: 'Манифольд',
      edge: 'M548 340 614 334 638 301 672 284 734 284 738 338 632 370 615 401 563 410 Z',
      png: 'public/images/manifold_color.png'
    },
    'agregatu': {
      caption: 'Цементировочные агрегаты',
      edge: 'M510 238 567 174 705 113 744 136 749 200 575 287 Z',
      png: 'public/images/agregatu_color.png'
    },
    'service_remont': {
      caption: 'Серсис и ремонт',
      edge: 'M326 248 342 148 583 41 628 71 628 141 401 238 337 254 Z',
      png: 'public/images/service_remont_color.png'
    },
    'stanki': {
      caption: 'Станки качалки',
      edge: 'M309 446 314 261 527 336 553 427 479 474 424 474 Z',
      png: 'public/images/kachalka_color.png',
      gif: 'public/images/kachalka_color.gif'
    },
    'kachalka': {
      caption: 'Глубинные штанговые насосы',
      edge: 'M402 588 404 492 430 506 429 600 Z',
      png: 'public/images/kachalka_color.png',
      gif: 'public/images/kachalka_color.gif'
    }

  };


  $.each(neftObejectsParams, function(name, params) {
    var objPng = s.image(params.png, 0, 0, $neft.width(), $neft.height());
    var objGif;
    neftObjects[name] = {
      png: objPng
    };
    
    if (params.gif) {
      objGif = s.image(params.gif, 0, 0, $neft.width(), $neft.height()).attr('opacity', '0');
    }
    neftObjects[name].gif = objGif;
  });

  $.each(neftObejectsParams, function(name, params) {
    var objEdge = s.path(params.edge).attr('opacity', '0');

    neftObjects[name].edge = objEdge;

    objEdge.mouseover(function(e) {
      var $note = $('.neft__note.' + name);

      $.each(neftObejectsParams, function(objName) {
        if (objName !== name) {
          neftObjects[objName].png.animate({
            'opacity': 0
          }, 300, mina.easein());

        }
      });

      // $('.neft__note').removeClass('neft__note_active');
      $note.addClass('neft__note_active');

      if (params.gif) {
        neftObjects[name].gif.attr('opacity', '1');
        neftObjects[name].png.attr('opacity', '0');
      }

    });

    objEdge.mouseout(function(e) {
      console.log('mouseleave from object');

      var $note = $('.neft__note.' + name);
      var $notePath = 'M' +
                      ($note.position().left - 20) + ' ' + ($note.position().top - 20) + ' ' +
                      ($note.position().left + $note.outerWidth() + 20) + ' ' + ($note.position().top - 20) + ' ' +
                      ($note.position().left + $note.outerWidth() + 20) + ' ' + ($note.position().top + $note.outerHeight() + 20) + ' ' +
                      ($note.position().left - 20) + ' ' + ($note.position().top + $note.outerHeight() + 20) + ' ' +
                      'Z';

      if (!Snap.path.isPointInside($notePath, e.offsetX, e.offsetY)) {

        // noteMouseOuter(name, params);

        if (params.gif) {
          neftObjects[name].png.attr('opacity', '1');
          neftObjects[name].gif.attr('opacity', '0');
        }

        $.each(neftObejectsParams, function(objName) {
          if (objName !== name) {
            neftObjects[objName].png.animate({
              'opacity': 1
            }, 300, mina.easeinout());
            $note.removeClass('neft__note_active');
          }
        });

      }


    });
  
  });

  $(document).on('mouseleave', '.neft__note', function(e) {
    console.log('mouseleave from note');

    var name = $(this).data('target');
    var params = neftObejectsParams[name];
    var $note = $('.neft__note.' + name);
    // noteMouseOuter(name, params, e);

    if (params.gif) {
      neftObjects[name].png.attr('opacity', '1');
      neftObjects[name].gif.attr('opacity', '0');
    }

    $.each(neftObejectsParams, function(objName) {
      if (objName !== name) {
        neftObjects[objName].png.animate({
          'opacity': 1
        }, 300, mina.easein());
        $note.removeClass('neft__note_active');
      }
    });

  });


});
