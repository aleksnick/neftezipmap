
$(document).ready(function() {
  var neft;

  var NefteZipMap = function() {

    $(document).on('mouseenter', '.neft__note', function(e) {
      var target = $(this).find('.neft__caption').data('target');

      $(this).addClass('neft__note_active');

      $('.neft__item').each(function(i, el) {
        if (!$(el).hasClass(target)) {
          $(el).hide(100);
        }
      }); 
      $('.neft__item.' + target).show(100).addClass('neft__item_gif');
    });

    $(document).on('mouseleave', '.neft__note', function(e) {
      $(this).removeClass('neft__note_active');

      $('.neft__item').show(100).removeClass('neft__item_gif');
    });

  }

  neft = new NefteZipMap();

});
