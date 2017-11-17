$(function(){
  $('#search_input').on('keyup', function(e){
    if(e.keyCode === 13) {
      var parameters = { search: $(this).val() };
      $.get( '/books/search', parameters, function(data) {
        $('.book-list-wrapper').html(data);
      }, 'html');
    };
  });
});