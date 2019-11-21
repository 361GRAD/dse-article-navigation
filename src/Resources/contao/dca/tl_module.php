<?php

/**
 * Add palettes to tl_module
 */
$GLOBALS['TL_DCA']['tl_module']['palettes']['dse_article_navigation'] = '{title_legend},name,headline,type;{template_legend:hide},dseArticleNavTpl;{expert_legend:hide},cssID,space';

/**
 * Add fields to tl_module
 */

$GLOBALS['TL_DCA']['tl_module']['fields']['dseArticleNavTpl'] = array
    (
    'label' => &$GLOBALS['TL_LANG']['tl_module']['dseArticleNavTpl'],
    'default' => 'mod_dse_article_navigation',
    'exclude' => true,
    'inputType' => 'select',
    'options_callback' => array(
        'tl_module_dse_article_navigation', 'getArticleNavigationTemplates'
    ),
    'eval' => array(
        'tl_class' => 'clr w50'
    ),
    'sql' => "varchar(64) NOT NULL default 'mod_dse_article_navigation'"
);

class tl_module_dse_article_navigation extends Backend {
    /**
     * Return all products wrapper templates as array
     * @return array
     */
    public function getArticleNavigationTemplates() {
        return $this->getTemplateGroup('mod_dse_article_navigation');
    }
}
