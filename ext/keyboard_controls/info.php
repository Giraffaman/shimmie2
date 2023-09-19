<?php

declare(strict_types=1);

namespace Shimmie2;

class keyboardInfo extends ExtensionInfo
{
    public const KEY = "keyboardcontrols";

    public string $key = self::KEY;
    public string $name = "Keyboard Controls";
    //public array $authors = ["Sein Kraft"=>"mail@seinkraft.info", "jgen"=>"jgen.tech@gmail.com", "Daku"=>"admin@codeanimu.net"];
    //public string $license = self::LICENSE_GPLV2;
    public string $description = "Adds a set of keyboard shortcuts to the post list and single post view for ease of navigation";
    public ?string $documentation =
"This extension adds the following set of keyboard shortcuts to /post/list and /post/view:<br>
<table>
    <tr>
        <th>Shortcut</th>
        <th>Function</th>
    </tr>
    <tr>
    <td>P|A|left</td>
    <td>previous post</td>
    </tr>
    <tr>
    <td>N|D|right</td>
    <td>next post</td>
    </tr>
    <tr>
    <td>F</td>
    <td>favorite post</td>
    </tr>
    <tr>
    <td>shift+alt+F</td>
    <td>cycle post fit mode</td>
    </tr>
    <tr>
    <td>space</td>
    <td>play/pause media</td>
    </tr>
</table> ";
}
