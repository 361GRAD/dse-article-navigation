<?php

/**
 * Add palettes to tl_article
 */
$GLOBALS['TL_DCA']['tl_article']['palettes']['default'] = str_replace(
    ';{layout_legend},',';{nav_legend},dseArticleNavTitle;{layout_legend},',
    $GLOBALS['TL_DCA']['tl_article']['palettes']['default']
);

/**
 * Add fields to tl_article
 */
$GLOBALS['TL_DCA']['tl_article']['fields']['dseArticleNavTitle'] = array (
    'label'     => &$GLOBALS['TL_LANG']['tl_article']['dseArticleNavTitle'],
    'inputType' => 'text',
    'eval'      => array(
        'decodeEntities'    => true,
        'tl_class'          => 'clr w50',
        'rgxp'              => 'extnd'
    ),
    'sql'       => "varchar(255) NOT NULL default ''"
);

