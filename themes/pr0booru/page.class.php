<?php

declare(strict_types=1);

namespace Shimmie2;

use MicroHTML\HTMLElement;

/**
 * Name: Danbooru Theme
 * Author: Bzchan <bzchan@animemahou.com>$
 * Link: https://code.shishnet.org/shimmie2/
 * License: GPLv2
 * Description: This is a simple theme changing the css to make shimme
 *              look more like danbooru as well as adding a custom links
 *              bar and title to the top of every page.
 */
//Small changes added by zshall <http://seemslegit.com>
//Changed CSS and layout to make shimmie look even more like danbooru
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Danbooru Theme - Notes (Bzchan)

Files: default.php, style.css

How to use a theme
- Copy the danbooru folder with all its contained files into the "themes"
  directory in your shimmie installation.
- Log into your shimmie and change the Theme in the Board Config to your
  desired theme.

Changes in this theme include
- Adding and editing various elements in the style.css file.
- $site_name and $front_name retreival from config added.
- $custom_link and $title_link preparation just before html is outputed.
- Altered outputed html to include the custom links and removed heading
  from being displayed (subheading is still displayed)
- Note that only the sidebar has been left aligned. Could not properly
  left align the main block because blocks without headers currently do
  not have ids on there div elements. (this was a problem because
  paginator block must be centered and everything else left aligned)

Tips
- You can change custom links to point to whatever pages you want as well as adding
  more custom links.
- The main title link points to the Front Page set in your Board Config options.
- The text of the main title is the Title set in your Board Config options.
- Themes make no changes to your database or main code files so you can switch
  back and forward to other themes all you like.

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
class Page extends BasePage
{
    public bool $left_enabled = true;

    public function disable_left()
    {
        $this->left_enabled = false;
    }

    public function add_boolFromArray(string $name, array $ref, string $label = null) {
        global $config;
        $current = $this->config->get_array($ref);


        $checked = "";
        $html = "";

        echo "custom bool from array function called....";

        if (!is_null($label)) {
            echo "...label exists...";
            $html .= "<label for='{$name}'>{$label}</label>";
        }

        foreach ($ref as $optname => $optval) {
            if (in_array($optval, $current)) {
                echo "$optval is active";
                $checked = " checked";
            } else {
                echo "$optval is inactive";
                $checked = "";
            }
            $html .= "<input type='checkbox' id='$name' name='_config_$name'$checked>\n";
        }
        
        #$html .= "<input type='hidden' name='_type_$name' value='array'>\n";
        #$html .= "<!--<br><br><br><br>-->\n"; // setup page auto-layout counts <br> tags

        #$this->format_option($name, $html, $label, $table_row);
        return $html;
    }

    public function render()
    {
        global $config;

        list($nav_links, $sub_links) = $this->get_nav_links();

        $left_block_html = "";
        $user_block_html = "";
        $main_block_html = "";
        $sub_block_html = "";

        foreach ($this->blocks as $block) {
            switch ($block->section) {
                case "left":
                    $left_block_html .= $block->get_html(true);
                    break;
                case "user":
                    $user_block_html .= $block->body;
                    break;
                case "subheading":
                    $sub_block_html .= $block->body;
                    break;
                case "main":
                    if ($block->header == "Posts") {
                        $block->header = "&nbsp;";
                    }
                    $main_block_html .= $block->get_html(false);
                    break;
                default:
                    print "<p>error: {$block->header} using an unknown section ({$block->section})";
                    break;
            }
        }

        if (empty($this->subheading)) {
            $subheading = "";
        } else {
            $subheading = "<div id='subtitle'>{$this->subheading}</div>";
        }

        $site_name = $config->get_string(SetupConfig::TITLE); // bzchan: change from normal default to get title for top of page
        $main_page = $config->get_string(SetupConfig::MAIN_PAGE); // bzchan: change from normal default to get main page for top of page

        $custom_links = "";
        foreach ($nav_links as $nav_link) {
            $custom_links .=  "<li>".$this->navlinks($nav_link->link, $nav_link->description, $nav_link->active)."</li>";
        }

        # changed 2023-12-08:
        # check if ratings extension is installed and, if yes, add ratings sfw/nsfw control at end of navbar links list
        echo "checking if Ratings is enabled...";
        if(Extension::is_enabled(RatingsInfo::KEY)) {
            echo "Ratings is enabled!";
            global $user, $_shm_ratings;
            #$userRatings = Ratings::get_user_class_privs($user);
            $userRatings = [];
            $userRatings = Ratings::get_user_default_ratings();

            if(in_array("explicit", $userRatings)) {
                echo "user allowd to see lewd stuff...";
                foreach($userRatings as $i) {
                    echo $userRatings[$i];
                };
                
            /*$ratingRadio = "
                <form action=''>
                    <label class='ratingDispOpt'>Sfw
                        <input type='checkbox' id='show-sfw'>
                        <span class='ratingDispChkmark'></span>
                    </label>
                    <label class='ratingDispOpt'>Nsfw
                        <input type='checkbox' id='show-nsfw'>
                        <span class='ratingDispChkmark'></span>
                    </label>
                    <input type='submit' value='apply'>
                </form>
            ";
            */
                $ratingCtrl = "<form action=''>";
                $ratingCtrl .= add_boolFromArray("safe", RatingsConfig::USER_DEFAULTS, "Sfw");
                $ratingCtrl .= add_boolFromArray("explicit", RatingsConfig::USER_DEFAULTS, "Nsfw");
                $ratingCtrl .= "</form>";
                $custom_links .= "<li>".$ratingCtrl."</li>";
            } else {
                echo "user NOT allowed to see lewd stuff!";
                foreach($userRatings as $i) {
                    echo $userRatings[$i];
                };            }
        }

        $custom_sublinks = "";
        if (!empty($sub_links)) {
            $custom_sublinks = "<div class='sbar'>";
            foreach ($sub_links as $nav_link) {
                $custom_sublinks .= "<li>".$this->navlinks($nav_link->link, $nav_link->description, $nav_link->active)."</li>";
            }
            $custom_sublinks .= "</div>";
        }

        // bzchan: failed attempt to add heading after title_link (failure was it looked bad)
        //if($this->heading==$site_name)$this->heading = '';
        //$title_link = "<h1><a href='".make_link($main_page)."'>$site_name</a>/$this->heading</h1>";

        // changed 2023-09-17 - check and import config file which can contain a path to $logo and custom $logoUrl
        // otherwise, prepare main title link
        $configFileName = "data/config/theme.conf.php";
        if (file_exists($configFileName)) {
            @include_once $configFileName;
			$title_link = "<a href='$logoUrl'><img class='header-logo' src='$logo'></a>";
        } else {
            $title_link = "<h1 id='site-title'><a href='".make_link($main_page)."'>$site_name</a></h1>";
		}

        if ($this->left_enabled) {
            $left = "<nav>$left_block_html</nav>";
            $withleft = "withleft";
        } else {
            $left = "";
            $withleft = "noleft";
        }

        $flash_html = $this->flash ? "<b id='flash'>".nl2br(html_escape(implode("\n", $this->flash)))."</b>" : "";
        $head_html = $this->head_html();
        $footer_html = $this->footer_html();

        print <<<EOD
<!doctype html>
<html class="no-js" lang="en">
    $head_html
	<body>
		<header>
			$title_link
			<ul id="navbar" class="flat-list">
				$custom_links
			</ul>
			<ul id="subnavbar" class="flat-list">
				$custom_sublinks
			</ul>
		</header>
		$subheading
		$sub_block_html
		$left
		<article class="$withleft">
			$flash_html
			$main_block_html
		</article>
		<footer><em>$footer_html</em></footer>
	</body>
</html>
EOD;
    }

    public function navlinks(Link $link, HTMLElement|string $desc, bool $active): ?string
    {
        $html = null;
        if ($active) {
            $html = "<a class='current-page' href='{$link->make_link()}'>{$desc}</a>";
        } else {
            $html = "<a class='tab' href='{$link->make_link()}'>{$desc}</a>";
        }

        return $html;
    }
}
