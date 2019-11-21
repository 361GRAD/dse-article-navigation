# 361 GRAD DIGITAL GmbH

## Contao Article Navigation

## About

Extends the contao backend articles with a text input field to show this as a navigation title

## Installation

1. Edit the contao composer.json and add these lines
```
"repositories": [
        {
            "type": "vcs",
            "url": "git@github.com:361GRAD/dse-article-navigation.git"
        }
],
```

2. On the cli enter and install via composer
```
composer require 361GRAD/dse-article-navigation
```

3. Go to contao's install tool ```contao/install``` and update the database

4. Include this HTML on a page to show the sticky menu
```
<div class="col col-12 mod_dse_article_nav" data-ansticky>
	<div class="anWrapper">
		<nav id="anArticleNav" class="an-article-nav">
    		<div id="anArticleNavContents" class="an-article-nav-contents"></div>
		</nav>
		<button id="anButtonLeft" class="an-button left" type="button"></button>
		<button id="anButtonRight" class="an-button right" type="button"></button>
	</div>
</div>
```

5. Done
