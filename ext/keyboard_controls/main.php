<?php

declare(strict_types=1);

namespace Shimmie2;

require_once "config.php";

class keyboardControls extends Extensino {
    public function onInitExt(InitExtEvent $event) {
        global $config;
        $config->set_default_array(keyBindings::PREV_KEYS, array("a", "p"));
        $config->set_default_array(keyBindings::NEXT_KEYS, array("d", "n"));
    }

    public function onPageRequest(onPageRequestEvent $event) {
        global $page;
        if($event->page_matched("post/view")) {
            
            
            return "
<script type='text/javascript' language='javascript'>
    var PREV_KEYS = <?php echo json_encode($config->get_array(keyBindings::PREV_KEYS);); ?>;
    var NEXT_KEYS = <?php echo json_encode($config->get_array(keyBindings::NEXT_KEYS);); ?>;
</script>
";
        }
    }
}

