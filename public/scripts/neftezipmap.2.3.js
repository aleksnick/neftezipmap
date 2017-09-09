
$(document).ready(function() {

  var NefteZipMap = function() {

    var state = {
      activeObject:  null
    };

    var $neft = $('.neft');
    var s = Snap(".neft__svg");
    var w = 1280;
    var h = 745;

    var neftObjects = new Array();

    var getMouseX = function(e) {
      return e.pageX - $neft.offset().left;
    }

    var getMouseY = function(e) {
      return e.pageY - $neft.offset().top;
    }

    var getPathOfNote = function(name) {
      var $note = $('.neft__note.' + name);
      return 'M' +
        ($note.position().left - 20) + ' ' + ($note.position().top - 20) + ' ' +
        ($note.position().left + $note.outerWidth() + 20) + ' ' + ($note.position().top - 20) + ' ' +
        ($note.position().left + $note.outerWidth() + 20) + ' ' + ($note.position().top + $note.outerHeight() + 20) + ' ' +
        ($note.position().left - 20) + ' ' + ($note.position().top + $note.outerHeight() + 20) + ' ' +
        'Z';
    };

    var isMouseOnObject = function(e) {
      var res = false;
      $.each(neftObejectsParams, function(name, params) {
        if (Snap.path.isPointInside(params.edge, getMouseX(e), getMouseY(e))) {
          state.activeObject = name;
          res = true;
        }
        if (Snap.path.isPointInside(params.edge, getMouseX(e)+1, getMouseY(e)+1)) {
          state.activeObject = name;
          res = true;
        }
      });
      return res;
    };

    var isNoteOpen = function(name) {
      var $note = $('.neft__note.' + name);
      return $note.hasClass('neft__note_active');
    };

    var isObjectActive = function(name) {
      var res = false;
      var params = neftObejectsParams[name];
      if (params.gif) {
        if (neftObjects[name].gif.attr('opacity') == 1) {
          res = true;
        }
      } else {
        if (neftObjects[name].png.attr('opacity') == 1) {
          res = true;
        }
      }
      return res;
    };

    var isMouseOnNote = function(name, e) {
      var res = false;
      var $note;
      var path;

      if (name !== null) {
        $note = $('.neft__note.' + name);
        path = getPathOfNote(name);
        if (Snap.path.isPointInside(path, getMouseX(e), getMouseY(e))) {
          res = true;
        }
      }
      return res;
    };

    var hideBackground = function() {
      background.animate({
        'opacity': 0.5
      }, 300, mina.easein());      
    };

    var showBackground = function() {
      background.animate({
        'opacity': 1
      }, 300, mina.easein());      
    };

    var showObject = function(name) {
      var $note = $('.neft__note.' + name);

      hideBackground();

      neftObjects[name].png.animate({
        'opacity': 1
      }, 300, mina.easein());

      replacePngToGif(name);

      hideAllObjects(name);

      showNote(name);
    };

    var clearMap = function() {
      $.each(neftObejectsParams, function(name, params) {
        if (params.gif) {
          if (neftObjects[name].gif.attr('opacity') == 1) {
            neftObjects[name].gif.attr('opacity', 0);
          }          
        }
      });
    };

    var showAllObjects = function(name) {
      $.each(neftObejectsParams, function(objName) {
        if (objName !== name) {
          neftObjects[objName].png.animate({
            'opacity': 1
          }, 300, mina.easeinout());
        }
      });
    };

    var hideObject = function(name) {
      var $note = $('.neft__note.' + name);

      showBackground();

      replaceGifToPng(name);

      showAllObjects(name);

      hideNote(name);

      state.activeObject = null;
    };

    var hideAllObjects = function(name) {
      $.each(neftObejectsParams, function(objName, objParams) {
        if (objName !== name) {
          neftObjects[objName].png.animate({
            'opacity': 0
          }, 300, mina.easein());
          if (objParams.gif) {
            neftObjects[objName].gif.attr('opacity', 0);
          }
        }
      });
    };

    var replacePngToGif = function(name) {
      var params = neftObejectsParams[name];
      if (params.gif) {
        neftObjects[name].png.attr('opacity', 0);
        neftObjects[name].gif.attr('opacity', 1);
      }
    };

    var replaceGifToPng = function(name) {
      var params = neftObejectsParams[name];
      if (params.gif) {
        neftObjects[name].gif.attr('opacity', 0);
        neftObjects[name].png.attr('opacity', 1);
      }
    };

    var showNote = function(name) {
      var $note = $('.neft__note.' + name);
      $note.addClass('neft__note_active');
      $('.neft__note').each(function(i) {
        if (!$(this).hasClass(name)) {
          if ($(this).hasClass('neft__note_active')) {
            $(this).removeClass('neft__note_active');
          }
        }
      });
    };

    var hideNote = function(name) {
      var $note = $('.neft__note.' + name);
      $note.removeClass('neft__note_active');
    };

    // $(document).on('click', $neft, function(e) {
    //   console.log(e.offsetX, e.offsetY);
    // });

    $(document).on('mousemove', $neft, function(e) {
      if ((state.activeObject !== null) && (isMouseOnNote(state.activeObject, e))) {
        if (!isObjectActive(state.activeObject)) {
          showObject(state.activeObject);
        }
      } else {
        if (isMouseOnObject(e)) {
          showObject(state.activeObject);
        } else {
          if (state.activeObject !== null) {
            if (!isMouseOnNote(state.activeObject, e)) {  
              hideObject(state.activeObject);
              clearMap();
            }
          }
        }
      }
    });

    $(document).on('mouseover', '.neft__caption', function(e) {
      var name = $(this).parent().data('target');
      if (state.activeObject == null) {
        state.activeObject = name;
        showObject(state.activeObject);
      }
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

    var background = s.image('public/images/background_gray.png', 0, 0, w, h);


    $.each(neftObejectsParams, function(name, params) {
      var objPng = s.image(params.png, 0, 0, w, h);
      neftObjects[name] = {
        png: objPng
      };
      
      if (params.gif) {
        neftObjects[name].gif = s.image(params.gif, 0, 0, w, h).attr('opacity', '0');
      }
    });

    var background_lines = s.image('public/images/map_lines.png', 0, 0, w, h);

    $.each(neftObejectsParams, function(name, params) {
      var objEdge = s.path(params.edge).attr('opacity', 0);

      neftObjects[name].edge = objEdge;
    
    });

  };

  var neft = new NefteZipMap();


  $('.menu').onePageNav();
  $('.neft__note').onePageNav();

});
