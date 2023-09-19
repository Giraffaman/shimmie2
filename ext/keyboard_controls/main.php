<?php

declare(strict_types=1);

namespace Shimmie2;

require_once "config.php";

class keyboardControls extends Extensino {
    public function onInitExt(InitExtEvent $event) {
        global $config;
        $config->set_default_string(keyBindings::PREV_KEYS, array("a", "p"));
        $config->set_default_string(keyBindings::NEXT_KEYS, array("d", "n"));
    }

    public function onPageRequest(onPageRequestEvent $event) {
        global $page;
        if($event->page_matched("post/view")) {
            $pk = $config->get(keyBindings::PREV_KEYS);
            $nk = $config->get(keyBindings::NEXT_KEYS);
            return "
<script type='text/javascript' language='javascript'>
    var PREV_KEYS = <?php echo json_encode($pk); ?>;
    var NEXT_KEYS = <?php echo json_encode($nk); ?>;
</script>
";
        }
    }
}

