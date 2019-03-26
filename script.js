var button = document.getElementById('btn');
button.addEventListener('click', getList);

for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
}

if (key != null) {
    getList();
} else {
    alert('Local Storage Пуст!')
}

function getList() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://reqres.in/api/users?page=2', false);
    request.send();

    button.removeEventListener("click", getList);

    if (request.status == 200) {
        var results = JSON.parse(request.responseText);
        var users = results['data'];
        var tabs = document.getElementById('tabs');

        tabs.style.display = "block";

        for (var i = 0; i < users.length; i++) {

            var content = document.getElementsByClassName('tabContent')[i];
            var personInTabs = document.getElementsByClassName('tab')[i];
            var firstName = document.createElement('p');
            var lastName = document.createElement('p');
            var img = document.createElement('img');
            var person = 'Person ' + (i+1);
            var localStorageFirstName = 'First Name '+ (i+1);
            var localStorageLasteName = 'Laste Name '+ (i+1); 
            var localStorageAvatar = 'Avatar '+ (i+1);
            
            firstName.textContent = 'First Name: ' + users[i].first_name;
            lastName.textContent = 'Laste Name: ' + users[i].last_name;
            img.src = users[i].avatar;

            content.appendChild(img);
            content.appendChild(firstName);   
            content.appendChild(lastName);
            
            personInTabs.innerHTML = person;

            localStorage.setItem(localStorageFirstName, JSON.stringify(users[i].first_name));
            localStorage.setItem(localStorageLasteName, JSON.stringify(users[i].last_name));
            localStorage.setItem(localStorageAvatar, JSON.stringify(users[i].avatar));  
        }

    } else {
        alert('Error');
    }
} 

// Работа Табов

var tab; // заголовок вкладки
var tabContent; // блок содержащий контент вкладки

window.onload=function() {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1);
}

tabs.onclick = function (event) {
    var target = event.target;
    if (target.className == 'tab') {
       for (var i = 0; i < tab.length; i++) {
           if (target == tab[i]) {
               showTabsContent(i);
               break;
           }
       }
    }
}

function hideTabsContent(a) {
    for (var i = a; i< tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('whiteborder');
    }
}

function showTabsContent(b){
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}




    