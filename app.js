$(document).ready(function(){
	var tweetList = $('.tweet-list')
	var templateHtml = $('#row').html();
  	var compiledTemplate = Handlebars.compile(templateHtml);
	var currTweetsList = []
	//var fireb = new Firebase("https://ga-final-project.firebaseio.com")
	var repeatTweets = 0
	var inputKeyword = ''

	$('.find-tweets-button').on('click',function(e){
		e.preventDefault()
		//add code for clearing all previous tweets
		
		inputKeyword = $('.search-box').val()
		$('.search-box').val('')
		getTweets(inputKeyword, 'popular', 15)
	})

	function getTweets(keyword, resultType, tweetNum){
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
			//will use this code when I make fn for when user goes to bottom of page and need to reload tweets
		}
	}
	

	function createTweetBox(obj){
    	var tweetText = obj.text
    	var twitterHandle = '@' + obj.user.screen_name
    	var profileName = obj.user.name
    	var profileURL = obj.user.url
    	var profImgURL = obj.user.profile_background_image_url

    	var row = compiledTemplate({
    		name: profileName,
   			screenName: twitterHandle,
   			twtText: tweetText,
   			profURL: profileURL,
   			profImg: profImgURL
    	})
    	tweetList.append(row)
	}

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
