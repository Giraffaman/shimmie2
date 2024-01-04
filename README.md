Forked this for personal use and added/changed some things here and there:
- custom red Danbooru-based theme
- added rating visibility control for users to toggle safe/explicit content on or off (if they have permission to see it)
- hide side-wide list of tags and, if enabled, popular tags from anonymous users
- hide list of pools to anonymous users
- added keyboard controls to /post/list and /view
- changed home extension to allow for configurable logo and logo link
- changed index.php's site title behavior to also be configurable with a logo and custom logo link
- changed Autocomplete extension to load current theme's css last (currently dirty since it results in theme's stylesheet being loaded twice)
- various other fixes

To Dos:
- see issues

```
     _________.__     .__                   .__         ________
    /   _____/|  |__  |__|  _____    _____  |__|  ____  \_____  \
    \_____  \ |  |  \ |  | /     \  /     \ |  |_/ __ \  /  ____/
    /        \|   Y  \|  ||  Y Y  \|  Y Y  \|  |\  ___/ /       \
   /_______  /|___|  /|__||__|_|  /|__|_|  /|__| \___  >\_______ \
           \/      \/           \/       \/          \/         \/

```

# Shimmie

[![Tests](https://github.com/shish/shimmie2/workflows/Tests/badge.svg?branch=main)](https://github.com/shish/shimmie2/actions)
[![Code Quality](https://scrutinizer-ci.com/g/shish/shimmie2/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/shish/shimmie2/?branch=main)
[![Code Coverage](https://scrutinizer-ci.com/g/shish/shimmie2/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/shish/shimmie2/?branch=main)
[![Matrix](https://matrix.to/img/matrix-badge.svg)](https://matrix.to/#/#shimmie:matrix.org)


# Documentation

* [Install straight on disk](https://github.com/shish/shimmie2/wiki/Install)
* [Install in docker container](https://github.com/shish/shimmie2/wiki/Docker)
* [Upgrade process](https://github.com/shish/shimmie2/wiki/Upgrade)
* [Basic settings](https://github.com/shish/shimmie2/wiki/Settings)
* [Advanced config](https://github.com/shish/shimmie2/wiki/Advanced-Config)
* [Developer notes](https://github.com/shish/shimmie2/wiki/Development-Info)
* [High-performance notes](https://github.com/shish/shimmie2/wiki/Performance)


# Licence

All code is released under the [GNU GPL Version 2](https://www.gnu.org/licenses/gpl-2.0.html) unless mentioned otherwise.

If you give shimmie to someone else, you have to give them the source (which
should be easy, as PHP is an interpreted language...). If you want to add
customisations to your own site, then those customisations belong to you,
and you can do what you want with them.
