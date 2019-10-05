(function(){
  var logoImg   = document.getElementById('logoImg');
  var logo   = document.querySelector('logo');
  var info      = document.getElementById('mb-info');
  
  window.onscroll = function() {
    function scrollFunction() {
      if (document.body.scrollTop > 380 || document.documentElement.scrollTop > 380) {
        logoImg.style.width = "70%";
      } else {
        logoImg.style.width = "100%";
      }
    }
    scrollFunction()
  };
})();