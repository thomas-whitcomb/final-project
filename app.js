$(document).ready(function(){
	var container = $('.container')
	var currTweetsList = []
	//DONT THINK I NEED THE BELOW LINE
	//var requestURI = '1.1/search/tweets.json?q='
	//var fireb = new Firebase("https://ga-final-project.firebaseio.com")
	var repeatTweets = 0

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
		console.log('made it to create Tweet Box')
		//make next line .addClass('box') to add to actual box not just line
    	var $tweetBox = $('<div></div>').addClass('twt-box')
    	var tweetText = obj.text
    	var twitterHandle = obj.user.screen_name
    	
    	$tweetBox.css({backgroundColor: 'red'})
  	  	$tweetBox.html('@' + twitterHandle + '\n' + tweetText)
  	  	container.append($tweetBox)
	}

	
	$(window).scroll(function(e){
		console.log(e)
	})

})
