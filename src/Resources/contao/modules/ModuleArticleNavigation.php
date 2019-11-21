<?php

namespace Dse\ArticleNavigationBundle\contao\modules;

class ModuleArticleNavigation extends \Module {

    /**
     * Template
     * @var string
     */
    protected $strTemplate = 'mod_dse_article_navigation';

    /**
     * Display a wildcard in the back end
     * @return string
     */
    public function generate()
    {
        if (TL_MODE == 'BE') {
            $objTemplate = new BackendTemplate('be_wildcard');
            // $objTemplate->wildcard = '### ' . $GLOBALS['TL_LANG']['MOD']['dse_article_navigation'][0] . ' ###';
            $objTemplate->wildcard = '### TEEEEEEEEEEEEEEEEEEST ###';
            $objTemplate->title = $this->headline;
            $objTemplate->id = $this->id;
            $objTemplate->link = $this->name;
            $objTemplate->href = 'contao?do=themes&amp;table=tl_module&amp;act=edit&amp;id=' . $this->id;

            return $objTemplate->parse();
        }

        $this->strTemplate = $this->dseArticleNavTpl;

        return parent::generate();
    }

    /**
     * Generate the module
     */
    protected function compile()
    {
    }
}
