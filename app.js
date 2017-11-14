/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const fs = require('fs');

var bodyParser = require('body-parser');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = 'http://localhost:8081/callback';
//var redirect_uri = 'http://spotify-env.us-east-2.elasticbeanstalk.com/callback'; // Your redirect uri

var accesstoken, userid, refreshtoken;
var urilong = [], urimid = [], urishort = [];
var listlong = [], listmid = [], listshort = [];
var idlong = [], idmid = [], idshort = [];

var recurilong = [], recurimid = [], recurishort = [];
var reclistlong = [], reclistmid = [], reclistshort = [];
var recidlong = [], recidmid = [], recidshort = [];

var dancelongavg, energylongavg, loudnesslongavg, modelongavg, speechlongavg, acousticlongavg, instrumentlongavg, livelongavg, valencelongavg, tempolongavg, durationlongavg, timesiglongavg;
	var dancemidavg, energymidavg, loudnessmidavg, modemidavg, speechmidavg, acousticmidavg, instrumentmidavg, livemidavg, valencemidavg, tempomidavg, durationmidavg, timesigmidavg;
	var danceshortavg, energyshortavg, loudnessshortavg, modeshortavg, speechshortavg, acousticshortavg, instrumentshortavg, liveshortavg, valenceshortavg, temposhortavg, durationshortavg, timesigshortavg;

var refreshtokenme = '' //'refresh token for the Top Songs account';
var useridme = '' //'user id for the Top Songs account';

var date, day, month, year;

var users;

var userAlreadyExist;
var spot;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))
   .use(cookieParser());
 
app.get('/update', function(req, res) {
	update();
});
   
var updateArray = [];   

function update() {
	users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));	
	for (var i = 0; i < users.users.length; i++) {
		updateArray[i] = updatepull.bind(this, i);
	}
	
	for (var j = 0; j < users.users.length; j++) {
		updateArray[j]();
	}
	
}

function updatepull(x) {
	
		console.log('updating playlists for user ' + users.users[x].id);
		var refresh_token = users.users[x].refresh_token,
		playlisthreflong = users.users[x].playlisthreflong,
		playlisthrefmid = users.users[x].playlisthrefmid,
		playlisthrefshort = users.users[x].playlisthrefshort;
		
		var flag1 = flag2 = flag3 = false;
		
		var urilong0 = [], urimid0 = [], urishort0 = [];
var listlong0 = [], listmid0 = [], listshort0 = [];
var idlong0 = [], idmid0 = [], idshort0 = [];
		
		var authOptions0 = {
			url: 'https://accounts.spotify.com/api/token',
			headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
			form: {
			grant_type: 'refresh_token',
			refresh_token: refresh_token
			},
			json: true
		};

  request.post(authOptions0, function(error, response, body) {
	  
		
		var accesstoken0;
    if (!error && response.statusCode === 200) {
      accesstoken0 = body.access_token;
    }
	
	var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshtokenme
    },
    json: true
  };
  
  var access_token;

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
    }
	
		var optionslong = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
          headers: { 'Authorization': 'Bearer ' + accesstoken0 },
          json: true
    };
		
	request.get(optionslong, function(error, response, body) {
		//console.log(body);
		
		for (var i = 0; i < body.items.length; ++i) {
			listlong0[i] = body.items[i].name;
			urilong0[i] = body.items[i].uri;
			idlong0[i] = body.items[i].id;
		}
		
  
	
		
		var optionslong1 = {
			url: playlisthreflong + '/tracks/',
			headers: { 
				'Authorization': 'Bearer ' + access_token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'uris': urilong0}),
			json: true
		};
		request.put(optionslong1, function(error, response, body) {
			flag1 = true;
			//console.log(users.users[x].id + 'long');
		});
	});
				//console.log(body);
				
				
				var optionsmid = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
          headers: { 'Authorization': 'Bearer ' + accesstoken0 },
          json: true
		};
		
		request.get(optionsmid, function(error, response, body) {
			
			for (var i = 0; i < body.items.length; ++i) {
			listmid0[i] = body.items[i].name;
			urimid0[i] = body.items[i].uri;
			idmid0[i] = body.items[i].id;
			}
			
			
				
		
					var optionsmid1 = {
						url: playlisthrefmid + '/tracks/',
						headers: { 
							'Authorization': 'Bearer ' + access_token,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({'uris': urimid0}),
						json: true
					};
					request.put(optionsmid1, function(error, response, body) {
						flag2 = true;
						//console.log(users.users[x].id + 'mid');
					});
		});
						//console.log(body);
				
var optionsshort = {
				url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
				headers: { 'Authorization': 'Bearer ' + accesstoken0 },
				json: true
			};
			
			request.get(optionsshort, function(error, response, body) {
				
				for (var i = 0; i < body.items.length; ++i) {
				listshort0[i] = body.items[i].name;
				urishort0[i] = body.items[i].uri;
				idshort0[i] = body.items[i].id;
				}
							
				
							var optionsshort1 = {
								url: playlisthrefshort + '/tracks/',
								headers: { 
									'Authorization': 'Bearer ' + access_token,
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({'uris': urishort0}),
								json: true
							};
							request.put(optionsshort1, function(error, response, body) {
						flag3 = true;
						//console.log(users.users[x].id + 'short');
		
		
		
							});

  });
		
  });
  });
  var _flagCheck = setInterval(function() {
    if (flag1 === true && flag2 === true && flag3 === true) {
        clearInterval(_flagCheck);
        console.log('updating tracks for ' + users.users[x].id);
		console.log('end ' + users.users[x].id); // the function to run once all flags are true
    }
}, 100);
  
	}	

	
app.get('/login', function(req, res) {
	
fs.readFile('./users.json', 'utf8', function(err, data) {
	if (err) throw err;
	users = JSON.parse(data);
});


	
date = new Date();
day = date.getDate();
month = date.getMonth()  + 1;
year = date.getFullYear();

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'playlist-modify-public playlist-modify-private user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

			accesstoken = body.access_token,
			refreshtoken = body.refresh_token;
			
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body.id);
		  console.log(refresh_token);
		  console.log(body.display_name);
		  userid = body.id;
		  
		  userAlreadyExist = false;
		  for (var i = 0; i < users.users.length; i++) {
			  if (users.users[i].id == body.id && users.users[i].refresh_token != null) {
				  userAlreadyExist = true;
				  spot = i;
				  break;
			  }
		  }
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
}
});

app.get('/begin', function(req, res) {
	
	
fs.readFile('./users.json', 'utf8', function(err, data) {
	if (err) throw err;
	users = JSON.parse(data);
});
	if (userAlreadyExist) {
		console.log('user already on file');
		
		var refresh_token = users.users[spot].refresh_token;
		refreshtoken = refresh_token;
		
		var flag1 = flag2 = flag3 = false;
		
		var authOptions0 = {
			url: 'https://accounts.spotify.com/api/token',
			headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
			form: {
			grant_type: 'refresh_token',
			refresh_token: refresh_token
			},
			json: true
		};

  request.post(authOptions0, function(error, response, body) {
	  
    if (!error && response.statusCode === 200) {
      accesstoken = body.access_token;
    }
		var optionslong = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
          headers: { 'Authorization': 'Bearer ' + accesstoken },
          json: true
    };
		
	request.get(optionslong, function(error, response, body) {
		//console.log(body);
		
		for (var i = 0; i < body.items.length; ++i) {
			listlong[i] = body.items[i].name;
			urilong[i] = body.items[i].uri;
			idlong[i] = body.items[i].id;
		}
		flag1 = true;
				
			});
			
			var optionsmid = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
          headers: { 'Authorization': 'Bearer ' + accesstoken },
          json: true
		};
		
		request.get(optionsmid, function(error, response, body) {
			
			for (var i = 0; i < body.items.length; ++i) {
			listmid[i] = body.items[i].name;
			urimid[i] = body.items[i].uri;
			idmid[i] = body.items[i].id;
			}
			
			flag2 = true;
		});
		var optionsshort = {
				url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
				headers: { 'Authorization': 'Bearer ' + accesstoken },
				json: true
			};
			
			request.get(optionsshort, function(error, response, body) {
				
				for (var i = 0; i < body.items.length; ++i) {
				listshort[i] = body.items[i].name;
				urishort[i] = body.items[i].uri;
				idshort[i] = body.items[i].id;
				}
				flag3 = true;
				
  });
  
  
  var _flagCheck = setInterval(function() {
    if (flag1 === true && flag2 === true && flag3 === true) {
        clearInterval(_flagCheck);
        res.send({ 'sup': "hi"});
    }
}, 100);
  });

		
	}
	else {
		
		var flag1 = flag2 = flag3 = false;
	var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshtokenme
    },
    json: true
  };
  
  var access_token;

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
    }
	
	var playlisthreflong, playlisthrefmid, playlisthrefshort;
	var optionslong = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
          headers: { 'Authorization': 'Bearer ' + accesstoken },
          json: true
    };
		
	request.get(optionslong, function(error, response, body) {
		//console.log(body);
		
		for (var i = 0; i < body.items.length; ++i) {
			listlong[i] = body.items[i].name;
			urilong[i] = body.items[i].uri;
			idlong[i] = body.items[i].id;
		}
		
	
	var optionslong2 = {
          url: 'https://api.spotify.com/v1/users/' + useridme + '/playlists/',
		  body: JSON.stringify({ name: "Top Songs of All-Time for " + userid, public: true}),
          headers: { 
			'Authorization': 'Bearer ' + access_token,
			'Content-Type': 'application/json'
		  },
          json: true
        };
		
		
	request.post(optionslong2, function(error, response, body) {

		console.log('creating playlist');

		//console.log(body);
		playlisthreflong = body.href;
		//console.log(playlisthreflong);
		
		
		var optionslong1 = {
			url: playlisthreflong + '/tracks/',
			headers: { 
				'Authorization': 'Bearer ' + access_token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'uris': urilong}),
			json: true
		};
		request.post(optionslong1, function(error, response, body) {
			console.log('adding tracks');
			flag1 = true;
		});
	});
	});

		var optionsmid = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
          headers: { 'Authorization': 'Bearer ' + accesstoken },
          json: true
		};
		
		request.get(optionsmid, function(error, response, body) {
			
			for (var i = 0; i < body.items.length; ++i) {
			listmid[i] = body.items[i].name;
			urimid[i] = body.items[i].uri;
			idmid[i] = body.items[i].id;
			}
				var optionsmid2 = {
					url: 'https://api.spotify.com/v1/users/' + useridme + '/playlists/',
					body: JSON.stringify({ name: "Top Songs of the Past 6 Months for " + userid, public: true}),
					headers: { 
					'Authorization': 'Bearer ' + access_token,
					'Content-Type': 'application/json'
					},
					json: true
				};
				request.post(optionsmid2, function(error, response, body) {

		console.log('creating playlist');

					//console.log(body);
					playlisthrefmid = body.href;
					//console.log(playlisthrefmid);
					
		
					var optionsmid1 = {
						url: playlisthrefmid + '/tracks/',
						headers: { 
							'Authorization': 'Bearer ' + access_token,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({'uris': urimid}),
						json: true
					};
					request.post(optionsmid1, function(error, response, body) {

		console.log('adding tracks');
		flag2 = true;
					});
				});
		});
			
			var optionsshort = {
				url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
				headers: { 'Authorization': 'Bearer ' + accesstoken },
				json: true
			};
			
			request.get(optionsshort, function(error, response, body) {
				
				for (var i = 0; i < body.items.length; ++i) {
				listshort[i] = body.items[i].name;
				urishort[i] = body.items[i].uri;
				idshort[i] = body.items[i].id;
				}
				
  
		console.log('adding tracks');

				//console.log(body);
				
			

						//console.log(body);
				
						var optionsshort2 = {
							url: 'https://api.spotify.com/v1/users/' + useridme + '/playlists/',
							body: JSON.stringify({ name: "Top Songs of the Past 4 Weeks for " + userid, public: true }),
							headers: { 
								'Authorization': 'Bearer ' + access_token,
								'Content-Type': 'application/json'
							},
							json: true
						};
		
						request.post(optionsshort2, function(error, response, body) {

		console.log('creating playlist');

							//console.log(body);
							playlisthrefshort = body.href;
							//console.log(playlisthrefshort);
							
				
							var optionsshort1 = {
								url: playlisthrefshort + '/tracks/',
								headers: { 
									'Authorization': 'Bearer ' + access_token,
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({'uris': urishort}),
								json: true
							};
							request.post(optionsshort1, function(error, response, body) {

		console.log('adding tracks');
		flag3 = true;
							});
						});
			});
			
			var _flagCheck = setInterval(function() {
    if (flag1 === true && flag2 === true && flag3 === true) {
        clearInterval(_flagCheck);
				users.users.push({id: userid, refresh_token: refreshtoken, playlisthreflong: playlisthreflong, playlisthrefmid: playlisthrefmid, playlisthrefshort: playlisthrefshort});
		fs.writeFile("./users.json", JSON.stringify(users, null, 4), function(err) {
			if (err) {
				console.log(err);
			}
			console.log('User file saved. Added user ' + userid + ' with refresh token ' + refreshtoken + ' with playlist hrefs');
		});
        res.send({ 'sup': "hi"});
    }
}, 100);
		
	
	});		
	
	}
	
});

app.get('/follow', function(req, res) {
	users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
	var index;
	for(var i = 0; i < users.users.length; i++) {
		if(users.users[i].id == userid) {
			index = i;
			break;
		}
	}
	var hreflong = users.users[index].playlisthreflong,
	hrefmid = users.users[index].playlisthrefmid,
	hrefshort = users.users[index].playlisthrefshort;
	
	var optionslong = {
		url: hreflong + '/followers/',
		headers: {
			'Authorization': 'Bearer ' + accesstoken,
			'Content-Type': 'application/json'
		},
		json: true
	};
	
	request.put(optionslong, function(error, response, body) {
		console.log('following playlist');
		
		var optionsmid = {
		url: hrefmid + '/followers/',
		headers: {
			'Authorization': 'Bearer ' + accesstoken,
			'Content-Type': 'application/json'
		},
		json: true
	};
	
	request.put(optionsmid, function(error, response, body) {
		console.log('following playlist');
	});
	
	var optionsshort = {
		url: hrefshort + '/followers/',
		headers: {
			'Authorization': 'Bearer ' + accesstoken,
			'Content-Type': 'application/json'
		},
		json: true
	};
	
	request.put(optionsshort, function(error, response, body) {
		console.log('following playlist');
	});
	});
});

app.get('/list_songs', function(req, res) {
	res.send({
					'listlong': listlong,
					'listmid': listmid,
					'listshort': listshort
				});
});

/*
app.get('/playlistme', function(req, res) {
	
	var refresh_token = refreshtokenme;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  
  var access_token;

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
    }
	
	var optionslong = {
          url: 'https://api.spotify.com/v1/users/' + useridme + '/playlists/',
		  body: JSON.stringify({ name: "Top Songs of All-Time as of " + month + "/" + day + "/" + year + " for " + userid, public: true}),
          headers: { 
			'Authorization': 'Bearer ' + access_token,
			'Content-Type': 'application/json'
		  },
          json: true
        };
		
		
	var playlisthreflong;
	request.post(optionslong, function(error, response, body) {
		console.log('creating playlist');
		//console.log(body);
		playlisthreflong = body.href;
		//console.log(playlisthreflong);
		
		var followlong = {
          url: playlisthreflong + '/followers',
          headers: { 
			'Authorization': 'Bearer ' + accesstoken,
			'Content-Type': 'application/json'
		  },
          json: true
        };
		
		request.put(followlong, function(error, response, body) {
			console.log('following playlist');
		
		var optionslong1 = {
			url: playlisthreflong + '/tracks/',
			headers: { 
				'Authorization': 'Bearer ' + access_token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'uris': urilong}),
			json: true
		};
		request.post(optionslong1, function(error, response, body) {
				console.log('adding track');
				//console.log(body);
				
				var optionsmid = {
					url: 'https://api.spotify.com/v1/users/' + useridme + '/playlists/',
					body: JSON.stringify({ name: "Top Songs of the Past 6 Months as of " + month + "/" + day + "/" + year  + " for " + userid, public: true}),
					headers: { 
					'Authorization': 'Bearer ' + access_token,
					'Content-Type': 'application/json'
					},
					json: true
				};
		
				var playlisthrefmid;
				request.post(optionsmid, function(error, response, body) {
					console.log('creating playlist');
					//console.log(body);
					playlisthrefmid = body.href;
					//console.log(playlisthrefmid);
					
					var followmid = {
						url: playlisthrefmid + '/followers',
						headers: { 
							'Authorization': 'Bearer ' + accesstoken,
							'Content-Type': 'application/json'
						},
						json: true
					};
					
					request.put(followmid, function(error, response, body) {
						console.log('following playlist');
		
					var optionsmid1 = {
						url: playlisthrefmid + '/tracks/',
						headers: { 
							'Authorization': 'Bearer ' + access_token,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({'uris': urimid}),
						json: true
					};
					request.post(optionsmid1, function(error, response, body) {
						console.log('adding track');
						//console.log(body);
				
						var optionsshort = {
							url: 'https://api.spotify.com/v1/users/' + useridme + '/playlists/',
							body: JSON.stringify({ name: "Top Songs of the Past 4 Weeks as of " + month + "/" + day + "/" + year + " for " + userid, public: true }),
							headers: { 
								'Authorization': 'Bearer ' + access_token,
								'Content-Type': 'application/json'
							},
							json: true
						};
		
						var playlisthrefshort;
						request.post(optionsshort, function(error, response, body) {
							console.log('creating playlist');
							//console.log(body);
							playlisthrefshort = body.href;
							//console.log(playlisthrefshort);
							
							var followshort = {
						url: playlisthrefshort + '/followers',
						headers: { 
							'Authorization': 'Bearer ' + accesstoken,
							'Content-Type': 'application/json'
						},
						json: true
					};
					
					request.put(followshort, function(error, response, body) {
						console.log('following playlist');
		
							var optionsshort1 = {
								url: playlisthrefshort + '/tracks/',
								headers: { 
									'Authorization': 'Bearer ' + access_token,
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({'uris': urishort}),
								json: true
							};
							request.post(optionsshort1, function(error, response, body) {
								console.log('adding track');
								//console.log(body);
							});
						});
				
						});
					});
				});
			});
		});
	});
	});
});
});
*/

app.get('/analyze', function(req, res) {
	res.send({
			'dancelong': dancelongavg,
			'energylong': energylongavg,
			'loudnesslong': loudnesslongavg,
			'modelong': modelongavg,
			'speechlong': speechlongavg,
			'acousticlong': acousticlongavg,
			'instrumentlong': instrumentlongavg,
			'livelong': livelongavg,
			'valencelong': valencelongavg,
			'tempolong': tempolongavg,
			'durationlong': durationlongavg,
			'timesiglong': timesiglongavg,			
			'dancemid': dancemidavg,
			'energymid': energymidavg,
			'loudnessmid': loudnessmidavg,
			'modemid': modemidavg,
			'speechmid': speechmidavg,
			'acousticmid': acousticmidavg,
			'instrumentmid': instrumentmidavg,
			'livemid': livemidavg,
			'valencemid': valencemidavg,
			'tempomid': tempomidavg,
			'durationmid': durationmidavg,
			'timesigmid': timesigmidavg,
			'danceshort': danceshortavg,
			'energyshort': energyshortavg,
			'loudnessshort': loudnessshortavg,
			'modeshort': modeshortavg,
			'speechshort': speechshortavg,
			'acousticshort': acousticshortavg,
			'instrumentshort': instrumentshortavg,
			'liveshort': liveshortavg,
			'valenceshort': valenceshortavg,
			'temposhort': temposhortavg,
			'durationshort': durationshortavg,
			'timesigshort': timesigshortavg
		});
});

app.get('/playlist', function(req, res) {
	
	var optionslong = {
          url: 'https://api.spotify.com/v1/users/' + userid + '/playlists/',
		  body: JSON.stringify({ name: "Top Songs of All-Time as of " + month + "/" + day + "/" + year }),
          headers: { 
			'Authorization': 'Bearer ' + accesstoken,
			'Content-Type': 'application/json'
		  },
          json: true
        };
		
	var playlisthreflong;
	request.post(optionslong, function(error, response, body) {
		console.log('creating playlist');
		//console.log(body);
		playlisthreflong = body.href;
		//console.log(playlisthreflong);
		
		var optionslong1 = {
			url: playlisthreflong + '/tracks/',
			headers: { 
				'Authorization': 'Bearer ' + accesstoken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'uris': urilong}),
			json: true
		};
		request.post(optionslong1, function(error, response, body) {
				console.log('adding track');
				//console.log(body);
				
				var optionsmid = {
					url: 'https://api.spotify.com/v1/users/' + userid + '/playlists/',
					body: JSON.stringify({ name: "Top Songs of the Past 6 Months as of " + month + "/" + day + "/" + year }),
					headers: { 
					'Authorization': 'Bearer ' + accesstoken,
					'Content-Type': 'application/json'
					},
					json: true
				};
		
				var playlisthrefmid;
				request.post(optionsmid, function(error, response, body) {
					console.log('creating playlist');
					//console.log(body);
					playlisthrefmid = body.href;
					//console.log(playlisthrefmid);
		
					var optionsmid1 = {
						url: playlisthrefmid + '/tracks/',
						headers: { 
							'Authorization': 'Bearer ' + accesstoken,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({'uris': urimid}),
						json: true
					};
					request.post(optionsmid1, function(error, response, body) {
						console.log('adding track');
						//console.log(body);
				
						var optionsshort = {
							url: 'https://api.spotify.com/v1/users/' + userid + '/playlists/',
							body: JSON.stringify({ name: "Top Songs of the Past 4 Weeks as of " + month + "/" + day + "/" + year }),
							headers: { 
								'Authorization': 'Bearer ' + accesstoken,
								'Content-Type': 'application/json'
							},
							json: true
						};
		
						var playlisthrefshort;
						request.post(optionsshort, function(error, response, body) {
							console.log('creating playlist');
							//console.log(body);
							playlisthrefshort = body.href;
							//console.log(playlisthrefshort);
		
							var optionsshort1 = {
								url: playlisthrefshort + '/tracks/',
								headers: { 
									'Authorization': 'Bearer ' + accesstoken,
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({'uris': urishort}),
								json: true
							};
							request.post(optionsshort1, function(error, response, body) {
								console.log('adding track');
								//console.log(body);
							});
						});
				
				
					});
				});
				
		});
	});
});

app.get('/recommendation', function(req, res) {
		res.send({
					'reclistlong': reclistlong,
					'reclistmid': reclistmid,
					'reclistshort': reclistshort
				});
});


console.log('Listening on 8081');
app.listen(process.env.PORT || 8081);

update();

setInterval(update, 86400000);