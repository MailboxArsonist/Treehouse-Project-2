/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
//Declaring consts
const div = document.querySelector('.page');
const divHeader = document.querySelector('.page-header');
const studentsList = document.getElementsByClassName('student-item');

//define function so we can clear all students from page if needed
const clearPage = () => {
  for(let i = 0; i < studentsList.length; i++){
    studentsList[i].style.display = 'none';
  }
}

//function takes 1 param which is the page number to be shown and will diplay 10 students per page
const showPage = (pageNumber, stuList) => {
  //declare 2 const, we will show the numbers between these 2 const
  let higherThan = pageNumber * 10;
  let lowerThan = higherThan - 10;
  if(stuList.length < 10){
    higherThan = stuList.length;
    lowerThan = 0;
  }
  //clear page, then loop thorugh list and display students
  clearPage();

  for(let i = 0; i < stuList.length; i++){
      if(i < lowerThan || i >= higherThan){
        stuList[i].style.display = 'none';
        } else{
          stuList[i].style.display = '';
        }
  }
}
//func we will call to create a searchbox
const createInputElement = () => {
  //get div to append new element
  const divHeader = document.querySelector('.page-header');
  //create div, input and a button and append them inside the page-header div
  const div = document.createElement('div');
  div.className = 'student-search';
  const input = document.createElement('input');
  input.placeholder = 'Search students here';
  div.appendChild(input);
  const button = document.createElement('button');
  button.textContent = 'Search';
  div.appendChild(button);
  divHeader.appendChild(div);
}

//create a function to append links onto page.
const appendPageLinks = (list, activeLink) => {
  //select div so that we can append to it
  const div = document.querySelector('.page');
  //if links are on page remove them
  if(div.lastElementChild.className === 'pagination'){
    const removeOldLinks = div.lastElementChild;
    div.removeChild(removeOldLinks);
  }
  //create div which we will append into div on page
  const newDiv = document.createElement('div');
  newDiv.className = 'pagination';
  div.appendChild(newDiv);
  //create ul which will append into div
  const ul = document.createElement('ul');
  newDiv.appendChild(ul);
  //calculate the amount of links we will need on page. takes length of students on page, divides by 10 then rounds to the nearest integer. e.g. 54 is length/10= 5.4 applying Math.ceil gives us 6 buttons.
  const numOfLinks = Math.ceil((list.length / 10));
  //function that will create a link with param of of the link number and which link will have the class 'active'
  const createLink = (pageNumber, active) => {
    //create li and links elems and append to ul
    const li = document.createElement('li');
    ul.appendChild(li);
    const link = document.createElement('a');
    //set textContent to the parameter passed into the func
    link.textContent = pageNumber;
    //we want the page to ith page 1 showing, so we will give it the active class and all links get the pageLink class
    if(link.textContent == active){
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
      createLink(i, activeLink);
  }
}
//declaring  function which we will call to set our page up when loaded
const initPage = () => {
  showPage(1, studentsList);
  createInputElement();
  appendPageLinks(studentsList,1);
  createMessageBox();
}

//func that will create a messagebox that will be displayed if no results found
const createMessageBox = () => {
  const p = document.createElement('p');
  p.textContent = 'Unfortunately there are no students that match your search. Please try again.';
  p.className = 'message-box';
  p.style.display = 'none';
  const linksDiv = document.querySelector('.pagination');
  div.insertBefore(p, linksDiv);
}

//func for search box, create new array, loop through students and if matches are found add them to new array, then pass new arr into our funcs to display results
const search = () => {
  let newLis = [];
  let stuStr = '';
  const input = document.querySelector('input');
  const nameToSearch = input.value;
  const mBox = document.querySelector('.message-box');
  //func to be called when our new list is ready, will append new buttons and display students if needed, otherwise display the messagebox
  const showAndLinks = () => {
    //if array is empty show 0 results and display messagebox, else show results
    if(newLis.length === 0){
      mBox.style.display = '';
      appendPageLinks(newLis,0);
      showPage(1, newLis);
    } else {
      showPage(1, newLis);
      appendPageLinks(newLis,1);
      mBox.style.display = 'none';
    }
  }
  //if no name is searched return all results and ensure messagebox display is set to none, also remove search class 
  if(nameToSearch === ''){
    showPage(1, studentsList);
    appendPageLinks(studentsList,1);
    mBox.style.display = 'none';
    for(let i = 0; i < studentsList.length; i++){
      studentsList[i].className = 'student-item cf'
    }
  } else{
    //loop through list and then loop through h3 str, compare them together and then push to new array if matched
    for(let i = 0; i < studentsList.length; i++){
      let studentName = studentsList[i].firstElementChild.querySelector('h3').innerHTML;
      stuStr = '';

      for(let x = 0; x < nameToSearch.length; x++){
        if(studentName[x] === nameToSearch[x]){
          stuStr += studentName[x];
        }
      }
      if(stuStr === nameToSearch && stuStr!== ''){
        let li = studentsList[i];
        li.classList.add('searched');
        newLis.push(li);
        stuStr = '';
      }
      }
      //call func to show search results
      showAndLinks();
      }
}
//Called to init page
initPage();

//Event Listener for clicks on div
div.addEventListener('click', (event) => {
  const studentsList = document.getElementsByClassName('student-item');
  let arrayToPass = [];
  //loop through list to see if our search func has been called, by checking the class, if so we only want to display searched items
  for(let i = 0; i < studentsList.length; i++){
    if(studentsList[i].className === 'student-item cf searched'){
      arrayToPass.push(studentsList[i]);
    }
  }
  //if search was not called length will be zero so we will just want to show all students
  if(arrayToPass.length === 0) {
    arrayToPass = studentsList;
  }
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
    showPage(parseInt(pageNumber), arrayToPass);
  }
});

//Event listeners for search box, 1 for keyup 1 for click on search button
divHeader.addEventListener('keyup', (event) => {
  const input = event.target;
  search();
});
divHeader.addEventListener('click', (event) => {
  const button = event.target;
  if(button.textContent === 'Search'){
    search();
  }
});
