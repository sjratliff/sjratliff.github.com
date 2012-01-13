// Activity 4
// Visual Frameworks (VFW)
// Mobile Development
// Full Sail University

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
    
    //getElementById Function
    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
   
    var save = $('submit');
    var clearLink = $("clear");
    var displayLink = $("displayLink");
    
    
    //create select field and populate with options
    function pickTeam(){
        var formTag = document.getElementsByTagName("form"),//formTag Is Array of all the tags.
            selectLi = $('select'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "groups");
        for(var i=0,j=contactGroups.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = contactGroups[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
    
    //find value of selcted radio button.
    function getSelectedRadio(){
        var radio = document.forms[0].sex;
        for(var i=0; i<radio.length; i++){
            if(radio[i].checked){
                sexValue = radio[i].value;
            }
        }
    }
    
 
    function toggleControls(n){
        switch(n){
            case "on":
               $('startPage').style.display = "none";
               $('clear').style.display = "inline";
               $('displayLink').style.display = "none";
               $('addNew').style.display = "inline";
                break;
            case "off":
               $('startPage').style.display = "block";
               $('clear').style.display = "inline";
               $('displayLink').style.display = "inline";
               $('addNew').style.display = "none";
               $('items').style.display = "none";
               
               
                break;
            default:
                return false;
        }
            
        }
    
        function storeData(key){
        //if there is no key, this means this is a brand new item and we need a new key.
        if(!key){
        	var id              = Math.floor(Math.random()*100000001);
         }else{
         	//set the id to the existing key we're editing so that it will save over the data.
         	//The key is the same key that's been passed along from the editSubmit event handler
         	//to the validate function,and then passed here,into the storeData function.
         		id = key;
         }
        //gather up all form field values and store in object.
        //Object properties contain array with the form label and input value.
        getSelectedRadio();
        var item            ={};
            item.group      =["Group:", $('groups').value];
            item.tname      =["Team Name:", $('tname').value];
            item.sex        =["Sex:", sexValue];
            item.date       =["Startdate", $('startdate').value];
            item.pword      =["Password:", $('pword').value];
            item.cpword     =["Confirm Password:", $('cpword').value];
            item.email       =["Email:", $('email').value];
            item.rating     =["Rating", $('rating').value];
            item.comments   =["Comments" , $('comments').value];
        //save data into local storage: Use Stringify to convery our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Information Saved!");
        
     }
     
     function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
        autoFillData();
            alert("There is no data in Local Storage, so Default Data was Added.");
        }
        
        //Write Data from Local Storage to the browser.
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for(var i=0, len=localStorage.length; i<len; i++){
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object by using JSON.parse().
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            getImage(obj.group[1], makeSubList);
            for(var n in obj){
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
         }
         makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/link for each item in local storage.
   	 }
	}
	//Get image for right category
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src","images/Lettericons/"+ catName +".png");
		imageLi.appendChild(newImg);
		 
	
	}
	
	//JSON Object Whick will auto populate local storage.
	function autoFillData(){
		var json = {
			"contact1":	{
				"group": 	["Day:", "Friday"],
				"tname": 	["Name:","Sean Combs"],
				"sex":   	["Sex:","Male"],
				"startdate":["Birthday:","1969-11-4"],
				"pword":	["People In Party:","40"],
				"cpword":	["Phone Number:","212-555-1212"],
				"email":	["Email:","pdiddy@badboyent.com"],
				"rating":	["Rating:","8"],
				"comments":	["Comments:","Record Release Party"]
	
			},
			"contact2":	{
				"group": 	["Day:", "Saturday"],
				"tname": 	["Name:","Tyrese Gibson"],
				"sex":   	["Sex:","Male"],
				"startdate":["Birthday:","1978-12-30"],
				"pword":	["People In Party:","15"],
				"cpword":	["Phone Number:","212-555-2345"],
				"email":	["Email:","blacktye@hasbro.com"],
				"rating":	["Rating:","8"],
				"comments":	["Comments:","30th Birthday"]
			},
			"contact3":{
				"group": 	["Day:", "Thursday"],
				"tname": 	["Name:","Elizabeth Shue"],
				"sex":   	["Sex:","Female"],
				"startdate":["Birthday:","1963-10-6"],
				"pword":	["People In Party:","12"],
				"cpword":	["Phone Number:","312-555-5423"],
				"email":	["Email:","jordanMooney@cocktailsanddreams.com"],
				"rating":	["Rating:","8"],
				"comments":	["Comments:","Divorce Party"]
			}
				
		};
		//store the JSON OBJECT into local storage
		for(var n in json){
			var id              = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
    //Make Item Links
    //Create the edit and delete links for each stored item when displayed
    function makeItemLinks(key, linksLi){
    //add edit single item link
    var editLink = document.createElement('a');
    editLink.href = '#';
    editLink.key = key;
    var editText = "Edit Info";
    editLink.addEventListener("click", editItem);
    editLink.innerHTML = editText;
    linksLi.appendChild(editLink);
    
    //add line break
    var breakTag = document.createElement('br');
    linksLi.appendChild(breakTag);
    
    
    
    //add delete single item link
    var deleteLink = document.createElement('a');
    deleteLink.href = "#";
    deleteLink.key = key;
    var deleteText = "Delete Info";
    deleteLink.addEventListener("click", deleteItem);
    deleteLink.innerHTML = deleteText;
    linksLi.appendChild(deleteLink);
    
    }
    
    function editItem(){
    //Grab the data from our item from local Storage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        //Show the form
        toggleControls("off");
        
        //populate the form fields with the current localStorage values
        $('groups')   .value = item.group[1];
        $('tname')    .value = item.tname[1];
        var radios = document.forms[0].sex;
        for(var i=0; i<radios.length;i++){
            if(radios[i].value == "male" && item.sex[1] == "male"){
                radios[i].setAttribute("checked", "checked");
           }else if (radios[i].value == "female" && item.sex[1] == "female"){
               radios[i].setAttribute("checked" , "checked");
               }
           }
        $('startdate').value = item.date[1];
        $('pword')    .value = item.pword[1];
        $('cpword')   .value = item.cpword[1];
        $('email')    .value = item.email[1];
        $('rating')   .value = item.rating[1];
        $('comments') .value = item.comments[1];
        
        
        //Remove the initial listener from the  input "save contact" button
        save.removeEventListener("click", storeData);
        //Change Submit Button Value to Edit Button
        $('submit').value = "Edit Contact";
        var editSubmit = $('submit');
        //Save the key value established in this function as a property of the editSubmit event
        //soo we can use that value when we save the data we edited.
        editSubmit.addEventListener("click" , validate);
        editSubmit.key = this.key;
        
        
    }
    
    function deleteItem(){
    	var ask = confirm("Are you Sure you Want To delete?");
    		if(ask){
    		 localStorage.removeItem(this.key);
    		 window.location.reload();
    		}else{
    			alert("Information Was NOT deleted.")
    		}
    }
    
    function clearLocal(){
        if(localStorage.length === 0 ){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All Info Has Been Cleared");
            window.location.reload();
            return false;
        }
    }
    
    function validate(e){
        //define element we want to check
        var getGroup = $('groups');
        var gettname = $('tname');
        var getpword = $('pword');
        var getcpword = $('cpword');
        var getEmail = $('email');
        var getComments = $('comments');
        
        //Reset Error Messages
        errMsg.innerHTML = "";
           getGroup.style.border = "1px solid black";
        gettname.style.border = "1px solid black";
        getpword.style.border = "1px solid black";
           getcpword.style.border = "1px solid black";
        getEmail.style.border = "1px solid black";
        
        //Get Error Messages
        var messageAry = [];
        //group validation
        if (getGroup.value=="--Pick A Night--"){
            var groupError = "Please choose a night.";
            getGroup.style.border = "1px solid red";
            messageAry.push(groupError);
        }
        
        //Team Name Validation
        if (gettname.value === ""){
            var tnameError = "Please Enter Name.";
            gettname.style.border = "1px solid red";
            messageAry.push(tnameError);
            
        }
        
        //Password Validation
        if (getpword.value === ""){
            var pwordError = "Please Enter number in party.";
            getpword.style.border = "1px solid red";
            messageAry.push(pwordError);
        }
        
        //Password Confirm Validation
        if (getcpword.value === ""){
            var cpwordError = "Please Re-Enter Phone Number.";
            getcpword.style.border = "1px solid red";
            messageAry.push(cpwordError);
        }
        
        //Email Validation
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(re.exec(getEmail.value))){
        var emailError = "Please Enter Valid Email Address.";
        getEmail.style.border = "1px solid red";
        messageAry.push(emailError);
        
        }
        //if there were error, display on screen
        if(messageAry.length >= 1){
            for(var i=0, j=messageAry.length; i < j; i++){
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else{
        	//if all K,save our data! Send key valuae (which came from the editData function).
        	//Remember this key value was passed through the editSubmit event listner as a property.
            storeData(this.key);
        }
        
        
}        
            
    //Variable defaults
    var contactGroups = ["--Pick A Night--","Thursday","Friday","Saturday"];
    var sexValue,
        favoriteValue = "No",
        errMsg = $('errors');
    
  ;
    pickTeam();
    
    
    
    //Set Link & Submit Events

    
    save.addEventListener("click", storeData);
    clearLink.addEventListener("click", clearLocal);
    displayLink.addEventListener("click", getData);    
});