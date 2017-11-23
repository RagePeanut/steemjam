const mssql = require('database');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public/dist'));

app.get('/api/get_followers/', function(req, res, next) {

    // Defining a following constant to check if a following is set
    let following = req.query.following;

    // Creating a request object (necessary for queries)
    let request = new mssql.Request();

    // Querying the database
    if(following) {

        request
            .input('following', mssql.NVarChar, following)
            .query('SELECT [follower] FROM [Followers] (NOLOCK) WHERE [following] = @following', function (err, result) {

                if(err) return next(err);
                
                // Sending followers following this user
                let followers = result.recordset;
                return res.send(followers);

            })

    } else {
        
        return res.send('ERROR: You should put a following query string parameter, no following found.');

    }

});

app.get('/api/get_following/', function(req, res, next) {
    
    // Defining a follower constant to check if a follower is set
    let follower = req.query.follower;

    // Creating a request object (necessary for queries)
    let request = new mssql.Request();

    // Querying the database
    if(follower) {

        request
            .input('follower', mssql.NVarChar, follower)
            .query('SELECT * FROM [Followers] (NOLOCK) WHERE [follower] = @follower', function (err, result) {

                if(err) return next(err);
                
                // Sending the users followed by this user
                let following = result.recordset;
                return res.send(following);

            })

    } else {

        return res.send('ERROR: You should put a follower query string parameter, no follower found.');

    }
    
});

app.get('/api/get_games_liked/', function(req, res, next) {

    // Defining an account constant to check if an account is set
    let account = req.query.account;

    // Creating a request object (necessary for queries)
    let request = new mssql.Request();

    // Querying the database
    if(account) {

        request.query('SELECT * FROM [Comments] (NOLOCK) WHERE [parent_author] = \'\' AND [category] = \'steemjamtest\' AND [json_metadata] LIKE \'%"app":"steemjamtest"%\' AND [active_votes] LIKE \'%"voter":"' + account + '"%\'', function (err, result) {

            if(err) return next(err);

            // Sending all games liked by the account
            let games = result.recordset;
            return res.send(games);

        });

    } else {

        return res.send('ERROR: You should put an account query string parameter, no account found.');

    }

});

app.get('/api/get_games/', function(req, res, next) {

    // Defining constants to know what to query
    let author = req.query.author;
    let title = req.query.title;

    // Creating a request object (necessary for queries)
    let request = new mssql.Request();

    // Querying the database
    if(!author) {

        request.query('SELECT * FROM [Comments] (NOLOCK) WHERE [parent_author] = \'\' AND [category] = \'steemjamtest\' AND [json_metadata] LIKE \'%"app":"steemjamtest"%\'', function (err, result) {
            
            if(err) return next(err);

            // Sending all existing games as a response
            let games = result.recordset;
            return res.send(games);

        });

    } else {

        request
            .input('author', mssql.NVarChar, author)
            .query('SELECT * FROM [Comments] (NOLOCK) WHERE [author] = @author AND [parent_author] = \'\' AND [category] = \'steemjamtest\' AND [json_metadata] LIKE \'%"app":"steemjamtest"%\'', function (err, result) {

                if (err) return next(err);

                // Sending games made by the author as a response
                let games = result.recordset;
                return res.send(games);

            });

    }

});

app.get('/api/get_game/', function(req, res, next) {

    // Defining a permlink constant to check if a permlink is set
    let permlink = req.query.permlink;

    // Creating a request object (necessary for queries)
    let request = new mssql.Request();

    if (permlink) {

        request
            .input('permlink', mssql.NVarChar, permlink)
            .query('SELECT * FROM [Comments] (NOLOCK) WHERE [permlink] = @permlink AND [parent_author] = \'\' AND [category] = \'steemjamtest\' AND [json_metadata] LIKE \'%"app":"steemjamtest"%\'', function (err, result) {

                if (err) return next(err);

                // Sending the game received
                let game = result.recordset[0];
                return res.send(game);
                
            });

    } else {

        return res.send('ERROR: You should put a permlink query string parameter, no permlink found.');

    }

});

app.get('/api/get_comments/', function(req, res, next) {
    
    // Defining a parentPermlink constant to check if a parent permlink is set
    let parentPermlink = req.query.parent_permlink;

    // Creating a request object (necessary for queries)
    let request = new mssql.Request();

    if (parentPermlink) {

        request
            .input('parentPermlink', mssql.NVarChar, parentPermlink)
            .query('SELECT * FROM [Comments] (NOLOCK) WHERE [parent_permlink] = @parentPermlink AND [category] = \'steemjamtest\'', function (err, result) {

                if (err) return next(err);

                // Sending the comments received
                let comments = result.recordset;
                return res.send(comments);

            })

    } else {

        return res.send('ERROR: You should put a parent_permlink query string parameter, no parent permlink found.');

    }

});

app.get('/api/get_account/', function(req, res, next) {

    // Defining an username constant to check if an username is set
    let username = req.query.username;
    
    // Creating a request object (necessary for queries)
    let request = new mssql.Request();

    if (username) {

        request
            .input('username', mssql.NVarChar, username)
            .query('SELECT * FROM [Accounts] (NOLOCK) WHERE [name] = @username', function(err, result) {

                if (err) return next(err);

                // Sending the account received
                let account = result.recordset[0];
                return res.send(account);

            });

    } else {

        return res.send('ERROR: You should put an account query string parameter, no account found.');

    }

});

// If no API request, handles the redirection to Angular
app.all('*', function (req, res, next) {
    res.sendFile(path.resolve('./public/dist/index.html'));
});

// Server listening
const server = app.listen(5000, function () {

    console.log('Server is running at 5000');

});