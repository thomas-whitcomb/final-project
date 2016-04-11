$(document).ready(function(){
	var container = $('.container')
	var tweetList = $('.tweet-list')
	var templateHtml = $('#row').html();
  	var compiledTemplate = Handlebars.compile(templateHtml);
	var currTweetsList = []
	//DONT THINK I NEED THE BELOW LINE
	//var requestURI = '1.1/search/tweets.json?q='
	//var fireb = new Firebase("https://ga-final-project.firebaseio.com")
	var repeatTweets = 0
	var inputKeyword = ''

	$('.find-tweets-button').on('click',function(e){
		e.preventDefault()
		//add code for clearing all previous tweets
		
		//I dont know thatI need these variables
		// var tweetGetCount = 15
		// var resultType = 'popular'

		inputKeyword = $('.search-box').val()
		$('.search-box').val('')
		getTweets(inputKeyword, 'popular', 15)
	})

	function getTweets(keyword, resultType, tweetNum){
	    //console.log(result)
		OAuth.initialize('XFW3J69pI4WCYLZsRuDEYhcSFFU')
		OAuth.popup('twitter').done(function(result) {
		    result.get('1.1/search/tweets.json?q=' + keyword + '&result_type=' + resultType + '&count=' + tweetNum).done(function(resp){
		    	console.log(resp)
		    	resp.statuses.forEach(function(obj){
		    		tweetCheck(obj)
		    	})
		    })
		})
	}


	function tweetCheck(obj){
		//console.log(obj.id_str)
		var id = obj.id_str
		var exists = true
		
		for(i=0; i<currTweetsList.length;i++){
			if (currTweetsList[i] === id) {
				exists = false
			}
		}
		if(exists){
			currTweetsList.push(id)
			createTweetBox(obj)
		} else {
			repeatTweets += 1 
			//NEED TO FIGURE OUT HOW TO CALL GET TWEETS WHEN THIS IS TRUE
		}
	}
	

	function createTweetBox(obj){
    	var tweetText = obj.text
    	var twitterHandle = '@' + obj.user.screen_name
    	var profileName = obj.user.name

    	var row = compiledTemplate({
    		name: profileName,
   			screenName: twitterHandle,
   			twtText: tweetText
    	})

    	tweetList.append(row)

    	// //$tweetBox.css({backgroundColor: 'red'})
  	  // 	$tweetBox.html('@' + twitterHandle + '\n' + tweetText)
  	  // 	container.append($tweetBox)
	}

	function makeRow(newText){
  
  var row = compiledTemplate({
      todoThing: newText
    });
  tweetList.append(row);
};

	
	// $(window).scroll(function(e){
	// 	console.log(e)
	// 	//below from internet - still need to figure out how/when to call getTweets
	// 	// if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
	// 	// 	$(window).unbind('scroll')

	// 	// }
	// 	var pageLength = ***size of page number***
	// 	if(e = pageLength){
	// 		pageLength *=2
	// 		getTweets(inputKeyword, 'recent', 10)
	// 	if(repeatTweets > 0){

	// 	}
			
	// 	}
	// })

})
