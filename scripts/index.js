'use strict';
///array of all projects
var projects = [];


///constructor function for project information
function Project(name, url, image, description, language, published){
  this.name = name;
  this.url = url;
  this.image = image;
  this.description = description;
  this.language = language;
  this.published = published;

  ///automatically push new one to the array
  projects.push(this);
}

Project.prototype.toHtml = function(){
  ///displays name, url, image, and description
  $('#project-image').attr('src', this.image);
  $('#project-name').text(this.name);
  $('#project-url').attr('href', this.url).text(this.url);
  $('#project-description').text(this.description);
};

Project.prototype.calculateDaysAgo = function(){
  var oneDay = 24*60*60*1000;
  var published = new Date(this.published);
  var todaysDate = new Date();
  var daysAgo = Math.round(Math.abs((published.getTime()-todaysDate.getTime())/oneDay));

  if(todaysDate < published){
    return 0;
  }else {
    return daysAgo;
  }
}

///click event for project Next button
function featureDisplay(){
  var index = projects.length - 1;
  projects[index].toHtml();

  $('#next-button').click(function(){
    index +=1;
    if(index < projects.length){
      projects[index].toHtml();
    }else {
      index = 0;
      projects[index].toHtml();
    }
  });
}

///hamburger menu closes if you click it a second time
function hamburgerMenu(){
  var click = 0;  ///number of times hamburger menu has been clicked
  var viewPort = $(window).width();

  $('.icon-menu').click(function(){
    click += 1;
    viewPort = $(window).width();

    if(click % 2 === 0){
      $('.navigation ul').css('display', 'none');
    } else if (viewPort < 400) {
      ///If the screen is less than 400px, it displays the menu vertically
      $('.navigation ul').css('display', 'block');
      $('.navigation li').css('display', 'block');
    } else {
      $('.navigation ul').css('display', 'inline');
      $('.navigation li').css('display', 'inline');
    }
  });
}

$(document).ready(function(){
  hamburgerMenu();
  featureDisplay();
});
