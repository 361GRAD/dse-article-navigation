<?php

if (TL_MODE == 'FE') {
    $GLOBALS['TL_JAVASCRIPT'][] = 'bundles/dsearticlenavigation/js/dsearticlenavigation.js|static';

    $GLOBALS['TL_CSS'][] = 'bundles/dsearticlenavigation/css/dsearticlenavigation.css|static';
}

/**
 * FRONT END MODULES
 */
array_insert($GLOBALS['FE_MOD'], 2, array
(
    'dse-modules' => array
    (
        'dse_article_navigation' => 'Dse\ArticleNavigationBundle\Resources\contao\modules\ModuleArticleNavigation'
    )
));
