const app = (function(){
    const DOM = {
        quote : document.getElementById("quote"),
        author : document.getElementById("author"),
        btnQuote : document.getElementById("new-quote"),
        btnTweet : document.getElementById("twitter"),
        container : document.getElementById("quoteContainer"),
        loader : document.getElementById("loader")
    }
    const loading = () => {
        DOM.loader.style.display = 'block';
        DOM.container.style.display = 'none';
    };
    const finishLoading = () => {
        DOM.loader.style.display = 'none';
        DOM.container.style.display = 'block';
    };
    
    const btn = () => {
        (async () => 
        (await fetch("https://type.fit/api/quotes"))
        .json())()
        .then(data => {
            showDataInElements(data)
        })
    }
    
    const showDataInElements = (data) => {
        
        loading()
        const rand = Math.floor(Math.random()*data.length)
        DOM.quote.textContent = data[rand].text;
        if(data[rand].author.replace(", type.fit" , "").replace("type.fit" , "") === ""){
            DOM.author.textContent = "Unknowun";
        }else{
            DOM.author.textContent = data[rand].author.replace(", type.fit" , "").replace("type.fit" , "");
        }
        finishLoading()
    }
    btn()

    const tweetQuote = () => {
        const tweetUrl = `https://api.twitter.com/2/tweets?text=${DOM.quote.textContent} - ${DOM.author.textContent}`;
        window.open(tweetUrl , "_blank");
    }

    

    DOM.btnQuote.addEventListener("click" , btn);
    DOM.btnTweet.addEventListener("click" , tweetQuote);
})();


