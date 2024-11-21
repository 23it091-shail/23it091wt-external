document.addEventListener('DOMContentLoaded', function() {
    const tweetButton = document.getElementById('tweet-button');
    const tweetInput = document.getElementById('tweet-input');
    const tweetsContainer = document.getElementById('tweets');

    let tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    displayTweets();

    tweetButton.addEventListener('click', function() {
        const tweetText = tweetInput.value.trim();
        if (tweetText) {
            const newTweet = {
                text: tweetText,
                likes: 0
            };
            tweets.unshift(newTweet); 
            localStorage.setItem('tweets', JSON.stringify(tweets));
            displayTweets();
            tweetInput.value = ''; 
        }
    });

    function displayTweets() {
        tweetsContainer.innerHTML = '';
        tweets.forEach((tweet, index) => {
            const tweetDiv = document.createElement('div');
            tweetDiv.className = 'tweet';
            tweetDiv.innerHTML = `
                <p>${tweet.text}</p>
                <button class="like-button" data-index="${index}">Like (${tweet.likes})</button>
            `;
            tweetsContainer.prepend(tweetDiv); 
            
            const likeButton = tweetDiv.querySelector('.like-button');
            likeButton.addEventListener('click', function() {
                tweet.likes++;
                localStorage.setItem('tweets', JSON.stringify(tweets));
                displayTweets(); 
            });
        });
    }
});