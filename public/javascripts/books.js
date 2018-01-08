$(function(){
  $('#search_input').on('keyup', function(e){
    if(e.keyCode === 13) {
      var parameters = { search: $(this).val() };
      $.get( '/books/search', parameters, function(data) {
        $('.book-list-wrapper').html(data);
      }, 'html');
    };
  });

  $('.review_button').on('click', function(e){
    if($('.feedback_div_form').is(':hidden')){
      $('.feedback_div_form').removeClass('hidden');
    }else{
      $('.feedback_div_form').addClass('hidden');
    }
  });

  $('.submit_feedback').on('click',function (e) {
    var feedback = $('#feedback').val();
    var book_id = $(this).attr('data-book-id');
    $.ajax({
      type: 'POST',
      url: "/book_feedbacks/create",
      data: {feedback: feedback, book_id: book_id},
      dataType: "json",
      success: function(resultData) { alert(resultData) }
    });
  });

});