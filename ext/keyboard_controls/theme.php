<?php

declare(strict_types=1);
namespace Shimmie2;

public function defineJsVars(Page $page) {
    global $config;

    $pk = $config->get_array(keyBindings::PREV_KEYS);
    $nk = $config->get_array(keyBindings::NEXT_KEYS);
    $page->add_html_header("
<script type='text/javascript'>
    var PREV_KEYS = ".json_encode($pk).";
    var NEXT_KEYS = ".json_encode($nk).";
</script>");
}