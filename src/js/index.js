import 'bootstrap'
import '../scss/main.scss'
import '../css/main.css'
import '../index.html'

$(document).ready(function() {
  $("#logo").on("click", function() {
    $("#header").removeClass("col-5").addClass("col-12");
    $("#main-section").removeClass("col-7");
  })
})