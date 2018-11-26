/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Gather all students in array
const studentsList = document.getElementsByClassName('student-item');
//select div which conatins all content
const div = document.querySelector('.page');




//function takes 1 param which is the page number to be shown and will diplay 10 students per page
function showPage(pageNumber){
  //declare 2 const, we will show the numbers between these 2 const
  const higherThan = pageNumber * 10;
  const lowerThan = higherThan - 10;
  //loop through list of students
  for(let i = 0; i < studentsList.length; i++){
      if(i < lowerThan || i >= higherThan){
        //set display to none for students outside these const values, this will hide them
        studentsList[i].style.display = 'none';
      } else{
        //if inside the 2 const then ensure display is set to an empty string.
        studentsList[i].style.display = '';
      }
  }
}

//create a function to append links onto page.
function appendPageLinks(){
  //select div so that we can append to it
  const div = document.querySelector('.page');
  //create div which we will append into div on page
  const newDiv = document.createElement('div');
  //adding className for styling
  newDiv.className = 'pagination';
  //append newDiv into div on page
  div.appendChild(newDiv);
  //create ul which will append into div
  const ul = document.createElement('ul');
  //apend into newdiv
  newDiv.appendChild(ul);
  //calculate the amount of links we will need on page. takes length of students on page, divides by 10 then rounds to the nearest integer. e.g. 54 is length/10= 5.4 applying Math.ceil gives us 6 buttons.
  const numOfLinks = Math.ceil((studentsList.length / 10));
  //function that will create a link with param of pagenumber
  function createLink(pageNumber){
    //create li elem
    const li = document.createElement('li');
    //append it into ul which we created in appendPageLinks func
    ul.appendChild(li);
    //create our link element
    const link = document.createElement('a');
    //set textContent to the parameter passed into the func
    link.textContent = pageNumber;
    //we want the page to start with page 1 showing, so we will give it the active class and all links get the pageLink class
    if(link.textContent === '1'){
      link.className = 'pageLink active';
    } else{
      link.className = 'pageLink';
    }
    //finally append the link into the li where our links will be shown on the page
    li.appendChild(link);
  }
  //loop through our const which contains the amount of links we need to show
  for(let i = 1; i <= numOfLinks; i++){
      //call the create link func as many times as we need. i is passed as argument which will be converted as link number inside func
      createLink(i);
  }
}
//declaring  function which we will call to set our page up when loaded
function initPage(){
  //creates our links
  appendPageLinks();
  //ensures that page 1 will be the default page when opened
  showPage(1);
}
//Called to init page
initPage();

//Event Listener for clicks on div
div.addEventListener('click', (event) => {
  //declare const for what was clicked
  const linkClicked = event.target;
  //Only run code if the click event was on a link we created
  if(linkClicked.className === 'pageLink'){
    //select links to loop through them
    const links = document.getElementsByClassName('pageLink')
    for(let i = 0; i < links.length; i++){
      //remove the active class if needed
        links[i].classList.remove('active');
      }
      //apply the active class to the link that was clicked
    linkClicked.classList.add('active');
    //grab textcontent of link that was clicked
    const pageNumber = linkClicked.textContent;
    //use parseint to convert pagenumber to integer, then pass as argument to showpage func
    showPage(parseInt(pageNumber));
  }
});
