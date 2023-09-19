<?php

declare(strict_types=1);

namespace Shimmie2;

class keyBindings {
    public const PREV_KEYS = array("a", "p");
    public const NEXT_KEYS = array("d", "n");
};

return "
<script type='text/javascript' language='javascript'>
    var PREV_KEYS = <?php echo json_encode($PREV_KEYS); ?>;
    var NEXT_KEYS = <?php echo json_encode($NEXT_KEYS); ?>;
</script>
"