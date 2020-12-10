$(document).ready(function() {
    $('#md-create-hobby').on('shown.bs.modal', function () {
        $('#input-hobby').trigger('focus');
      })

      $('#btn-save').on('submit', function() {
        $('#md-create-hobby').modal('hide');
      });
});