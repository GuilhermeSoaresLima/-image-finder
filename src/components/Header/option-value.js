$(document).ready(function() {
  $("option:selected").val();
  console.log($("option:selected").val());
  console.log($("option").val());
  $("#state option")
    .map(function() {
      return $(this).val();
    })
    .get();
});

// $(document).ready(function() {
//   $("select").change(function() {
//     var selectedCountry = $(this)
//       .children("option:selected")
//       .val();
//     alert("You have selected the country - " + selectedCountry);
//   });
// });
