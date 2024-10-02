/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * before-carousel.js = Custom inaccessible Carousel
 */

$(document).ready(function() {

  // get all slides
  var $slides = $('.slide');
  var slideCount = $slides.length; // count the slides...
  $('#slideCount').text(slideCount); // ... and set slide count

  // add previous/next buttons
  var navButtons = $('<div>');
  var prevIcon = $('<img>').attr({
    'src': 'images/8675309-arrow-left.png'
  });
  var nextIcon = $('<img>').attr({
    'src': 'images/8675309-arrow-right.png'
  });
  var prevButton = $('<div>')
    .attr({tabindex:'0', title:'Previous carousel slide'})
    .addClass('btn-prev')
    .on({
      click: function() {changeSlide(event, "prev")},
      keypress: function() {changeSlide(event, "prev")}
    })
    .html(prevIcon);
  var nextButton = $('<div>')
    .attr({tabindex:'0', title:'Next carousel slide'})
    .addClass('btn-next')
    .on({
      click: function() {changeSlide(event, "next")},
      keypress: function() {changeSlide(event, "next")}
    })
    .html(nextIcon);

  navButtons.append(prevButton,nextButton);
  $('#carousel').append(navButtons);

  // add slide indicators (lentils)
  var lentils = $('<ul>').addClass('lentils');
  for (var i=0; i<slideCount; i++) {
    var lentil = $('<li>')
      .attr('data-slide',i)
      .on('click',function() {
        showSlide($(this).data('slide'));
      });
    lentils.append(lentil);
  }
  $('#carousel').append(lentils);

  // show the first one
  setIndex(0);
  showSlide(0);
});

// change slides, forward or back
function changeSlide(event, direction) {
  if (event.type == "click" || (event.type == "keypress" && event.keyCode == 13)) {
    setIndex( updateIndex(getIndex(), direction, getSlideCount()) );
    showSlide( getIndex() );
  }
}
// update slide index in HTML carousel
function setIndex(num) { $('#slideIndex').text(num); }
// get slide index from HTML carousel
function getIndex() { return Number($('#slideIndex').text()); }
// get slide index from HTML carousel
function getSlideCount() { return Number($('#slideCount').text()); }

function showSlide(index) {

  // hide the current visible slide
  $('.slide:visible').removeClass('current');
  // and show the new one
  $('.slide').eq(index).addClass('current');

  // also update the slide indicator
  $('.lentils li.active').removeClass('active');
  $('.lentils li').eq(index).addClass('active');

}

function updateIndex(index,direction,count) {

  if (direction === 'prev') {
    if (index == 0) {
      // this is the first side, loop around to last slide
      return count-1;
    }
    else {
      return index-1;
    }
  }
  else if (direction == 'next') {
    if (index == (count - 1)) {
      // this is the last side, loop around to first slide
      return 0;
    }
    else {
      return index+1;
    }
  }
  return 0;
}
