$(document).ready(function(){
	var container = $('.container')

	var requestURI = '1.1/search/tweets.json?q='
	
	$('.find-tweets-button').on('click',function(e){
		e.preventDefault()

		inputVal = $('.search-box').val()
		OAuth.initialize('XFW3J69pI4WCYLZsRuDEYhcSFFU')
		OAuth.popup('twitter').done(function(result) {
	    //console.log(result)
	    result.get(requestURI + inputVal + '&result_type=mixed&count=20').done(function(resp){
	    	console.log(resp)
	    	resp.statuses.forEach(function(obj){
		    	var $tweetBox = $('<div></div>').addClass('twt-box')
		    	var tweetText = obj.text
		    	var twitterHandle = obj.user.screen_name
		    	$tweetBox.css({backgroundColor: 'red'})
		  	  	$tweetBox.html('@' + twitterHandle + '\n' + tweetText)
		  	  	container.append($tweetBox)	
	    	})	  	  	
	    })
		})	
		$('.search-box').val('')
	})

	


	


})
