<?php

if (TL_MODE == 'FE') {
    $GLOBALS['TL_JAVASCRIPT'][] = 'bundles/dsearticlenavigation/js/dsearticlenavigation.js|static';

    $GLOBALS['TL_CSS'][] = 'bundles/dsearticlenavigation/css/dsearticlenavigation.css|static';
}

/**
 * FRONT END MODULES
 */
$GLOBALS['TL_CTE']['dse_elements']['dse_articles'] = 'Dse\\ArticleNavigationBundle\\contao\\elements\\ContentDseArticleNavigation';

array_insert($GLOBALS['FE_MOD'], 2, array
(
    'dse-modules' => array
    (
        'dse_article_navigation' => 'Dse\ArticleNavigationBundle\contao\modules\ModuleArticleNavigation'
    )
));
