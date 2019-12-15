<?php

class ActivityPubInfo extends ExtensionInfo
{
    public const KEY = "activitypub";

    public $key = self::KEY;
    public $name = "ActivityPub Server";
    public $url = self::SHIMMIE_URL;
    public $authors = self::SHISH_AUTHOR;
    public $license = self::LICENSE_GPLV2;
    public $description = "Support for the ActivityPub protocol";
    public $core = true;
    public $documentation = "Enable this so that ActivityPub clients can subscribe to our feed";
}
