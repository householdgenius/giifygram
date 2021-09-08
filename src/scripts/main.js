// Can you explain what is being imported here?
import { getPosts } from "./data/dataManager.js"
import { PostList } from "./feed/postList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/footer.js";
import { usePostCollection } from "./data/dataManager.js";
import { PostEntry } from "./feed/postEntry.js";
import { createPost } from "./data/dataManager.js";
const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("footer");
	navElement.innerHTML = Footer();
}

const applicationElement = document.querySelector(".giffygram");

// applicationElement.addEventListener("click", event => {
// 	console.log ("what was clicked", event.target)
// 	if (event.target.id === "logout"){
// 		console.log("You clicked on logout")
		
// 	}
// })

applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})


applicationElement.addEventListener("click", event => {
		console.log ("what was clicked", event.target)
		if (event.target.id === "Direct Message"){
			console.log("You clicked on Direct Message")
		}
		})

const handleGiffyClick = (event) => {
	console.log ("what was clicked", event)
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
		
	}
}

applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
	  const yearAsNumber = parseInt(event.target.value)
  
	  console.log(`User wants to see posts since ${yearAsNumber}`)
	  showFilteredPosts(yearAsNumber);
	}
  })

  const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
	  if (singlePost.timestamp >= epoch) {
		return singlePost
	  }
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
  }

  applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		//clear the input fields
	}
  })
  
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: 1,
		  timestamp: Date.now()
	  }
  
	// be sure to import from the DataManager
		createPost(postObject)
		.then((dbResponse) => {
			showPostList()
		});
	}
  })

  const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
  }

applicationElement.addEventListener("click", handleGiffyClick)

const startGiffyGram = () => {
	showPostList();
	showNavBar();
	showFooter();
	showPostEntry();
}

startGiffyGram();
