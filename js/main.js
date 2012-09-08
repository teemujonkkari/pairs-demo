(function($) {

  // init
  shuffleCards();

  function shuffleCards() {
    // get cards
    $cards = $('.card-holder');
    // shuffle cards
    $cards = _.shuffle($cards);
    // add to canvas
    $('.container').empty().append($cards);
  }

  // click&tap events
  $('.container').on('click tap', '.card-holder', function(event) {
    var $tgt = $(event.target).closest('.card-holder');

    // if card is already open
    if($tgt.hasClass('open')) {
      return false;
    }

    // maz 2 card open in same time
    if($('.card-holder.open').length > 1) {
      return false;
    }

    //
    if($('.card-holder.open').length) {

      var $open = $('.card-holder.open');
      var openSrc = $open.find('img').attr('src');
      var tgtSrc = $tgt.find('img').attr('src');

      if(tgtSrc === openSrc) {
        $open.removeClass('open').addClass('solved');
        $tgt.addClass('solved');
      } else {
        $tgt.toggleClass('open');
        setTimeout(function() {
          $('.card-holder.open').removeClass('open');
        }, 1200);
      }
    } else {
      $tgt.toggleClass('open');
    }

    if($('.card-holder').length === $('.card-holder.solved').length) {
      setTimeout(function() {
        if (confirm("You Won! Start A New Game")) {
          // remove solved classes
          $('.card-holder').removeClass('solved');
          // shuffle cards for the new game
          shuffleCards();
        }
      }, 1000);

    }

  });

})(jQuery);
