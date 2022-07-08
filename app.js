let scrollTop = 0;
let index = 0;
const windowHeight = window.innerHeight;
const sections = document.querySelectorAll('section');
const navigation = document.querySelector('.navigation');

function resetSelection() {
  for (var i = 0; i < navigation.children.length; i++) {
    navigation.children[i].classList.remove('selected');
  }
};

window.addEventListener('scroll', function() {
  scrollTop = window.scrollY;
  sections.forEach(function(section, i) {
    if (section.offsetTop <  scrollTop + windowHeight/2 && scrollTop < section.offsetTop + windowHeight/2) {
      resetSelection();
      navigation.children[i].classList.add('selected');
    }
  });
});

navigation.querySelectorAll('li').forEach(function(item, i) {
  item.addEventListener('click', function() {
    window.scrollTo({
      top: i * windowHeight,      
      behavior: 'smooth'
    });
  });
});


$('.links a').on('click', function(e) {
    if (this.hash !=='') {
        e.preventDefault();

        const hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800);
    };
});

$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function(){
  setTimeout(removeLoader, 5000);
});

function removeLoader(){
    $( "#loadingDiv" ).fadeOut(500, function() {
      $("nav").css("visibility", "visible");
      $( "#loadingDiv" ).remove();
  });  
}