$(function(){

	var requestURI = '1.1/search/tweets.json?q='
	
	$('.box-creator-button').on('click',function(e){
		e.preventDefault()

		var screenName = ''
		var tweetText = ''

		inputVal = $('.search-box').val()
		OAuth.initialize('XFW3J69pI4WCYLZsRuDEYhcSFFU')
		OAuth.popup('twitter').done(function(result) {
	    //console.log(result)
	    result.get(requestURI + inputVal + '&result_type=mixed&count=20').done(function(resp){
	    	console.log(resp)
	    	resp.statuses.forEach(function(obj){
	    		tweetText = obj.text
	    		screenName = obj.user.screen_name
	    		console.log(tweetText)
	    		console.log(screenName) 
	    		
	    	})
	    })
		})	
		$('.search-box').val('')
	})




	


})
