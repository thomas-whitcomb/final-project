$(document).ready(function(){
	var container = $('.container')
	var pageTweetsList = []
	var requestURI = '1.1/search/tweets.json?q='
	//var fireb = new Firebase("https://ga-final-project.firebaseio.com")

	$('.find-tweets-button').on('click',function(e){
		e.preventDefault()

		inputVal = $('.search-box').val()
		OAuth.initialize('XFW3J69pI4WCYLZsRuDEYhcSFFU')
		OAuth.popup('twitter').done(function(result) {
	    //console.log(result)
	    result.get(requestURI + inputVal + '&result_type=mixed&count=20').done(function(resp){
	    	console.log(resp)
	    	resp.statuses.forEach(tweetCheck(obj))
	    })
		})	
		$('.search-box').val('')
	})

	function tweetCheck(obj){
		var id = obj.id_str
		pageTweetsList.forEach(function(twtId){
			if(id === twtId){
				//return False
			} else {
				createTweetBox(obj)
				pageTweetsList.push(id)
			}
		})
	}

	function createTweetBox(obj){

		//make next line .addClass('box') to add to actual box not just line
    	var $tweetBox = $('<div></div>').addClass('twt-box')
    	var tweetText = obj.text
    	var twitterHandle = obj.user.screen_name
    	
    	$tweetBox.css({backgroundColor: 'red'})
  	  	$tweetBox.html('@' + twitterHandle + '\n' + tweetText)
  	  	container.append($tweetBox)
	}

	


})
