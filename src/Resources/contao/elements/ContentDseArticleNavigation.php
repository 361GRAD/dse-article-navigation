<?php

/**
 * 361GRAD-Element - Articles
 *
 * @package   dse-elements-bundle
 * @author    Markus Häfner <markus@361.de>
 * @copyright 2018 361GRAD
 * @license   http://www.361.de proprietary
 */

namespace Dse\ArticleNavigationBundle\contao\elements;

use Contao\BackendTemplate;
use Contao\ContentElement;
use Contao\File;
use Contao\FilesModel;
use Contao\FrontendTemplate;
use Contao\StringUtil;
use Patchwork\Utf8;

/**
 * Class ContentDseArticles
 *
 * @package Dse\ElementsBundle\Elements
 */
class ContentDseArticleNavigation extends ContentElement
{
    /**
     * Template name.
     *
     * @var string
     */
    protected $strTemplate = 'ce_dse_article_navigation';


    /**
     * Display a wildcard in the back end.
     *
     * @return string
     */
    public function generate()
    {
        if (TL_MODE == 'BE') {
            $objTemplate = new BackendTemplate('be_wildcard');

            $objTemplate->wildcard =
                // '### ' . Utf8::strtoupper($GLOBALS['TL_LANG']['CTE']['dse_articles'][1]) . ' ###';
                '### TEEEEEEEEEEEEEST ###';
            $objTemplate->title    = $this->headline;

            return $objTemplate->parse();
        }

        return parent::generate();
    }


    /**
     * Generate the module
     *
     * @return void
     */
    protected function compile()
    {
    }
}
