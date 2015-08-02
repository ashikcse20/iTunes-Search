'use strict';
angular.module('landingPage', ['landingPage.system']);

angular.module('landingPage.system',['ui.bootstrap']);


angular.module('landingPage.system').controller('landingCtrl', ['$scope','$http','$window','$location','$modal',function ($scope,$http,$window,$location,$modal) {

	$scope.today = new Date();
	$scope.showPage = 1;
	$scope.term_checked=true;
	$scope.check = false;

	$scope.Song =true;
	$scope.Artist= false;
	$scope.Album = false;

	$scope.show = function(data)
	{
		if(data == "Song")
		{
			$scope.Song =true;
			$scope.Artist= false;
			$scope.Album= false;
		}
		else if(data == "Artist")
		{
			$scope.Song =false;
			$scope.Artist= true;
			$scope.Album= false;
		}
		else if(data == "Album")
		{
			$scope.Song =false;
			$scope.Artist= false;
			$scope.Album= true;
		}
	}
/////// Shortlink Inserter And Generator
	$scope.short_link = function(link,id)
	{
		//alert("link="+link + "ID="+id);
		$http({'method' : 'post', url: '/short_link', data: {'from_short_link_link' : link, 'from_short_link_id' : id}}).
		success(function(data){ 
	    //	$scope.short_link = data; 
	    document.getElementById("changable"+id).style.display = "none";
	    document.getElementById(id).style.display = "block";
		document.getElementById(id).innerHTML="<br/><br/><p><em>"+window.location.hostname+"/"+id+"</em></p>";
		console.log("window.location.hostname= "+window.location.hostname);
			
		}).
		error(function(data){

		})
		$scope.check = true;

	}
	$scope.search_music_data = function(data)
	{
		//alert(data);

		/////////// Search Song	\\\\\\\\\\\\\\\\ 
		$http({'method' : 'post', url: '/search', data: {'from_search_music_data_search_item' : data}}).
		success(function(data){
			//alert(data)
			$scope.titled = data;
			
		}).
		error(function(data){

		})
		$scope.check = true;

	/////////// Search musicArtist	\\\\\\\\\\\\\\\\ 
		$http({'method' : 'post', url: '/search_artistname', data: {'from_search_music_data_search_item' : data}}).
		success(function(data){
			//alert(data)
			$scope.artist_name = data;
			
		}).
		error(function(data){

		})
		$scope.check = true;

	/////////// Search musicAlbum	\\\\\\\\\\\\\\\\ 
		$http({'method' : 'post', url: '/search_album', data: {'from_search_music_data_search_item' : data}}).
		success(function(data){
			//alert(data)
			$scope.album_name = data;
			
		}).
		error(function(data){

		})
		$scope.check = true;

	}

	
	$scope.clickedForgotPassword = function(){

		$scope.forgot_password = !$scope.forgot_password;

	}

	$scope.recoverPassword = function(){

		$scope.forgot_password = !$scope.forgot_password;

		$http({'method' : 'post', url: '/recoverPassword', data: {'email' : $scope.recover_email}}).
		success(function(data){
			$scope.recover_email = '';
			if(data=='ok'){
				var n = noty({text: "Password has been sent to your email address",type: 'information',layout: 'bottomRight', timeout: 3000});

			}
			else{

				var n = noty({text: "There is no account in this email address",type: 'error',layout: 'bottomRight', timeout: 3000});

			}
		}).
		error(function(data){

		})
	}

	$scope.changeShowPage=function(number){
		$scope.showPage = number;
	}
	$scope.toggleAnimation = function () {
	    $scope.animationsEnabled = !$scope.animationsEnabled;
	};

	$scope.registration = function(){
	

	 	if(!$scope.term){

	 		var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modalTerms.html',
		      controller: 'ModalInstanceCtrl',
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		     
		    });
	 	}
	    else{

	    	$scope.term_checked = true;
	    	$http({'method' : 'post', url: '/registration', data: {'first_name': $scope.first_name, 'last_name' : $scope.last_name, 'user_name': $scope.user_name, 'email' : $scope.email, 'password' : $scope.password}})
	    	.success(function(data){
	    		if(data=='ok')
	    			$window.location.href = "http://" + $window.location.host +  '/waitingConfirmation';
	    		else{
	    			$window.location.href = "http://" + $window.location.host +  '?already_exist';

	    		}

	    	})
	    	.error(function(data){


	    	})


	    }
	}

    
}]);

angular.module('landingPage.system').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {


  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});